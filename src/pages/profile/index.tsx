import { styled, Card as CardBase, Avatar } from '@mui/material';
import { AuthPageLayout } from '@layouts';
import { baseUrl } from '@constants/base-url';
import { ProfileForm } from '@components/profile-form';
import { useUpdateProfileMutation, useUpdateAvatarMutation } from '@api/profile';
import { useGetUserQuery } from '@api/auth';
import { useCallback } from 'react';
import { TProfileFormValues } from '@components/profile-form/types';
import { useSnackbar } from 'notistack';
import { CreateThemeDialog } from '@components/themes';

const ContentWrapper = styled('div')`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Card = styled(CardBase)`
  width: 400px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const Input = styled('input')`
  display: none;
`;

const Label = styled('label')`
  cursor: pointer;
`;

export const ProfilePage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [profileMutation, { isLoading }] = useUpdateProfileMutation();
  const [avatarMutation] = useUpdateAvatarMutation();

  const { data: userData, refetch } = useGetUserQuery();

  const onSubmit = useCallback(async (values: TProfileFormValues) => {
    try {
      await profileMutation(values).unwrap();
      refetch();
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
      await avatarMutation(formData).unwrap();
      refetch();
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
              src={`${baseUrl}/resources${userData?.avatar}`}
              sx={{ width: 130, height: 130 }}
              variant="rounded"
            >
              {userData?.first_name[0].toUpperCase()}
              {userData?.second_name[0].toUpperCase()}
            </Avatar>
            <Input onChange={onChangeAvatar} id={'avatar'} type={'file'} />
          </Label>
          <CreateThemeDialog />
        </Card>
        <ProfileForm onSubmit={onSubmit} initialValues={userData ?? null} isLoading={isLoading} />
      </ContentWrapper>
    </AuthPageLayout>
  );
};
