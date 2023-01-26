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
