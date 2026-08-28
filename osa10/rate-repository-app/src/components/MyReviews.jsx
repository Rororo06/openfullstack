import { useMutation, useQuery } from '@apollo/client/react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';

import { DELETE_REVIEW } from '../graphql/mutations';
import { ME } from '../graphql/queries';
import theme from '../theme';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
  actions: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 15,
  },
  button: { borderRadius: 4, flexGrow: 1, margin: 5, padding: 12 },
  view: { backgroundColor: theme.colors.primary },
  delete: { backgroundColor: theme.colors.error },
  text: { color: theme.colors.white, textAlign: 'center' },
});

const MyReviews = () => {
  const { data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  const reviews = data?.me?.reviews.edges.map(edge => edge.node) ?? [];

  const confirmDelete = id => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          void deleteReview({ variables: { id } }).then(() => refetch());
        },
      },
    ]);
  };

  return (
    <FlatList
      data={reviews}
      keyExtractor={review => review.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} showRepositoryName />
          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.view]}
              onPress={() => navigate(`/repositories/${item.repository.id}`)}
            >
              <Text fontWeight="bold" style={styles.text}>
                View repository
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.delete]}
              onPress={() => confirmDelete(item.id)}
            >
              <Text fontWeight="bold" style={styles.text}>
                Delete review
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};

export default MyReviews;
