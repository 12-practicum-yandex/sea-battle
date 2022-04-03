import { styled, Avatar } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import CSSProperties from '@mui/styled-engine-sc';

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

const MenuItem = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #1e4676;
`;

const activeStyle: CSSProperties = {
  textDecoration: 'underline',
};

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

const LogoutLink = styled(Link)`
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
  return (
    <HeaderWrapper>
      <Title>Атлантида</Title>
      <Navigation>
        {menu.map(({ label, link }) => (
          <MenuItem style={({ isActive }) => (isActive ? activeStyle : null)} to={link} key={label}>
            {label}
          </MenuItem>
        ))}
      </Navigation>
      <Profile>
        <ProfileLeft>
          <ProfileName>No Name</ProfileName>
          <LogoutLink to={'/'}>Выход</LogoutLink>
        </ProfileLeft>
        <Avatar>NO</Avatar>
      </Profile>
    </HeaderWrapper>
  );
};
