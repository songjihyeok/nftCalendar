import { gql } from "@apollo/client";

export default gql`
  fragment DropsSpec on Project {
    id
    title
    titleId
    blockchainId
    marketplaceId
    coverImage
    description
    email
    isVisible
    isPromoted
    isVerified
    transactionHash
    mintingPrice
    numberOfMinting
    discordUrl
    twitterUrl
    websiteUrl
    announcementUrl
    marketplaceUrl
    tags
    createdDateTime
    startDateTime
    endDateTime
  }
`;