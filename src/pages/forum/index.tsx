import { AuthPageLayout } from '@layouts';
import { Typography, Button, styled, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ForumCategoryCard } from '@components/forum-category-card';
import { useGetTopicsQuery } from '@api/forum';
import { ROUTES } from '@constants/routes';
import { useNavigate, Link as LinkBase } from 'react-router-dom';

const PageWrapper = styled('div')`
  color: #1e1e1e;
`;

const Top = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Link = styled(LinkBase)`
  text-decoration: none;
`;

export const ForumPage = () => {
  const { data, isLoading } = useGetTopicsQuery();

  const navigate = useNavigate();

  return (
    <AuthPageLayout>
      <PageWrapper>
        <Top>
          <Typography variant={'h4'}>Категории</Typography>
          <Button
            onClick={() => {
              navigate(ROUTES.TOPIC_CREATE);
            }}
            variant="outlined"
          >
            <AddIcon />
            Добавить
          </Button>
        </Top>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {data?.map(({ title, description, id }) => (
              <Link to={ROUTES.FORUM_TOPIC(id)} key={id}>
                <ForumCategoryCard title={title} textPreview={description} />
              </Link>
            ))}
          </>
        )}
      </PageWrapper>
    </AuthPageLayout>
  );
};
