import { gql } from "@apollo/client";

export default gql`
mutation createSubscription($input: CreateSubscriptionInput!) {
  Subscription_create(input: $input){
    email
  }
}
`;