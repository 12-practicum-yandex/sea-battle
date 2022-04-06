import { Paper, Box, Typography, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { PageLayout } from 'layouts';

export const Page404 = () => (
  <PageLayout isCenter>
    <Paper elevation={10}>
      <Box display="flex" flexDirection="column" alignItems="center" width={500} p={3}>
        <Typography variant="h2">404</Typography>
        <Box mb={5} />
        <Typography>Кажется вы заблудились</Typography>
        <Box mb={6} />
        <Link component={NavLink} to="/">
          Вернуться
        </Link>
      </Box>
    </Paper>
  </PageLayout>
);
