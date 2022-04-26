import { styled, Card as CardBase, Avatar, Input as InputBase } from '@mui/material';
import { AuthPageLayout } from '@layouts';
import { useAuth } from '@features/auth';
import { baseUrl } from '@constants/base-url';
import { ProfileForm } from '@components/profile-form';
import { useUpdateProfileMutation } from '@api/profile';
import { useCallback } from 'react';
import { TProfileFormValues } from '@components/profile-form/types';

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

const Input = styled(InputBase)`
  display: none;
`;

const Label = styled('label')`
  cursor: pointer;
`;

export const ProfilePage = () => {
  const { user } = useAuth();

  const [profileMutation, { isLoading }] = useUpdateProfileMutation();

  const onSubmit = useCallback(async (values: TProfileFormValues) => {
    profileMutation(values).unwrap();
  }, []);

  const onChangeAvatar = (e: any) => {
    console.log(e.target.files);
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
