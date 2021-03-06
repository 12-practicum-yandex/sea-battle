import { useForm, Controller } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Link,
  styled,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from '@mui/material';

import { ROUTES } from '@constants/routes';
import { regexp } from '@constants/regexp';

import { TSignUpFormValues } from './types';
import { TextMaskCustom } from '../text-mask-custom';

const schema = yup
  .object({
    first_name: yup.string().required('Обязательно поле'),
    second_name: yup.string().required('Обязательно поле'),
    email: yup.string().required('Обязательно поле').matches(regexp.email, 'Неверный формат'),
    login: yup.string().required('Обязательно поле'),
    password: yup.string().required('Обязательно поле'),
    phone: yup.string().required('Обязательно поле').matches(regexp.phone, 'Неверный формат'),
  })
  .required();

const Content = styled(CardContent)`
  width: 400px;
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const defaultValues: TSignUpFormValues = {
  first_name: '',
  second_name: '',
  email: '',
  login: '',
  password: '',
  phone: '',
};

type Props = {
  isLoading: boolean;
  onSubmit: (values: TSignUpFormValues) => Promise<unknown>;
  submitButtonText?: string;
  isVisibleLoginLink?: boolean;
};

export const SignUpForm = ({
  onSubmit,
  isLoading,
  submitButtonText,
  isVisibleLoginLink = true,
}: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'all' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Content>
          <TextField
            fullWidth
            label="Имя"
            {...register('first_name')}
            helperText={errors['first_name']?.message}
            error={Boolean(errors['first_name'])}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Фамилия"
            {...register('second_name')}
            helperText={errors['second_name']?.message}
            error={Boolean(errors['second_name'])}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Email"
            {...register('email')}
            helperText={errors['email']?.message}
            error={Boolean(errors['email'])}
            disabled={isLoading}
          />
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
            label="Пароль"
            {...register('password')}
            helperText={errors['password']?.message}
            error={Boolean(errors['password'])}
            disabled={isLoading}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Телефон"
                helperText={errors['phone']?.message}
                error={Boolean(errors['phone'])}
                disabled={isLoading}
                InputProps={{
                  inputComponent: TextMaskCustom as any,
                }}
              />
            )}
          />

          {isVisibleLoginLink && (
            <Link to={ROUTES.SIGN_IN} component={NavLink}>
              Есть аккаунт
            </Link>
          )}

          <Button variant="outlined" type="submit" fullWidth disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : submitButtonText || 'Зарегистрироваться'}
          </Button>
        </Content>
      </Card>
    </form>
  );
};
