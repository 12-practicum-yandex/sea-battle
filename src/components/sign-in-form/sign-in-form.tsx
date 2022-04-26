import {
  Card,
  CardContent,
  styled,
  TextField,
  Link,
  CircularProgress,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

import { TSignInFormValues } from './types';

const schema = yup
  .object({
    login: yup.string().required('Обязательно поле'),
    password: yup.string().required('Обязательно поле'),
  })
  .required();

const defaultValues: TSignInFormValues = {
  login: '',
  password: '',
};

const Content = styled(CardContent)`
  width: 400px;
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

type Props = {
  isLoading: boolean;
  onSubmit: (values: TSignInFormValues) => Promise<unknown>;
};

export const SignInForm = ({ isLoading, onSubmit }: Props) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Content>
          <TextField
            fullWidth
            label="Логин"
            {...register('login')}
            helperText={errors['login']?.message}
            error={Boolean(errors['login'])}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            type="password"
            label="Пароль"
            {...register('password')}
            helperText={errors['password']?.message}
            error={Boolean(errors['password'])}
            disabled={isLoading}
          />

          <Link to={ROUTES.SIGN_UP} component={NavLink}>
            Нет аккаунта
          </Link>

          <Button variant="outlined" type="submit" fullWidth disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Войти'}
          </Button>
        </Content>
      </Card>
    </form>
  );
};
