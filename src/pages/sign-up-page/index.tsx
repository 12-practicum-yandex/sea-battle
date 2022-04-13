import { PageLayout } from '@layouts';
import { ProfileForm } from '@components';
import { useSignUpMutation } from '@api/auth';
import { TSignUpFormValues } from '@components/profile-form/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [signUpMutation, { isLoading }] = useSignUpMutation();

  const onSubmit = (values: TSignUpFormValues) =>
    signUpMutation({
      email: values.email,
      first_name: values['first-name'],
      login: values.login,
      password: values.password,
      phone: values.phone,
      second_name: values['second-name'],
    })
      .unwrap()
      .then(() => navigate(ROUTES.INIT_GAME));

  return (
    <PageLayout isCenter>
      <ProfileForm onSubmit={onSubmit} isLoading={isLoading} />
    </PageLayout>
  );
};
