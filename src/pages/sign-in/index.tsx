import { useSignInMutation } from '@api/auth';
import { PageLayout } from '@layouts';
import { SignInForm } from '@components';
import { TSignInFormValues } from '@components/sign-in-form/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@features/auth';

export const SignIn = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [signInMutation, { isLoading: isSignInMutationLoading }] = useSignInMutation();

  const onSubmit = async (values: TSignInFormValues) => {
    await signInMutation(values);
    setAuth(true);
    navigate(ROUTES.INIT_GAME);
  };

  return (
    <PageLayout isCenter>
      <SignInForm onSubmit={onSubmit} isLoading={isSignInMutationLoading} />
    </PageLayout>
  );
};
