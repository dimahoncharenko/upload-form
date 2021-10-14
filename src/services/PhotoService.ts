import { Request, Response } from "express";
import { PhotoEntity } from "../database/entities/Photo";

class PhotoService {
    public async allPhotos() {
        const photos = await PhotoEntity.find({  });
        return photos;
    }

    public async photoById(id: number) {
        const photo = await PhotoEntity.findOne(id);
        return photo;
    }

    public async newPhoto({ input }: GQL.IPostPhotoOnMutationArguments) {
        const { category, description, file: { mimetype } } = input;
        const newPhoto = new PhotoEntity()

        newPhoto.category = category;
        newPhoto.description = description;
        newPhoto.extname = mimetype;

        await newPhoto.save();
        return newPhoto;
    }

    public async updatePhoto(params: GQL.IPhotoArgs) {
        
        
    }

    public async deletePhoto(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await PhotoEntity.delete(id);
            return true;
        } catch(err) {
            console.log("Something went wrong:", err);
            return false;
        }
    }
}

export default PhotoService;