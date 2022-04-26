import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import { TextField, styled, Card, CardContent, Button, CircularProgress } from '@mui/material';

import { regexp } from '@constants/regexp';

import { ProfileFormNames, TProfileFormValues } from './types';
import { TGetUserResponse } from '@api/auth/types';

const schema = yup
  .object({
    first_name: yup.string().required('Обязательно поле'),
    second_name: yup.string().required('Обязательно поле'),
    email: yup.string().required('Обязательно поле').matches(regexp.email, 'Неверный формат'),
    login: yup.string().required('Обязательно поле'),
    display_name: yup.string().required('Обязательно поле'),
    phone: yup.string().required('Обязательно поле').matches(regexp.phone, 'Неверный формат'),
  })
  .required();

const Content = styled(CardContent)`
  width: 400px;
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

type Props = {
  isLoading: boolean;
  onSubmit: (values: TProfileFormValues) => Promise<void>;
  submitButtonText?: string;
  initialValues: TGetUserResponse | null;
};

export const ProfileForm = ({ onSubmit, isLoading, submitButtonText, initialValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues || {}, resolver: yupResolver(schema), mode: 'all' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Content>
          <TextField
            fullWidth
            label="Имя"
            {...register(ProfileFormNames.FirstName)}
            helperText={errors[ProfileFormNames.FirstName]?.message}
            error={Boolean(errors[ProfileFormNames.FirstName])}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Фамилия"
            {...register(ProfileFormNames.SecondName)}
            helperText={errors[ProfileFormNames.SecondName]?.message}
            error={Boolean(errors[ProfileFormNames.SecondName])}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Email"
            {...register(ProfileFormNames.Email)}
            helperText={errors[ProfileFormNames.Email]?.message}
            error={Boolean(errors[ProfileFormNames.Email])}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Логин"
            {...register(ProfileFormNames.Login)}
            helperText={errors[ProfileFormNames.Login]?.message}
            error={Boolean(errors[ProfileFormNames.Login])}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Отображаемое имя"
            {...register(ProfileFormNames.DisplayName)}
            helperText={errors[ProfileFormNames.DisplayName]?.message}
            error={Boolean(errors[ProfileFormNames.DisplayName])}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Телефон"
            {...register(ProfileFormNames.Phone)}
            helperText={errors[ProfileFormNames.Phone]?.message}
            error={Boolean(errors[ProfileFormNames.Phone])}
            disabled={isLoading}
          />
          <Button variant="outlined" type="submit" fullWidth disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : submitButtonText || 'Изменить профиль'}
          </Button>
        </Content>
      </Card>
    </form>
  );
};
