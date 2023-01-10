import { gql } from '@apollo/client'

export const createQuery = gql`
    mutation createProject($CreateProjectInput: CreateProjectInput!){
      Project_create(input: $CreateProjectInput){
      id
    }
 }
`;
