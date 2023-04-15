import { makeVar } from "@apollo/client";
import { PostProps } from "../interface/post.interface";

export const postsValue = makeVar<Array<PostProps> | undefined>([]);
