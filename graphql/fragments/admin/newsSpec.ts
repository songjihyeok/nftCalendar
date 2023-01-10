import { gql } from "@apollo/client";

export default gql`
  fragment NewsSpec on News {
    id
    writer
    coverImage
    title
    content
    tags
  }
`;