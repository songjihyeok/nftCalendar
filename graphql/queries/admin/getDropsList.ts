import { gql } from '@apollo/client';
import dropsSpec from '@src/graphql/fragments/admin/dropsSpec';

export default gql`
  ${dropsSpec}

  query Drops($after: String, $first: Int, $of: ProjectListOf ) {
    list: projectListByFilter(after: $after, first: $first, of: $of) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ...DropsSpec
        }
      }
      totalCount
    }
  }
`;