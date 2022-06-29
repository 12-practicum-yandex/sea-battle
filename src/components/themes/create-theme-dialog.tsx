import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useGetThemesQuery } from '@api/themes';
import { useMemo, useState } from 'react';
import { THEME } from '@constants/colors';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    minWidth: 350,
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    minWidth: 350,
    padding: theme.spacing(1),
  },
}));

const ButtonColors = styled('button')(({ colorTheme }: { colorTheme: string }) => ({
  marginLeft: 10,
  width: 45,
  height: 45,
  borderRadius: 8,
  border: `1px solid ${colorTheme}`,
  background: colorTheme,
  transition: '0.2s',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#fff',
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export const CreateThemeDialog = () => {
  const dispatch = useDispatch();
  const [themesName, setThemesName] = useState<['blue', 'dark'] | []>([]);
  const { data: allThemes } = useGetThemesQuery();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const closeTheme = async () => {
    setOpen(false);
  };

  const changeThemeApp = (theme: 'blue' | 'dark') => {
    if (theme === 'blue') {
      dispatch({ type: 'theme/blue' });
    } else {
      dispatch({ type: 'theme/dark' });
    }
  };

  useMemo(() => {
    if (allThemes !== undefined) {
      const themes = allThemes.filter((item) => item.theme === 'dark' || item.theme === 'blue');
      const themesFilter = themes.map((item) => item.theme);

      setThemesName(JSON.parse(JSON.stringify(themesFilter)));
    }
  }, [allThemes]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Выберите тему
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography variant="body1">Выберите параметры палитры</Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {themesName.map((theme, index) => (
            <ButtonColors
              key={index}
              colorTheme={THEME[theme].palette.primary.main}
              onClick={() => changeThemeApp(theme)}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeTheme}>
            Закрыть
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
