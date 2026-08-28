import { useField } from 'formik';
import { StyleSheet, TextInput, View } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.white,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 5,
    padding: 12,
  },
  errorInput: { borderColor: theme.colors.error },
  errorText: { marginBottom: 10 },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        style={[styles.input, showError && styles.errorInput]}
        {...props}
      />
      {showError && (
        <Text color="error" style={styles.errorText}>
          {meta.error}
        </Text>
      )}
    </View>
  );
};

export default FormikTextInput;
