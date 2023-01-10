import { gql } from "@apollo/client";
import dropsSpec from "../fragments/admin/dropsSpec";

export default gql`
  ${dropsSpec}

  mutation CreateDrops($input: CreateProjectInput!) {
    created: Project_create(input: $input) {
      ...DropsSpec
    }
  }
`;