import { FC, memo } from 'react';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

const Button = styled(Fab)`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing(2)};
  right: ${({ theme }) => theme.spacing(2)};
`;

interface IProps {
  onClick: () => void;
  isOpen: boolean;
}

export const FullscreenButton: FC<IProps> = memo(({ onClick, isOpen }: IProps) => {
  return <Button onClick={onClick}>{isOpen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}</Button>;
});
