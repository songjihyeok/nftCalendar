import { gql } from "@apollo/client";
import newsSpec from "../fragments/admin/newsSpec";

export default gql`
  ${newsSpec}

  mutation UpdateNews($id: Float!, $input: UpdateNewsInput!) {
    item: News_update(id: $id, input: $input) {
      ...NewsSpec
    }
  }
`;