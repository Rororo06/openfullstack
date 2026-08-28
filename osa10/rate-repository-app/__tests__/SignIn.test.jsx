import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { SignInContainer } from '../src/components/SignIn';

describe('SignIn', () => {
  it('calls onSubmit with the filled in values', async () => {
    const onSubmit = jest.fn();

    render(<SignInContainer onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
    fireEvent.press(screen.getByTestId('submitButton'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      });
    });
  });
});
