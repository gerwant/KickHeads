import Phaser from 'phaser';
import { Buttons, Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';

import football from '../../assets/football.jpg'

const COLOR_LIGHT = 0xEF233C;

const createButton = function (scene, text) {
  const rr = new RoundRectangle(scene, 0, 0, 0, 0, 20, COLOR_LIGHT);
  return new Label(scene, {
    width: 40,
    height: 40,
    background: scene.add.existing(rr),
    text: scene.add.text(0, 0, text, {
      fontSize: 20,
      fontFamily: 'Arial'
    }),
    space: {
      left: 10,
      right: 10,
    },
    align: 'center',
  });
};

class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: 'Menu',
    });
  }

  preload() {

  }

  create() {
    this.load.image('football', football);
    const expand = true;
    const buttons = new Buttons(this, {
      x: 400,
      y: 300,
      width: 300,
      orientation: 'y',
      space: 25,

      buttons: [
        createButton(this, 'Singleplayer'),
        createButton(this, 'Multiplayer'),
        createButton(this, 'Options'),
      ],

      expand,
    }).layout();

    this.add.existing(buttons);
  }

  update() {

  }
}

export default Menu;
