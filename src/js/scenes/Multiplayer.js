/* import Phaser from 'phaser';

import optionsWindow from '../../assets/options_window.png';

class Options extends Phaser.Scene {
  constructor(handle, parent) {
    super({ key: 'Options' });
    this.parent = handle;
  }

  preload() {
    this.load.image('options_window', optionsWindow);
  }

  create() {
    const bg = this.add.image(200, 50, 'options_window').setOrigin(0);

    this.input.once('pointerdown', function () {
      this.scene.resume(this.parent);
      this.scene.remove();
    }, this);
  }
}

export default Options; */
import Phaser from 'phaser';
import { Buttons, Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle';
import Close from '../../assets/close.svg';
import Options from './Options';
import LocalGame from './LocalGame';

const COLOR_LIGHT = 0xEF233C;

const createButton = function (scene, text) {
    const rr = new RoundRectangle(scene, 0, 0, 0, 0, 20, 0x000000);
    return new Label(scene, {
      width: 40,
      height: 40,
      background: scene.add.existing(rr),
      text: scene.add.text(0, 0, text, {
        fontSize: 20,
        fontFamily: 'Arial',
      }),
      space: {
        left: 10,
        right: 10,
      },
      align: 'center',
    });
  };

  
class Multiplayer extends Phaser.Scene {
  constructor(parent) {
    super({
      key: 'Multiplayer',
    });

    this.parent = parent;
  }

  preload() {
    this.load.image('Close', Close);
  }

  create() {
    const close = this.add.image(450, 20, 'Close').setOrigin(0, 0);
    const optionsWindow = new RoundRectangle(this, 0, 0, 520, 475, 10, COLOR_LIGHT).setOrigin(0, 0);
    const optionsText = this.add.text(0, 27, 'Multiplayer', { fontFamily: 'Arial', fontSize: 32, fontStyle: 'Bold' });
    optionsText.x = (optionsWindow.width - optionsText.width) / 2;


    
    
    const optionsContainer = this.add.container(140, 62.5, [
      optionsWindow,
      optionsText,
      close
    ]);

    
    
    optionsContainer.setSize(520, 475);

    

    const expand = true;
    const buttons = new Buttons(this, {
      x: 400,
      y: 300,
      width: 300,
      orientation: 'y',
      space: 30,

      buttons: [
        createButton(this, 'Singleplayer'),
        createButton(this, 'Local Game'),
        createButton(this, 'Options'),
      ],

      expand,
    }).layout();
    buttons.on('button.click', (button, index, pointer, event) => {
      console.log('Clicked', button.text);
      if (button.text === 'Singleplayer') {
        this.createWindow(LocalGame);
        console.log(this.scene.key);
        this.scene.pause();
      } else if (button.text === 'Local Game') {
        // this.scene.launch('Options')
        this.createWindow(LocalGame);
        console.log(this.scene.key);
        this.scene.pause();
      } else if (button.text === 'Options') {
        // this.scene.launch('Options')
        this.createWindow(Options);
        console.log(this.scene.key);
        this.scene.pause();
      }
    });

    this.add.existing(buttons);

    close.setInteractive().on('pointerdown', () => {
      // this.scene.stop();
      this.scene.resume(this.parent);
      this.scene.remove();
    });


  }
  
  createWindow(func) {
    const handle = `window${this.count++}`;

    const win = this.add.zone(0, 0, func.WIDTH, func.HEIGHT).setInteractive().setOrigin(0);

    const demo = new func(this.scene.key, win);

    this.input.setDraggable(win);

    this.scene.add(handle, demo, true);
  }
}

export default Multiplayer;
