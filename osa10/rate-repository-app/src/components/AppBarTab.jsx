import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  tab: { paddingHorizontal: 10, paddingVertical: 15 },
  text: { color: theme.colors.appBarText },
});

const AppBarTab = ({ children, to, onPress }) =>
  to ? (
    <Link to={to} style={styles.tab}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
        {children}
      </Text>
    </Link>
  ) : (
    <Pressable onPress={onPress} style={styles.tab}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
        {children}
      </Text>
    </Pressable>
  );

export default AppBarTab;
