import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = variables => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  // Infinite scrolling: ask for the page after the last cursor we already have.
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: { after: data.repositories.pageInfo.endCursor, ...variables },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
