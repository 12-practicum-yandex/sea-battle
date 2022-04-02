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

import { ROUTES } from 'constants/routes';
import { regexp } from 'constants/regexp';

import { TSignUpFormValues } from './types';
import { TextMaskCustom } from '../text-mask-custom';

const schema = yup
  .object({
    'first-name': yup.string().required('Обязательно поле'),
    'second-name': yup.string().required('Обязательно поле'),
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
  'first-name': '',
  'second-name': '',
  email: '',
  login: '',
  password: '',
  phone: '',
};

type Props = {
  isLoading: boolean;
  onSubmit: (values: TSignUpFormValues) => Promise<void>;
};

export const SignUpForm = ({ onSubmit, isLoading }: Props) => {
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
            {...register('first-name')}
            helperText={errors['first-name']?.message}
            error={Boolean(errors['first-name'])}
          />
          <TextField
            fullWidth
            label="Фамилия"
            {...register('second-name')}
            helperText={errors['second-name']?.message}
            error={Boolean(errors['second-name'])}
          />
          <TextField
            fullWidth
            label="Email"
            {...register('email')}
            helperText={errors['email']?.message}
            error={Boolean(errors['email'])}
          />
          <TextField
            fullWidth
            label="Логин"
            {...register('login')}
            helperText={errors['login']?.message}
            error={Boolean(errors['login'])}
          />
          <TextField
            fullWidth
            label="Пароль"
            {...register('password')}
            helperText={errors['password']?.message}
            error={Boolean(errors['password'])}
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
                InputProps={{
                  inputComponent: TextMaskCustom as any,
                }}
              />
            )}
          />

          <Link to={ROUTES.SIGN_IN} component={NavLink}>
            Есть аккаунт
          </Link>

          <Button variant="outlined" type="submit" fullWidth disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
          </Button>
        </Content>
      </Card>
    </form>
  );
};
