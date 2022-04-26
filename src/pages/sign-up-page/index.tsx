import { PageLayout } from '@layouts';
import { SignUpForm } from '@components';
import { useSignUpMutation } from '@api/auth';
import { TSignUpFormValues } from '@components/sign-up-form/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [signUpMutation, { isLoading }] = useSignUpMutation();

  const onSubmit = (values: TSignUpFormValues) =>
    signUpMutation({
      email: values.email,
      first_name: values['first_name'],
      login: values.login,
      password: values.password,
      phone: values.phone,
      second_name: values['second_name'],
    })
      .unwrap()
      .then(() => navigate(ROUTES.INIT_GAME));

  return (
    <PageLayout isCenter>
      <SignUpForm onSubmit={onSubmit} isLoading={isLoading} />
    </PageLayout>
  );
};
