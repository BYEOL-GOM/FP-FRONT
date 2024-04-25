import { useState, useEffect } from 'react';
import styled from 'styled-components';
import rocketA from '@/rocketA.svg';
import Home from '@/home.svg?react';
import HoverHome from '@/hoverHome.svg?react';
import Locker from '@/locker.svg?react';
import HoverLocker from '@/hoverLocker.svg?react';
import Chat from '@/chat.svg?react';
import HoverChat from '@/hoverChat.svg?react';
import Setting from '@/setting.svg?react';
import HoverSetting from '@/hoverSetting.svg?react';
import { Link } from 'react-router-dom';
import { useWorryCountStore } from '../../store/worryCountStore';
import { useStateModalStore } from '../../store/stateModalStore';

function Footer({ openModal }: { openModal: () => void }) {
  const [clickedButton, setClickedButton] = useState<string>('');
  const { worryCount } = useWorryCountStore();
  const { openStateModal } = useStateModalStore();

  useEffect(() => {
    setClickedButton('home');
  }, []);

  const handleButtonClick = (buttonName: string) => {
    if (clickedButton === buttonName) return;
    setClickedButton(buttonName);
  };

  return (
    <FooterArea>
      <FooterInner>
        <Link to={'/'}>
          {clickedButton !== 'home' && (
            <Home fill="black" onClick={() => handleButtonClick('home')} />
          )}
          {clickedButton === 'home' && (
            <HoverHome fill="black" onClick={() => handleButtonClick('home')} />
          )}
        </Link>
        <Link to={'/pastcontents'}>
          {clickedButton !== 'locker' && (
            <Locker fill="black" onClick={() => handleButtonClick('locker')} />
          )}
          {clickedButton === 'locker' && (
            <HoverLocker
              fill="black"
              onClick={() => handleButtonClick('locker')}
            />
          )}
        </Link>
        <div></div>
        <Link to={'/chat'}>
          {clickedButton !== 'chat' && (
            <Chat fill="black" onClick={() => handleButtonClick('chat')} />
          )}
          {clickedButton === 'chat' && (
            <HoverChat fill="black" onClick={() => handleButtonClick('chat')} />
          )}
        </Link>
        <Link to={'/mypage'}>
          {clickedButton !== 'setting' && (
            <Setting
              fill="black"
              onClick={() => handleButtonClick('setting')}
            />
          )}
          {clickedButton === 'setting' && (
            <HoverSetting
              fill="black"
              onClick={() => handleButtonClick('setting')}
            />
          )}
        </Link>
        <Sendwrap>
          <StyledImg
            src={rocketA}
            onClick={() =>
              worryCount === 0
                ? openStateModal('보낼 수 있는 로켓이 없어요', true)
                : openModal()
            }
          />
        </Sendwrap>
      </FooterInner>
    </FooterArea>
  );
}

export default Footer;

const Sendwrap = styled.div`
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
`;
const FooterArea = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
`;
const FooterInner = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
  padding: 15px 15px;
  gap: 20px;
  background: #2f4768;
`;

const StyledImg = styled.img`
  width: 55px;
  cursor: pointer;
`;
