import Phaser from 'phaser';

import wizball from '../../assets/wizball.png';
import background from '../../assets/pvp_background.jpg';
import crossbar from '../../assets/crossbar.png';
import net from '../../assets/net.png';
import ball from '../../assets/ball.png';
import Pause from './Pause';
import sound_on from '../../assets/sound_on.svg';
import sound_off from '../../assets/sound_off.svg';
import english from '../../assets/english.svg';
import polish from '../../assets/polish.svg';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle';

const vel_limit = 20;
let i = 0;

const COLOR_LIGHT = 0xEF233C;


class PvP_backup extends Phaser.Scene {
  constructor() {
    super({ key: 'PvP_backup' });

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
  }

  create() {
    

    this.image = this.add.sprite(400, 300, 'background');
    this.image.setScale(2, 2);

    this.player1 = this.physics.add.sprite(100, 700, 'wizball');
    this.player1.setScale(0.7, 0.7);
    this.player2 = this.physics.add.sprite(700, 700, 'wizball');
    this.player2.setScale(0.7, 0.7);
    this.ball = this.physics.add.sprite(400, 200, 'ball');
    this.ball.setScale(0.06, 0.06)

    this.player1.setCircle(46);
    this.player2.setCircle(46);
    this.ball.setCircle(335);
    this.crossbars = this.physics.add.staticGroup();

    this.crossbars.create(50, 390, 'crossbar');
    this.crossbars.create(750, 390, 'crossbar');

    this.crossbars.setVisible(false);

    this.player1.setCollideWorldBounds(true);
    this.player2.setCollideWorldBounds(true);
    this.ball.setCollideWorldBounds(true);

    //this.ball.body.allowRotation = true;

    this.player1.setBounce(0.05);
    //this.player1.setFrictionX(1);
    this.player2.setBounce(0.05);
    //this.player2.setFrictionX(1);
    this.ball.setBounce(0.65);
    //this.ball.setFrictionX(1);

    this.player1.setMass(1);
    this.player2.setMass(1);
    this.ball.setMass(0.7);

    this.ball.setMaxVelocity(800);

    this.physics.add.collider(this.player1, this.player2);
    this.physics.add.collider(this.ball, this.player2);
    this.physics.add.collider(this.ball, this.player1);
    this.physics.add.collider(this.crossbars, this.ball);
    this.physics.add.collider(this.crossbars, this.player1);
    this.physics.add.collider(this.crossbars, this.player2);

    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    
    this.net1 = this.add.sprite(755, 495, 'net');
    this.net2 = this.add.sprite(45, 495, 'net');
    this.net1.setScale(0.3, 0.3);
    this.net2.setScale(-0.3, 0.3);


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

  update() {
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown && this.cursors.right.isDown) {
      this.player1.setVelocityX(0);
      this.player1.setAccelerationX(0);
    } 
    else if (this.cursors.left.isDown) {
      this.player1.setVelocityX(-250);
      this.player1.setAccelerationX(600);
    } 
    else if (this.cursors.right.isDown) {
      this.player1.setVelocityX(250);
      this.player1.setAccelerationX(-600);        
    }
    
    if (Math.abs(this.player1.body.velocity.x) < vel_limit) {
      this.player1.setAccelerationX(0);
      this.player1.setVelocityX(0);
    }
    
    if (this.cursors.up.isDown && this.player1.body.blocked.down) {
      this.player1.setVelocityY(-350);
    } 


    // Debug
    /* if(i<10000) {
      console.log(this.player1.body.velocity.x, 'player');
      //console.log(this.ball.body.velocity.x);
      i++;
    } */ 


    if (this.A.isDown && this.D.isDown) {
      this.player2.setVelocityX(0);
      this.player2.setAccelerationX(0);
    } 
    else if (this.A.isDown) {
      this.player2.setVelocityX(-250);
      this.player2.setAccelerationX(600);
    } 
    else if (this.D.isDown) {
      this.player2.setVelocityX(250);
      this.player2.setAccelerationX(-600);
    } 

    if (Math.abs(this.player2.body.velocity.x) < vel_limit) {
      this.player2.setAccelerationX(0);
      this.player2.setVelocityX(0);
    }

    if (this.W.isDown && this.player2.body.blocked.down) 
    {
      this.player2.setVelocityY(-350);
    }


    // Ball movement
    if(Math.abs(this.ball.body.velocity.x) > vel_limit) {
      if(this.ball.body.velocity.x > 0) {
        if(this.ball.body.blocked.down) {
          this.ball.setAccelerationX(-100);
        } else {
          this.ball.setAccelerationX(-20)
        }
      }
      else if(this.ball.body.velocity.x < 0) {
        if(this.ball.body.blocked.down) {
          this.ball.setAccelerationX(100);
        } else {
          this.ball.setAccelerationX(20);
        }
      }
    } else {
        this.ball.setAccelerationX(0);
        this.ball.setVelocityX(0);
    }
  }
}

export default PvP_backup;
