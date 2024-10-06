import { sendEvent } from './Socket.js';
import { assets, assets as assetsData } from './Assets.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  currentStage = 0;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    const assets = assetsData;
    this.score += deltaTime * 0.001 * assets.stage.data[this.currentStage].scorePerSecond;

    // 점수가 다음 스테이지에 진입할 만큼 오르면 스테이지 이동
    if (Math.floor(this.score) > assets.stage.data[this.currentStage].score && this.stageChange) {
      console.log('Next Stage');
      sendEvent(11, {
        currentStage: assets.stage.data[this.currentStage].id,
        targetStage: assets.stage.data[this.currentStage + 1].id,
        currentScore: this.score,
      });
      this.currentStage++;
    }

    if (!assets.stage.data[this.currentStage + 1] && this.stageChange === true) {
      this.stageChange = false;
      console.log('Last Stage');
    }
  }

  getItem(itemId) {
    const getItem = assetsData.item.data.find((e) => e.id === itemId);
    sendEvent(12, {
      currentStage: assetsData.stage.data[this.currentStage].id,
      itemId: itemId,
      score: getItem.score,
    });
    this.score += getItem.score;
  }

  getCurrentStageId() {
    return assets.stage.data[this.currentStage].id;
  }

  reset() {
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
