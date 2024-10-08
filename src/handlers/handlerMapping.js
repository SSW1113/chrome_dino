import { gameEnd, gameStart } from './game.handler.js';
import { getItemScoreHandler } from './item.handler.js';
import { moveStageHandler } from './stage.handler.js';

const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  11: moveStageHandler,
  12: getItemScoreHandler,
};

export default handlerMappings;
