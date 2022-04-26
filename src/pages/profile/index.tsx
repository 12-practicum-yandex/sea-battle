import { styled, Card as CardBase, Avatar } from '@mui/material';
import { AuthPageLayout } from '@layouts';
import { useAuth } from '@features/auth';
import { baseUrl } from '@constants/base-url';
import { ProfileForm } from '@components/profile-form';
import { useUpdateProfileMutation, useUpdateAvatarMutation } from '@api/profile';
import { useCallback } from 'react';
import { TProfileFormValues } from '@components/profile-form/types';
import { useSnackbar } from 'notistack';

const ContentWrapper = styled('div')`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Card = styled(CardBase)`
  width: 400px;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const Input = styled('input')`
  display: none;
`;

const Label = styled('label')`
  cursor: pointer;
`;

export const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [profileMutation, { isLoading }] = useUpdateProfileMutation();
  const [avatarMutation] = useUpdateAvatarMutation();

  const onSubmit = useCallback(async (values: TProfileFormValues) => {
    try {
      const res = await profileMutation(values).unwrap();
      setUser(res);
    } catch (e) {
      enqueueSnackbar('Не удалось обновить профиль', {
        variant: 'error',
      });
    }
  }, []);

  const onChangeAvatar = async (e: any) => {
    try {
      const formData = new FormData();
      formData.append('avatar', e.target.files[0]);
      const res = await avatarMutation(formData).unwrap();
      setUser(res);
    } catch (e) {
      enqueueSnackbar('Не удалось обновить аватар', {
        variant: 'error',
      });
    }
  };

  return (
    <AuthPageLayout>
      <ContentWrapper>
        <Card>
          <Label htmlFor="avatar">
            <Avatar
              src={`${baseUrl}/resources${user?.avatar}`}
              sx={{ width: 130, height: 130 }}
              variant="rounded"
            >
              {user?.first_name[0].toUpperCase()}
              {user?.second_name[0].toUpperCase()}
            </Avatar>
            <Input onChange={onChangeAvatar} id={'avatar'} type={'file'} />
          </Label>
        </Card>
        <ProfileForm onSubmit={onSubmit} initialValues={user} isLoading={isLoading} />
      </ContentWrapper>
    </AuthPageLayout>
  );
};
