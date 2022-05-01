import { PageLayout } from '@layouts';
import { SignUpForm } from '@components';
import { useSignUpMutation } from '@api/auth';
import { TSignUpFormValues } from '@components/sign-up-form/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@features/auth';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [signUpMutation, { isLoading }] = useSignUpMutation();

  const onSubmit = async (values: TSignUpFormValues) => {
    await signUpMutation({
      email: values.email,
      first_name: values['first_name'],
      login: values.login,
      password: values.password,
      phone: values.phone,
      second_name: values['second_name'],
    });
    setAuth(true);
    navigate(ROUTES.INIT_GAME);
  };

  return (
    <PageLayout isCenter>
      <SignUpForm onSubmit={onSubmit} isLoading={isLoading} />
    </PageLayout>
  );
};
