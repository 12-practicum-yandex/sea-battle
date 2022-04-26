import { Paper, Box, Typography, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { PageLayout } from '@layouts';

export const Page500 = () => (
  <PageLayout isCenter>
    <Paper elevation={10}>
      <Box display="flex" flexDirection="column" alignItems="center" width={500} p={3}>
        <Typography variant="h2">500</Typography>
        <Box mb={5} />
        <Typography>Сервис немного устал, но мы приводим его в чувства</Typography>
        <Box mb={6} />
        <Link component={NavLink} to="/">
          Вернуться
        </Link>
      </Box>
    </Paper>
  </PageLayout>
);
