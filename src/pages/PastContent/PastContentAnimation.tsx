import styled, { keyframes } from 'styled-components';
import image30 from '/assets/image30.svg';
interface AnimationProps {
  $sec: number;
  $startAngle: number;
}

function PastContentAnimation() {
  return (
    <>
      <TestDiv>
        <Animation $sec={15} $startAngle={0}>
          <img src={image30} />
        </Animation>
        <Animation $sec={26} $startAngle={120}>
          <img src={image30} />
        </Animation>
        <Animation $sec={37} $startAngle={240}>
          <img src={image30} />
        </Animation>
      </TestDiv>
    </>
  );
}

export default PastContentAnimation;

const TestDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 300px;
  max-height: 300px;
`;

const animation = ($startAngle: number) => keyframes`
  0% {
    transform: rotate(${$startAngle}deg) translateX(20vw) rotate(180deg);
  }
  100% {
    transform: rotate(${$startAngle + 360}deg) translateX(20vw) rotate(180deg);
  }
`;

const Animation = styled.div<AnimationProps>`
  width: 100%;
  height: 100%;
  animation: ${(props) => animation(props.$startAngle)}
    ${(props) => props.$sec}s infinite linear;
  &:hover {
    animation-play-state: paused;
  }
`;
