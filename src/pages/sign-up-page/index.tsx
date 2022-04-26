import { useSnackbar } from 'notistack';

import { PageLayout } from '@layouts';
import { SignUpForm } from '@components';
import { useSignUpMutation } from '@api/auth';
import { TSignUpFormValues } from '@components/sign-up-form/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

export const SignUpPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [signUpMutation, { isLoading }] = useSignUpMutation();

  const onSubmit = async (values: TSignUpFormValues) => {
    try {
      signUpMutation({
        email: values.email,
        first_name: values['first_name'],
        login: values.login,
        password: values.password,
        phone: values.phone,
        second_name: values['second_name'],
      }).unwrap();
      navigate(ROUTES.INIT_GAME);
    } catch (error) {
      enqueueSnackbar('Что-то пошло не так', {
        variant: 'error',
      });
    }
  };

  return (
    <PageLayout isCenter>
      <SignUpForm onSubmit={onSubmit} isLoading={isLoading} />
    </PageLayout>
  );
};
