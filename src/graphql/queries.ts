import { gql } from "@apollo/client";

const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    name
    id
    color
  }
`;
const SERVICE_FRAGMENT = gql`
  fragment ServiceFragment on Service {
    name
    cost
    description
    id
  }
`;
const PROJECT_FRAGMENT = gql`
  fragment ProjectFragment on Project {
    name
    budget
    cost
    id
    Services {
      ...ServiceFragment
    }
    Category {
      ...CategoryFragment
    }
  }
  ${SERVICE_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const ALL_PROJECTS = gql`
  query allProjects {
    allProjects {
      ...ProjectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`;

export const ALL_CATEGORIES = gql`
  query allCategories {
    allCategories {
      ...CategoryFragment
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    Project(id: $id) {
      ...ProjectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`;

export const CREATE_PROJECT_MUTATION = gql`
  mutation createProject(
    $name: String!
    $budget: Int!
    $categoryId: ID!
    $cost: Int!
  ) {
    createProject(
      name: $name
      budget: $budget
      category_id: $categoryId
      cost: $cost
    ) {
      ...ProjectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`;

export const CREATE_SERVICE_MUTATION = gql`
  mutation createService(
    $projectId: ID!
    $name: String!
    $cost: Int!
    $description: String!
  ) {
    createService(
      project_id: $projectId
      name: $name
      cost: $cost
      description: $description
    ) {
      ...ServiceFragment
    }
  }
  ${SERVICE_FRAGMENT}
`;

export const REMOVE_SERVICE_MUTATION = gql`
  mutation removeService($id: ID!) {
    removeService(id: $id) {
      ...ServiceFragment
    }
  }
  ${SERVICE_FRAGMENT}
`;
