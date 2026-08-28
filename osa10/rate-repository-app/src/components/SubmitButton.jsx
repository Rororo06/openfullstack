import { Pressable, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 10,
    padding: 15,
  },
  text: { color: theme.colors.white, textAlign: 'center' },
});

const SubmitButton = ({ onPress, children, testID }) => (
  <Pressable onPress={onPress} style={styles.button} testID={testID}>
    <Text fontWeight="bold" style={styles.text}>
      {children}
    </Text>
  </Pressable>
);

export default SubmitButton;
