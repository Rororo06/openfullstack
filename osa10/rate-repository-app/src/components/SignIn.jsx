import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import SubmitButton from './SubmitButton';

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', padding: 15 },
});

const initialValues = { username: '', password: '' };

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

// Split out so the form can be tested without mocking the mutation.
export const SignInContainer = ({ onSubmit }) => (
  <View style={styles.container}>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <SubmitButton onPress={handleSubmit} testID="submitButton">
            Sign in
          </SubmitButton>
        </View>
      )}
    </Formik>
  </View>
);

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async values => {
    try {
      await signIn(values);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return <SignInContainer onSubmit={values => void onSubmit(values)} />;
};

export default SignIn;
