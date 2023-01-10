import { gql } from '@apollo/client'

enum ProjectListOf {
  NEWEST = "NEWEST",
  PAST = "PAST",
  PROMOTED = "PROMOTED",
  TODAY = "TODAY",
  UPCOMING = "UPCOMING",
  VERIFIED = "VERIFIED",
}

export const projectListByFilter = gql`
query projectListByFilter($keyword:String, $tagList: [String!], $blockChainIdList:[Int!], $first: Int,  $last: Int, $of: ProjectListOf, $after: String, $before: String, $isVisible: Boolean, $isPromoted: Boolean){
  projectListByFilter(keyword: $keyword, tagList: $tagList, blockChainIdList: $blockChainIdList, first: $first, last: $last, of: $of, after: $after, before: $before, isVisible: $isVisible, isPromoted: $isPromoted) {
    		edges{
          cursor
          node{
            id
            titleId
            blockchainId
            coverImage
            createdDateTime
            description
            discordUrl
            email
            announcementUrl
            endDateTime
            isPromoted
            isVerified
            isVisible
            marketplaceId
            marketplaceUrl
            mintingPrice
            numberOfMinting
            startDateTime
            category
            tags
            title
            transactionHash
            twitterUrl
            websiteUrl
          }
      }
      pageInfo{
        hasNextPage
        endCursor
      }
    	totalCount
  }
}`