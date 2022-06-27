import { Button, Card, CircularProgress, styled, TextField, CardContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateTopic } from '@api/forum/types';
import * as yup from 'yup';

const schema = yup
  .object({
    title: yup.string().required('Обязательно поле'),
    description: yup.string().required('Обязательно поле'),
  })
  .required();

const Container = styled(Card)`
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: ${({ theme }) => `${theme.spacing(2)}`};
`;

const Content = styled(CardContent)`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-direction: column;
`;

const defaultValues = {
  title: '',
  description: '',
};

interface IProps {
  isLoading: boolean;
  onSubmit: (values: CreateTopic) => void;
}

export const TopicForm = ({ isLoading, onSubmit }: IProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <TextField
            fullWidth
            label="Название темы"
            {...register('title')}
            helperText={errors['title']?.message}
            error={Boolean(errors['title'])}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Описание"
            {...register('description')}
            helperText={errors['description']?.message}
            error={Boolean(errors['description'])}
            disabled={isLoading}
          />
          <Button variant="outlined" type="submit" fullWidth>
            {isLoading ? <CircularProgress size={24} /> : 'Создать'}
          </Button>
        </Content>
      </form>
    </Container>
  );
};
