import { PageLayout } from 'layouts';
import { InitGameForm } from 'components';

export const InitGame = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <PageLayout isCenter>
      <InitGameForm onSubmit={onSubmit} />
    </PageLayout>
  );
};
