import { gql } from '@apollo/client'

export const projectIdList = gql`
query projectListByFilter($of:ProjectListOf ){
  projectListByFilter(of: $of, first: 10000){
    edges{
      node{
        titleId
        isVisible
      }
    }
  }
}`