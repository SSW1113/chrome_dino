// key: uuid, value: array -> stage 정보는 배열
const stages = {};

// 스테이지 초기화
export const createStage = (uuid) => {
  stages[uuid] = [];
};

export const getStage = (uuid) => {
  return stages[uuid];
};

export const setStage = (uuid, id, timestamp) => {
  return stages[uuid].push({ id, timestamp });
};

export const clearStage = (uuid) => {
  stages[uuid] = [];
};

// 유저의 현재 스테이지 정보 불러오는 함수
export const getCurrentStage = (uuid) => {
  let currentStages = getStage(uuid);
  console.log(currentStages);
  if (!currentStages.length) {
    return { status: 'fail', message: 'No stages found for user' };
  }

  // 오름차순 -> 가장 큰 스테이지 Id를 확인 (유저의 현재 스테이지)
  currentStages.sort((a, b) => a.id - b.id);
  const currentStage = currentStages[currentStages.length - 1];
  return currentStage;
};
