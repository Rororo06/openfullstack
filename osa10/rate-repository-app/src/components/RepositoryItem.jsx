import * as Linking from 'expo-linking';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import theme from '../theme';
import RepositoryStats from './RepositoryStats';
import Text from './Text';

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: theme.colors.white },
  topRow: { flexDirection: 'row' },
  avatar: { width: 48, height: 48, borderRadius: 4, marginRight: 15 },
  details: { flexShrink: 1 },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderRadius: 4,
    marginTop: 5,
    paddingHorizontal: 6,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 15,
    padding: 12,
  },
  buttonText: { color: theme.colors.white, textAlign: 'center' },
  spacer: { marginTop: 15 },
});

const RepositoryItem = ({ repository, showUrl }) => (
  <View style={styles.container} testID="repositoryItem">
    <View style={styles.topRow}>
      <Image
        style={styles.avatar}
        source={{ uri: repository.ownerAvatarUrl }}
      />
      <View style={styles.details}>
        <Text fontWeight="bold" fontSize="subheading" testID="fullName">
          {repository.fullName}
        </Text>
        <Text color="textSecondary" testID="description">
          {repository.description}
        </Text>
        {repository.language && (
          <Text style={styles.language} testID="language">
            {repository.language}
          </Text>
        )}
      </View>
    </View>

    <View style={styles.spacer}>
      <RepositoryStats repository={repository} />
    </View>

    {showUrl && repository.url && (
      <Pressable
        style={styles.button}
        onPress={() => void Linking.openURL(repository.url)}
      >
        <Text fontWeight="bold" style={styles.buttonText}>
          Open in GitHub
        </Text>
      </Pressable>
    )}
  </View>
);

export default RepositoryItem;
