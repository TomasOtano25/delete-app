import { Resolver, Arg, Mutation } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";

import { Upload } from "../../types/Upload";

@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(@Arg("picture", () => GraphQLUpload)
  {
    createReadStream,
    filename
  }: Upload): Promise<Boolean> {
    return new Promise(async (resolver, reject) => {
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
        .on("finish", () => resolver(true))
        .on("error", () => reject(false));
    });
  }
}
