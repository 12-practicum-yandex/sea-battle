import { AuthPageLayout } from '@layouts';
import { Typography, Button, styled } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { ForumCategoryCard } from '@components/forum-category-card';

const PageWrapper = styled('div')`
  color: #1e1e1e;
`;

const Top = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ForumPage = () => {
  return (
    <AuthPageLayout>
      <PageWrapper>
        <Top>
          <Typography variant={'h4'}>Категории</Typography>
          <Button variant="outlined">
            <AddIcon />
            Добавить
          </Button>
        </Top>
        <ForumCategoryCard
          title="Новые игры"
          textPreview="Lorem ipsum dolor sit amыet, consectetur adipisicing elit."
          themCounter={153}
          answerCounter={123}
          lastTheme="Название темы"
        />
        <ForumCategoryCard
          title="Новинки консолей"
          textPreview="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto autem ducimus libero natus nesciunt quis suscipit! Iure minus sunt ut!"
          themCounter={53}
          answerCounter={23}
          lastTheme="PSP"
        />
      </PageWrapper>
    </AuthPageLayout>
  );
};
