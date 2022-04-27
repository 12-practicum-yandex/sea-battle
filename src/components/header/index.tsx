import { styled, Avatar, Typography } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@features/auth';
import { baseUrl } from '@constants/base-url';
import { useLogoutMutation, useGetUserQuery } from '@api/auth';

const HeaderWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #1e4676;
`;

const Title = styled('h1')`
  padding: 20px;
  margin: 0;
  font-size: 36px;
  font-weight: 400;
`;

const Navigation = styled('nav')`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;
`;

const MenuItem = styled(NavLink)<{ isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #1e4676;
  &.active {
    text-decoration: underline;
  }
`;

const Profile = styled('div')`
  padding: 0 20px;
  width: 250px;
  display: flex;
  justify-content: flex-end;
`;

const ProfileLeft = styled('div')`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
`;

const ProfileName = styled('div')`
  color: #1e1e1e;
`;

const LogoutLink = styled(Typography)`
  color: #1e4676;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
`;

const menu = [
  {
    label: 'Игра',
    link: ROUTES.GAME,
  },
  {
    label: 'Таблица лидеров',
    link: ROUTES.LEADERBOARD,
  },
  {
    label: 'Форум',
    link: ROUTES.FORUM,
  },
];

export const Header = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [logoutMutation] = useLogoutMutation();
  const handleLogout = () => {
    logoutMutation().then(() => {
      setAuth(false);
      navigate(ROUTES.SIGN_IN);
    });
  };
  const { data: userData } = useGetUserQuery();
  return (
    <HeaderWrapper>
      <Title>Атлантида</Title>
      <Navigation>
        {menu.map(({ label, link }) => (
          <MenuItem to={link} key={label}>
            {label}
          </MenuItem>
        ))}
      </Navigation>
      <Profile>
        <ProfileLeft>
          <ProfileName>
            {[userData?.first_name, userData?.second_name].filter(Boolean).join(' ')}
          </ProfileName>
          <LogoutLink onClick={handleLogout}>Выход</LogoutLink>
        </ProfileLeft>
        <Link to={ROUTES.PROFILE}>
          <Avatar variant="rounded" src={`${baseUrl}/resources${userData?.avatar}`}>
            {userData?.first_name[0].toUpperCase()}
            {userData?.second_name[0].toUpperCase()}
          </Avatar>
        </Link>
      </Profile>
    </HeaderWrapper>
  );
};
