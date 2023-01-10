import { gql } from "@apollo/client";
import dropsSpec from "../fragments/admin/dropsSpec";

export default gql`
  ${dropsSpec}

  mutation UpdateDrops($id: Float!, $input: UpdateProjectInput!) {
    updated: Project_update(id: $id, input: $input) {
      ...DropsSpec
    }
  }
`;