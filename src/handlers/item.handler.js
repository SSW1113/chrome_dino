import { getGameAssets } from '../init/assets.js';
import { createItem, getItem, setItem } from '../models/item.model.js';
import { getCurrentStage } from '../models/stage.model.js';

// 아이템 점수 획득 핸들러
export const getItemScoreHandler = (uuid, payload) => {
  const currentStage = getCurrentStage(uuid);
  const assets = getGameAssets();

  // 아이템 존재 여부 확인
  const item = assets.item.data.find((e) => e.id === payload.itemId);
  if (!item) {
    return { status: 'fail', message: 'Not found for Items.' };
  }

  // 현재 스테이지에서 획득 가능한 아이템인지 확인
  const item_unlock = assets.item_unlock.data.find((e) => e.stage_id === currentStage.id);
  if (!item_unlock.item_id.includes(item.id)) {
    console.log('item_unlock Id: ');
    return { status: 'fail', message: `Stage and Item mismatch. ` };
  }

  const serverTime = Date.now();
  createItem(uuid);
  setItem(uuid, item.id, item.score, currentStage.id, serverTime);

  return { status: 'success', message: `Get Item ${item.id} (Score +${item.score})` };
};
