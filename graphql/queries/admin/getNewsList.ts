import { gql } from '@apollo/client';

import newsSpec from '../../fragments/admin/newsSpec';

export default gql`
  ${newsSpec}

  query News {
    list: newsList {
      totalCount
      edges {
        node {
          ...NewsSpec
        }
      }
    }
  }
`;