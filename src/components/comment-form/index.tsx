import { memo, useEffect } from 'react';
import { Fab, CircularProgress, TextField, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Props = {
  onSubmit: (values: { comment: string; parent_id?: number }) => void;
  isLoading: boolean;
};

const defaultValues = {
  comment: '',
};

const Button = styled(Fab)`
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Form = styled('form')`
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const schema = yup
  .object({
    comment: yup.string().required('Обязательно поле'),
  })
  .required();

export const CommentForm = memo(({ onSubmit, isLoading }: Props) => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <TextField
          fullWidth
          label="Комментарий"
          {...register('comment')}
          helperText={errors['comment']?.message}
          error={Boolean(errors['comment'])}
          disabled={isLoading}
        />
        <Button color={'primary'} size={'small'} type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
        </Button>
      </Wrapper>
    </Form>
  );
});
