const items = {};

export const createItem = (uuid) => {
  items[uuid] = [];
};

export const getItem = (uuid) => {
  return items[uuid];
};

export const setItem = (uuid, id, score) => {
  return items[uuid].push({ id, score });
};

export const clearItem = (uuid) => {
  items[uuid] = [];
};
