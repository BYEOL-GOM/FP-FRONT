import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useFetchNickName } from '../../hooks/queries/useFetchNickName';
import chevronRight from '/assets/images/chevronRight.svg';

function SettingPage() {
  const navigate = useNavigate();
  const { setLogoutState } = useAuthStore();
  const { isLoggedIn } = useAuthStore();
  const { data: NickName, isError, error } = useFetchNickName();
  const [isDarkMode, setIsDarkMode] = useState(false);

  if (isError) {
    console.error('닉네임 정보를 불러오는 데 실패했습니다.', error);
  }

  const handleLogout = () => {
    localStorage.removeItem('access_Token');
    localStorage.removeItem('refresh_Token');
    setLogoutState();
    navigate('/login');
  };

  const handleNicknameChange = () => {
    navigate('/changenickname');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode ? 'true' : 'false');
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(storedDarkMode);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <MyPageHeader>
        <p>설정</p>
      </MyPageHeader>
      <SettingContainer>
        <Content>
          <Wrapper>
            <SubTitle>닉네임</SubTitle>
            <ProfileSection>
              <ProfilePic />
              <NicknameAndChange>
                <Nickname>{NickName?.nickname || '익명'}</Nickname>
                <ChangeArrow onClick={handleNicknameChange} />
              </NicknameAndChange>
            </ProfileSection>
            <SubTitle>테마</SubTitle>
            <Theme>
              <DarkModeTitle>다크모드</DarkModeTitle>
              <DarkModeSwitch
                onClick={toggleDarkMode}
                className={isDarkMode ? 'active' : ''}
              >
                <ToggleSwitch $isDark={isDarkMode} />{' '}
              </DarkModeSwitch>
            </Theme>
          </Wrapper>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </Content>
      </SettingContainer>
    </>
  );
}

export default SettingPage;

const Wrapper = styled.div`
  width: 100%;
`;

const SettingContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  box-sizing: border-box;
`;

const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const ProfilePic = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #121212;
  border: 1px solid white;
  margin-right: 15px;
`;

const NicknameAndChange = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled.p`
  font-size: 16px;
  color: white;
`;

const ChangeArrow = styled.div`
  width: 10px;
  height: 20px;
  padding-right: 20px;
  cursor: pointer;
  background-image: url(${chevronRight});
  background-size: cover;
  background-position: center;
`;

const MyPageHeader = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 16px;
    font-weight: 300;
    @media (max-width: 640px) {
      font-size: 1.1rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Theme = styled.div`
  padding-top: 10px;
  justify-content: space-between;
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 50px;
`;

const DarkModeTitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #eee;
`;

const SubTitle = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: #eee;
  opacity: 67%;
`;

const DarkModeSwitch = styled.div`
  border-radius: 10px;
  margin-top: 10px;

  p {
    color: white;
    font-size: 18px;
    font-weight: 500;
  }
`;

const ToggleSwitch = styled.div<{ $isDark: boolean }>`
  width: 32px;
  height: 17px;
  background-color: #ccc;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

  ${(props) =>
    props.$isDark &&
    css`
      background-color: #abcd53;
      box-shadow: 0 0 5px 0 #abcd53;
    `}

  &:after {
    content: '';
    position: absolute;
    top: 1px;
    left: 2px;
    width: 15px;
    height: 15px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s;

    ${(props) =>
      props.$isDark &&
      css`
        left: 16px;
      `}
  }
`;

const LogoutButton = styled.button`
  width: fit-content;
  padding-bottom: 30px;
  font-size: 12px;
  color: #eee;
  opacity: 67%;
  cursor: pointer;
  border: none;
`;
