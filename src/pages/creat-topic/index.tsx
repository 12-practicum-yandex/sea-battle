import { AuthPageLayout } from '@layouts';
import { styled } from '@mui/material';
import { useCreateTopicMutation, useGetTopicsQuery } from '@api/forum';
import { useCallback } from 'react';
import { CreateTopic } from '@api/forum/types';
import { TopicForm } from '@components/topic-form';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '@api/auth';
import { ROUTES } from '@constants/routes';

const PageWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const CreateTopicPage = () => {
  const [createTopicMutation, { isLoading }] = useCreateTopicMutation();
  const { refetch } = useGetTopicsQuery();

  const { data: userData } = useGetUserQuery();

  const navigate = useNavigate();

  const handleCreateTopic = useCallback(
    async (values: CreateTopic) => {
      try {
        await createTopicMutation({
          ...values,
          userId: userData?.id,
          userLogin: userData?.login,
        });
        await refetch();
        navigate(ROUTES.FORUM);
      } catch (e) {
        console.log(e);
      }
    },
    [userData],
  );

  return (
    <AuthPageLayout>
      <PageWrapper>
        <TopicForm isLoading={isLoading} onSubmit={handleCreateTopic} />
      </PageWrapper>
    </AuthPageLayout>
  );
};
