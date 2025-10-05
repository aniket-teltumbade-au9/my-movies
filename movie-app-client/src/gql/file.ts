import { gql } from "@apollo/client";

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: String!) {
    uploadImage(file: $file)
  }
`;
