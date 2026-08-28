import { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-native';

import useRepositories from '../hooks/useRepositories';
import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';

const orderVariables = {
  latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
};

// Exported without the data fetching so that it can be tested with plain props.
export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  header,
  onPressItem,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={header}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressItem?.(item)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  const { repositories, fetchMore } = useRepositories({
    ...orderVariables[order],
    searchKeyword: debouncedSearch,
    first: 8,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={fetchMore}
      onPressItem={item => navigate(`/repositories/${item.id}`)}
      header={
        <RepositoryListHeader
          order={order}
          onOrderChange={setOrder}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
      }
    />
  );
};

export default RepositoryList;
