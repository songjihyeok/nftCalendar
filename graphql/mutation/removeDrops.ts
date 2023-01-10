import { gql } from "@apollo/client";

export default gql`
  mutation RemoveDrops($id: Float!) {
    Project_delete(id: $id)
  }
`;