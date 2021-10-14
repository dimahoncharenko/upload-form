import { GraphQLUpload } from "graphql-upload";
import fs from "fs";
import { Context, pubsub } from "../server";
import { resolve } from "path";

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        allPhotos: async (_: null, __: null, { service }: Context) => {
            const photos = await service.allPhotos();
            return photos;
        }  
    },
    Subscription: {
        newPhoto: {
            subscribe: () => { 
                return pubsub.asyncIterator(["post_photo"]);
            } 
        }
    },
    Mutation: {
        postPhoto: async (_: GQL.IPhoto, { input }: GQL.IPostPhotoOnMutationArguments, { service }: Context) => {
            const { createReadStream, mimetype, filename, encoding } = await input.file;

            const extname = mimetype.replace(/(\w*)\/(\w*)/g, "$2");

            const newPhoto = await service.newPhoto({ input: { ...input, file: { mimetype: extname } }});

            const dirPath = `${resolve(`./assets/photos/${newPhoto.category}`)}`;


            const rs = createReadStream();
            const ws = fs.createWriteStream(`${dirPath}/${newPhoto.id}.${extname}`);

            fs.mkdirSync(dirPath, { recursive: true });
            
            await rs.pipe(ws);

            await pubsub.publish("post_photo", { newPhoto });
            return newPhoto;
        }
    }
};

export default resolvers;