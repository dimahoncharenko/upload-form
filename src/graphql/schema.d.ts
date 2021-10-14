// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation | ISubscription;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
allPhotos: Array<IPhoto>;
}

interface IPhoto {
__typename: "Photo";
id: string;
url: string;
createdAt: any;
category: PhotoCategory;
description: string | null;
}

const enum PhotoCategory {
PORTRAIT = 'PORTRAIT',
SELFIE = 'SELFIE',
ACTION = 'ACTION'
}

interface IMutation {
__typename: "Mutation";
postPhoto: IPhoto;
}

interface IPostPhotoOnMutationArguments {
input: IPhotoArgs;
}

interface IPhotoArgs {
category: PhotoCategory;
description?: string | null;
file: any;
}

interface ISubscription {
__typename: "Subscription";
newPhoto: IPhoto;
}
}

// tslint:enable
