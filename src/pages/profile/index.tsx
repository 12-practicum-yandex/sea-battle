import { styled, Card as CardBase, Avatar, Input as InputBase } from '@mui/material';
import { AuthPageLayout } from 'layouts';
import { SignUpForm } from 'components';
import { useCallback } from 'react';

const ContentWrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Card = styled(CardBase)`
  flex-grow: 1;
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
  const onSubmit = useCallback((values: any) => {
    console.log(values);

    return Promise.resolve();
  }, []);

  const onChangeAvatar = useCallback((e) => {
    console.log(e.target.files);
  }, []);

  return (
    <AuthPageLayout>
      <ContentWrapper>
        <Card>
          <Label htmlFor="avatar">
            <Avatar sx={{ width: 130, height: 130 }} variant="rounded">
              NO
            </Avatar>
            <Input onChange={onChangeAvatar} id={'avatar'} type={'file'} />
          </Label>
        </Card>
        <SignUpForm
          onSubmit={onSubmit}
          isLoading={false}
          submitButtonText={'Изменить данные'}
          isVisibleLoginLink={false}
        />
      </ContentWrapper>
    </AuthPageLayout>
  );
};
