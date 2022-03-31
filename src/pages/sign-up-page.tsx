import { PageLayout } from 'layouts';
import { SignUpForm } from 'components';

export const SignUpPage = () => {
  const onSubmit = (values: any) => {
    console.log(values);

    return Promise.resolve();
  };

  return (
    <PageLayout isCenter>
      <SignUpForm onSubmit={onSubmit} />
    </PageLayout>
  );
};
