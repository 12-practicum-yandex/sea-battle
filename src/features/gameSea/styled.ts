import { styled } from '@mui/material';

export const CanvasContainer = styled('div')(() => ({
  display: 'flex',
  width: 'min-content',
  paddingRight: 20,
  maxHeight: 500,
}));

export const ShipsContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: 330,
}));

export const BoardContainer = styled('div')(() => ({
  display: 'flex',
}));

export const GameContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Header = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: 10,
  width: '100%',
}));
