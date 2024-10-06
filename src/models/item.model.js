const items = {};

export const createItem = (uuid) => {
  items[uuid] = [];
};

export const getItem = (uuid) => {
  return items[uuid];
};

export const setItem = (uuid, id, score, earnedStageId, timestamp) => {
  return items[uuid].push({ id, score, earnedStageId, timestamp });
};

export const clearItem = (uuid) => {
  items[uuid] = [];
};
