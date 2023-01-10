import { gql } from '@apollo/client'

export const getNewsList = gql`
query newsList{
  newsList{
    edges{
      node{
        id
        title
        coverImage
        createdDateTime
        content
        tags
        }
      }
    }
  }
`