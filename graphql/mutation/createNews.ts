import { gql } from "@apollo/client";

import newsSpec from "../fragments/admin/newsSpec";

export default gql`
  ${newsSpec}

  mutation CreateNews($input: CreateNewsInput!) {
    created: News_create(input: $input) {
      ...NewsSpec
    }
  }
`;