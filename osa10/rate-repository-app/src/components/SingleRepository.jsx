import { FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ id, first: 5 });

  if (!repository) {
    return null;
  }

  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id: reviewId }) => reviewId}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem repository={repository} showUrl />
          <ItemSeparator />
        </View>
      )}
    />
  );
};

export default SingleRepository;
