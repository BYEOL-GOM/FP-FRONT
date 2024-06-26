import styled, { keyframes } from 'styled-components';
import ButtonContainer from '../../../components/button/ButtonContainer';
import { useStateModalStore } from '../../../store/stateModalStore';
import { useQueryClient } from '@tanstack/react-query';
import { useStarCountStore } from '../../../store/starConuntStore';
import { usePlanetShopStore } from '../../../store/planetShopStore';
import { useBuyPlanetMutation } from '../../../hooks/mutations/useBuyPlanet';

interface BuyPlanetProps {
  setShowBuyPlanetModal: (isOpen: boolean) => void;
  planet: string;
  planetCost: number;
}

function BuyPlanetModal(props: BuyPlanetProps) {
  const queryClient = useQueryClient();

  const openStateModal = useStateModalStore((state) => state.openStateModal);
  const setAddPlanets = usePlanetShopStore((state) => state.setAddPlanets);
  const setDeleteStarCount = useStarCountStore(
    (state) => state.setDeleteStarCount,
  );
  const starCount = useStarCountStore((state) => state.starCount);
  const { mutate: buyPlanetMutate } = useBuyPlanetMutation();

  const handleBuyPlanet = async () => {
    buyPlanetMutate(props.planet, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['starCount'],
        });
        queryClient.invalidateQueries({
          queryKey: ['getPlanets'],
        });
        setAddPlanets(props.planet);
        setDeleteStarCount(props.planetCost);
        props.setShowBuyPlanetModal(false);
        openStateModal('구매가 완료되었어요!');
      },
    });
  };

  return (
    <PlanetModalArea>
      {starCount >= props.planetCost ? (
        <PlanetModalContainer>
          <NoticeContainer>
            <NoticeText>
              정말 <SpanText>구매</SpanText>하시겠습니까?
            </NoticeText>
            <SmallNoticeText>*구매하면 되돌릴 수 없어요.</SmallNoticeText>
          </NoticeContainer>
          <ButtonContainer
            buttons={['취소', '구매']}
            width={['100px']}
            backColor={['#B5B5BD', '#E88439']}
            color={['#black', '#white']}
            onClickHandlers={[
              () => props.setShowBuyPlanetModal(false),
              handleBuyPlanet,
            ]}
          />
        </PlanetModalContainer>
      ) : (
        <PlanetModalContainer>
          <NoticeContainer>
            <NoticeText>별이 부족합니다.</NoticeText>
            <SmallNoticeText>*더 많은 답례를 받아보세요!</SmallNoticeText>
          </NoticeContainer>
          <ButtonContainer
            buttons={['확인']}
            width={['100px']}
            backColor={['#E88439']}
            color={['#white']}
            onClickHandlers={[() => props.setShowBuyPlanetModal(false)]}
          />
        </PlanetModalContainer>
      )}
    </PlanetModalArea>
  );
}

export default BuyPlanetModal;

const modalAnimation = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  40% {
    transform: scale(1.05);
    opacity: 1;
  }
  70% {
    transform: scale(0.95);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const PlanetModalArea = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const PlanetModalContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 260px;
  height: 155px;
  border-radius: 15px;
  background-color: #eeeeee;
  animation: ${modalAnimation} 0.3s ease-out forwards;
`;
const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 40px;
`;

const NoticeText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: black;
`;

const SpanText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #e88439;
`;

const SmallNoticeText = styled.div`
  font-size: 12px;
  color: black;
  margin-top: 5px;
`;
