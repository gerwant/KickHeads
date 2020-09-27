import Phaser from 'phaser';
import { Buttons, Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
import sound_on from '../../assets/sound_on.svg';
import sound_off from '../../assets/sound_off.svg';
import english from '../../assets/english.svg';
import polish from '../../assets/polish.svg';
import stadium from '../../assets/stadium.png';
import Options from './Options';
import Multiplayer from './Multiplayer';

const COLOR_LIGHT = 0xEF233C;

const createButton = function (scene, text) {
  const rr = new RoundRectangle(scene, 0, 0, 0, 0, 20, COLOR_LIGHT);
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

class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: 'Menu',
    });

    this.count = 0;
  }

  preload() {
    this.load.image('stadium', stadium);
    this.load.image('sound_on', sound_on);
    this.load.image('sound_off',sound_off);
    this.load.image('english',english);
    this.load.image('polish',polish);
  }

  create() {
    const background = this.add.image(0, 0, 'stadium');
    background.setOrigin(0, 0);
    background.setScale(1.01, 1.41);

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
      if (button.text === 'Singleplayer') {
        this.scene.stop();
        this.scene.launch('PvP');
      } else if (button.text === 'Multiplayer') {
        // this.scene.launch('Options')
        this.createWindow(Multiplayer);
        console.log(this.scene.key);
        this.scene.pause();
      } else if (button.text === 'Options') {
        // this.scene.launch('Options')
        this.createWindow(Options);
        console.log(this.scene.key);
        this.scene.pause();
      }
      /* } else if (button.text === 'Options') {
        this.scene.launch('Options');
      } */
    });

    this.add.existing(buttons);

    var sound = this.add.image(20,20,'sound_on').setOrigin(0);

    var language_1 = this.add.image(0,40,'polish').setOrigin(0);

    const languageWindow = new RoundRectangle(this, 0, 0, 32,72, 16, 0xA2A4A2, 1).setOrigin(0, 0);
    const languageContainer = this.add.container(70, 20, [
      languageWindow,
      language_1
    ]);
    languageContainer.setSize(24,24);
    languageContainer.visible = false;
    var language = this.add.image(70,20,'english').setOrigin(0);

    sound.setInteractive().on('pointerdown', () => {
      if (sound.texture.key === 'sound_on'){
        sound.setTexture('sound_off');
      } else if (sound.texture.key === 'sound_off'){
        sound.setTexture('sound_on');
      }
    });

    language.setInteractive().on('pointerdown', () => {
      if (languageContainer.visible === true){
        languageContainer.visible = false;
      } else {
        languageContainer.visible = true;
      }
      console.log(languageContainer.visible);

    });

    language_1.setInteractive().on('pointerdown', () => {
      var temp = language_1.texture.key;
      language_1.setTexture(language.texture.key);
      language.setTexture(temp);
      languageContainer.visible = false;
      console.log(languageContainer.visible);

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

export default Menu;
