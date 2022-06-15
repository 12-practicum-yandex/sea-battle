import { AuthPageLayout } from '@layouts';
import { Typography, Button, styled, CircularProgress } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { ForumCategoryCard } from '@components/forum-category-card';
import { useGetTopicsQuery } from '@api/forum';
import { ROUTES } from '@constants/routes';

const PageWrapper = styled('div')`
  color: #1e1e1e;
`;

const Top = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ForumPage = () => {
  const { data, isLoading } = useGetTopicsQuery({});

  return (
    <AuthPageLayout>
      <PageWrapper>
        <Top>
          <Typography variant={'h4'}>Категории1</Typography>
          <Button variant="outlined">
            <AddIcon />
            Добавить
          </Button>
        </Top>
        {isLoading && <CircularProgress />}
        {data?.map(({ title, description, id }) => (
          <ForumCategoryCard
            title={title}
            textPreview={description}
            themCounter={153}
            answerCounter={123}
            lastTheme="Название темы"
            to={`${ROUTES.FORUM_TOPIC}/${id}`}
            key={id}
          />
        ))}
      </PageWrapper>
    </AuthPageLayout>
  );
};
