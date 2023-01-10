import { gql } from "@apollo/client";

export default gql`
  mutation RemoveNews($id: Float!) {
    News_delete(id: $id)
  }
`;