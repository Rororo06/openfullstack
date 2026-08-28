import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  get key() {
    return `${this.namespace}:accessToken`;
  }

  async getAccessToken() {
    return AsyncStorage.getItem(this.key);
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(this.key, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.key);
  }
}

export default AuthStorage;
