import { gql } from '@apollo/client';

import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryDetails
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
`;

export const ME = gql`
  query me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`;
