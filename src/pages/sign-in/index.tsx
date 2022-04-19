import { useSnackbar } from 'notistack';

import { useSignInMutation } from '@api/auth';
import { PageLayout } from '@layouts';
import { SignInForm } from '@components';
import { TSignInFormValues } from '@components/sign-in-form/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

export const SignIn = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [signInMutation, { isLoading: isSignInMutationLoading }] = useSignInMutation();

  const onSubmit = async (values: TSignInFormValues) => {
    try {
      await signInMutation(values).unwrap();
      navigate(ROUTES.INIT_GAME);
    } catch (error) {
      enqueueSnackbar('Что-то пошло не так', {
        variant: 'error',
      });
    }
  };

  return (
    <PageLayout isCenter>
      <SignInForm onSubmit={onSubmit} isLoading={isSignInMutationLoading} />
    </PageLayout>
  );
};
