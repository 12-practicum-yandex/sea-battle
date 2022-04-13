import { useSignInMutation } from '@api/auth';
import { PageLayout } from '@layouts';
import { SignInForm } from '@components';
import { TSignInFormValues } from '@components/sign-in-form/types';

export const SignIn = () => {
  const [signInMutation, { isLoading: isSignInMutationLoading }] = useSignInMutation();

  const onSubmit = (values: TSignInFormValues) => signInMutation(values);

  return (
    <PageLayout isCenter>
      <SignInForm onSubmit={onSubmit} isLoading={isSignInMutationLoading} />
    </PageLayout>
  );
};
