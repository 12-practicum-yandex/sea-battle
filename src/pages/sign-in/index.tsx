import { PageLayout } from 'layouts';
import { SignInForm } from 'components';

export const SignIn = () => {
  const onSubmit = (values: any) => {
    console.log(values);

    return Promise.resolve();
  };

  return (
    <PageLayout isCenter>
      <SignInForm onSubmit={onSubmit} isLoading={false} />
    </PageLayout>
  );
};
