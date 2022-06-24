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
  oauthUri: string;
};

export const SignInForm = ({ isLoading, onSubmit, oauthUri }: Props) => {
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
          <a href={oauthUri}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path
                d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z"
                fill="#FC3F1D"
              />
              <path
                d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z"
                fill="#fff"
              />
            </svg>
          </a>
        </Content>
      </Card>
    </form>
  );
};
