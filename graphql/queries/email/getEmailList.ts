import { gql } from '@apollo/client'


export const EmailList = gql`
query emailList($countPerPage: Int!, $page: Int!){
  subscriberList(countPerPage:$countPerPage, page: $page) {
    email
    createdDateTime
  }
}`