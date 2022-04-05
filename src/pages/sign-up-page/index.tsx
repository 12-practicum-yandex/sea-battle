import { PageLayout } from 'layouts';
import { ProfileForm } from 'components';

export const SignUpPage = () => {
  const onSubmit = (values: any) => {
    console.log(values);

    return Promise.resolve();
  };

  return (
    <PageLayout isCenter>
      <ProfileForm onSubmit={onSubmit} isLoading={false} />
    </PageLayout>
  );
};
