import { gql } from '@apollo/client'

export const projectDetail = gql`
query projectByTitleId($id:Int!){
  projectByTitleId(id:$id){
    announcementUrl
    blockchainId
    coverImage
    createdDateTime
    description
    discordUrl
    category
    email
    endDateTime
    id
    isPromoted
    isVerified
    isVisible
    marketplaceId
    marketplaceUrl
    mintingPrice
    numberOfMinting
    startDateTime
    tags
    title
    twitterUrl
    websiteUrl   
  }
}`