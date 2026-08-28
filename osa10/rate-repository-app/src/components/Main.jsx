import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';

import theme from '../theme';
import AppBar from './AppBar';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => (
  <View style={styles.container}>
    <AppBar />
    <Routes>
      <Route path="/" element={<RepositoryList />} />
      <Route path="/repositories/:id" element={<SingleRepository />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create-review" element={<CreateReview />} />
      <Route path="/my-reviews" element={<MyReviews />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </View>
);

export default Main;
