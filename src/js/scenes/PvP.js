import Phaser from 'phaser';

import wizball from '../../assets/wizball.png';
import background from '../../assets/pvp_background.jpg';
import crossbar from '../../assets/crossbar.png';
import net from '../../assets/net.png';
import ball from '../../assets/ball.png';
import platform from '../../assets/platform.png';
import Pause from './Pause';
import sound_on from '../../assets/sound_on.svg';
import sound_off from '../../assets/sound_off.svg';
import english from '../../assets/english.svg';
import polish from '../../assets/polish.svg';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle';


const COLOR_LIGHT = 0xEF233C;


class PvP extends Phaser.Scene {
  constructor() {
    super({ key: 'PvP' });

    this.count = 0;
  }
  
  preload() {
    this.load.image('wizball', wizball);
    this.load.image('background', background);
    this.load.image('crossbar', crossbar);
    this.load.image('net', net);
    this.load.image('ball',ball);
    this.load.image('sound_on', sound_on);
    this.load.image('sound_off',sound_off);
    this.load.image('english',english);
    this.load.image('polish',polish);
    this.load.image('platform',platform);
  }

  create() {
    

    this.image = this.add.image(400, 300, 'background');
    this.image.setScale(2, 2);

    // this.matter.world.setBounds(0,0, 800, 600);

    this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);

    //  Add in a stack of balls

    for (var i = 0; i < 2; i++)
    {
        var ball = this.matter.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(-600, 0), 'wizball');
        ball.setCircle();
        ball.setFriction(0.005);
        ball.setBounce(1);
    }

    var menuButton = this.add.text(710, 20, 'Menu', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });

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

    menuButton.setInteractive().on('pointerdown', () => {
        this.createWindow(Pause);
        this.scene.pause();
        console.log(this.scene.key);
    });
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

    const win = this.add.zone(140, 62.5, 520, 475).setInteractive().setOrigin(0);

    const demo = new func(this.scene.key, win);

    this.input.setDraggable(win);

    this.scene.add(handle, demo, true);
  }

}

export default PvP;
