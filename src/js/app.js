import Phaser from 'phaser';

import PvP from './scenes/PvP';
import PvP_backup from './scenes/PvP_backup';
import Menu from './scenes/Menu';
import Options from './scenes/Options';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  canvas: document.getElementById('game'),
  // physics: {
  //   default: 'arcade',
  //   arcade: {
  //     debug: true,
  //     gravity: { y: 600 },
  //   },
  // },
  physics: {
    default: 'matter',
    matter: {
        debug: true,
        // gravity: {
        //     y: 0.1
        // }
    }
  },
  scene: [Menu, PvP, PvP_backup],
};

// const game =
// eslint-disable-next-line no-new
var game = new Phaser.Game(config);
