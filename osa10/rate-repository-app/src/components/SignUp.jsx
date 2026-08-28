import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import useSignUp from '../hooks/useSignUp';
import FormikTextInput from './FormikTextInput';
import SubmitButton from './SubmitButton';

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', padding: 15 },
});

const initialValues = { username: '', password: '', passwordConfirm: '' };

const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      await signUp({ username, password });
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => void onSubmit(values)}
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
            <FormikTextInput
              name="passwordConfirm"
              placeholder="Password confirmation"
              secureTextEntry
            />
            <SubmitButton onPress={handleSubmit}>Sign up</SubmitButton>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;
