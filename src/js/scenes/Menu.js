import Phaser from 'phaser';
import { Buttons, Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
import football from '../../assets/football.jpg';
import options_window from '../../assets/options_window.png';

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
    this.load.image('football', football);
    this.load.image('options_window', options_window);
  }

  create() {
    let background = this.add.image(0,0, 'football');
    background.setOrigin(0,0);
    background.setScale(0.939,1.25);
    const expand = true;
    const buttons = new Buttons(this, {
      x: 400,
      y: 300,
      width: 300,
      orientation: 'y',
      space: 30,

      buttons: [
        createButton(this, 'Singleplayer'),
        createButton(this, 'Multiplayer'),
        createButton(this, 'Options'),
      ],

      expand,
    }).layout();
    buttons.on('button.click', (button, index, pointer, event) => {
      console.log('Clicked', button.text);
      if (button.text == 'Singleplayer') {
        this.scene.stop();
        this.scene.launch('PvP')
      }

      else if (button.text == 'Options') {
        this.scene.launch('Options')
      }
      
    })  

    this.add.existing(buttons);
  }

  createWindow (func)
    {
        var x = 0;
        var y = 0;

        // var handle = 'window';

        var win = this.add.zone(x, y, func.WIDTH, func.HEIGHT).setInteractive().setOrigin(0);

        // var demo = new func(handle, win);
        // this.scene.add(handle, demo, true);
        this.scene.launch('Options');
    }

  update() {

  }
}

export default Menu;
