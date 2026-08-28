import { StyleSheet, View } from 'react-native';

import { formatCount } from '../utils/format';
import Text from './Text';

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around' },
  item: { alignItems: 'center', flexGrow: 1 },
});

const Stat = ({ label, value }) => (
  <View style={styles.item}>
    <Text fontWeight="bold" testID={`stat-${label}`}>
      {formatCount(value)}
    </Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryStats = ({ repository }) => (
  <View style={styles.container}>
    <Stat label="Stars" value={repository.stargazersCount} />
    <Stat label="Forks" value={repository.forksCount} />
    <Stat label="Reviews" value={repository.reviewCount} />
    <Stat label="Rating" value={repository.ratingAverage} />
  </View>
);

export default RepositoryStats;
