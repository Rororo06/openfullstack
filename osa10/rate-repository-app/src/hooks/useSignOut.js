import { useApolloClient } from '@apollo/client/react';

import useAuthStorage from './useAuthStorage';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  return async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };
};

export default useSignOut;
