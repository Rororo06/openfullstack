import { StyleSheet, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10,
  },
});

const RepositoryListHeader = ({
  order,
  onOrderChange,
  searchQuery,
  onSearchQueryChange,
}) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search"
      value={searchQuery}
      onChangeText={onSearchQueryChange}
    />
    <Picker selectedValue={order} onValueChange={onOrderChange}>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  </View>
);

export default RepositoryListHeader;
