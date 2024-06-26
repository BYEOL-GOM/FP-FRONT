import styled from 'styled-components';

export const PlanetStatecontainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  height: 20px;
  span {
    font-size: 12px;
    padding: 0 5px;
    color: #eeeeee;
  }
`;

type PlanetItemProps = {
  $isSelected: boolean;
  $isUsing: boolean;
};

export const PlanetItem = styled.div<PlanetItemProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  max-height: 180px;
  box-shadow: ${(props) =>
    props.$isUsing
      ? 'inset 0 0 0 2px #e88439'
      : props.$isSelected
        ? 'inset 0 0 0 2px white'
        : 'none'};
  &:hover {
    box-shadow: inset 0 0 0 2px white;
  }
`;

export const PlanetShopContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, max-content));
  grid-gap: 16px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 20px;
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none; // IE, Edge 브라우저용 스크롤바 숨기기
`;

interface ButtonProps {
  $isUsing: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: 145px;
  height: 35px;
  min-height: 35px;
  font-size: 12px;
  left: 50%;
  color: ${({ $isUsing }) => ($isUsing ? '#eeeeee' : '2a2a2a')};
  background-color: ${({ $isUsing }) => ($isUsing ? '#e88439' : '#eeeeee')};
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #e88439;
  }
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100px;
`;

export const PlanetShopArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 150px);
`;
export const PlanetShopHeaderContainer = styled.div`
  height: 54px;
  min-height: 54px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    color: #eeeeee;
    @media (max-width: 640px) {
      font-size: 1.1rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
  button {
    display: flex;
    align-items: center;
  }
`;

export const StarCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: #eeeeee;
  }
`;
