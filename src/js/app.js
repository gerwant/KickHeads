import Phaser from 'phaser';

import PvP from './scenes/PvP';
import Menu from './scenes/Menu';
import Options from './scenes/Options';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  canvas: document.getElementById('game'),
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 600 },
    },
  },
  scene: [Menu, PvP],
};

// const game =
// eslint-disable-next-line no-new
new Phaser.Game(config);
