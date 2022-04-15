import { useSignInMutation } from '@api/auth';
import { PageLayout } from '@layouts';
import { SignInForm } from '@components';
import { TSignInFormValues } from '@components/sign-in-form/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

export const SignIn = () => {
  const navigate = useNavigate();

  const [signInMutation, { isLoading: isSignInMutationLoading }] = useSignInMutation();

  const onSubmit = (values: TSignInFormValues) =>
    signInMutation(values)
      .unwrap()
      .then(() => navigate(ROUTES.INIT_GAME));

  return (
    <PageLayout isCenter>
      <SignInForm onSubmit={onSubmit} isLoading={isSignInMutationLoading} />
    </PageLayout>
  );
};
