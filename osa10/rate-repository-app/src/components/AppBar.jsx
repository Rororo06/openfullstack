import { useQuery } from '@apollo/client/react';
import Constants from 'expo-constants';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const signOut = useSignOut();
  const me = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {me ? (
          <>
            <AppBarTab to="/create-review">Create a review</AppBarTab>
            <AppBarTab to="/my-reviews">My reviews</AppBarTab>
            <AppBarTab onPress={() => void signOut()}>Sign out</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab to="/signin">Sign in</AppBarTab>
            <AppBarTab to="/signup">Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
