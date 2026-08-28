import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import useCreateReview from '../hooks/useCreateReview';
import FormikTextInput from './FormikTextInput';
import SubmitButton from './SubmitButton';

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', padding: 15 },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup.string(),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async values => {
    try {
      const { repositoryId } = await createReview(values);
      navigate(`/repositories/${repositoryId}`);
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
            <FormikTextInput name="ownerName" placeholder="Repository owner name" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
            />
            <FormikTextInput name="text" placeholder="Review" multiline />
            <SubmitButton onPress={handleSubmit}>Create a review</SubmitButton>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateReview;
