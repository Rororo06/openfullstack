import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import Constants from 'expo-constants';

const httpLink = new HttpLink({
  uri: Constants.expoConfig.extra.apolloUri,
});

const createApolloClient = authStorage => {
  const authLink = new SetContextLink(async ({ headers }) => {
    const accessToken = await authStorage.getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
