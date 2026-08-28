import { format } from 'date-fns';
import { StyleSheet, View } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    padding: 15,
  },
  rating: {
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderRadius: 25,
    borderWidth: 2,
    height: 50,
    justifyContent: 'center',
    marginRight: 15,
    width: 50,
  },
  content: { flexShrink: 1 },
});

const ReviewItem = ({ review, showRepositoryName }) => (
  <View style={styles.container}>
    <View style={styles.rating}>
      <Text color="primary" fontWeight="bold">
        {review.rating}
      </Text>
    </View>
    <View style={styles.content}>
      <Text fontWeight="bold" fontSize="subheading">
        {showRepositoryName ? review.repository.fullName : review.user.username}
      </Text>
      <Text color="textSecondary">
        {format(new Date(review.createdAt), 'dd.MM.yyyy')}
      </Text>
      <Text>{review.text}</Text>
    </View>
  </View>
);

export default ReviewItem;
