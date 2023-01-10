import { gql } from '@apollo/client'

export default gql`
  query Tags {
    tags: find {
      name
    }
  }
`;