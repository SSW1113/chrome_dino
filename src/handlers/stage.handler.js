// 유저는 스테이지를 하나씩 올라갈 수 있다. (1 -> 2, 2 -> 3 ...)
// 유저는 일정 점수가 되면 다음 스테이지로 이동한다. (0점 -> 1스테이지, 100점 -> 2스테이지 ...)

import { getGameAssets } from '../init/assets.js';
import { setStage } from '../models/stage.model.js';

export const moveStageHandler = (userId, payload) => {
  // 유저의 현재 스테이지 정보
  let currentStages = getStage(userId);
  if (!currentStages.length) {
    return { status: 'fail', message: 'No stages found for user' };
  }

  // 오름차순 -> 가장 큰 스테이지 Id를 확인 (유저의 현재 스테이지)
  currentStages.sort((a, b) => a.id - b.id);
  const currentStage = currentStages[currentStages.length - 1];

  // 클라이언트 vs 서버 비교
  if (currentStage.id !== payload.currentStage) {
    return { status: 'fail', message: 'Current Stage mismatch' };
  }

  // 점수 검증
  // 5 -> 임의로 정한 오차범위
  const serverTime = Date.now(); // 현재 타임스탬프
  const elapsedTime = (serverTime - currentStage.timestamp) / 1000;

  // 1 스테이지 -> 2 스테이지
  if (elapsedTime < 10 || elapsedTime > 10.5) {
    return { status: 'fail', message: 'Invalid elapsed time' };
  }

  // targetStage에 대한 검증 <- 게임 에셋에 존재하는가?
  const { stages } = getGameAssets();
  if (!stages.data.some((stage) => stage.id === payload.targetStage)) {
    // some -> 조건 중 하나라도 맞으면 true 반환
    return { status: 'fail', message: 'Target stage not found' };
  }

  setStage(userId, payload.targetStage, serverTime);
  return { status: 'success' };
};
