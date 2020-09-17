import Phaser from 'phaser';

import wizball from '../../assets/wizball.png';
import background from '../../assets/pvp_background.jpg';
import crossbar from '../../assets/crossbar.png';
import net from '../../assets/net.png';


class PvP extends Phaser.Scene {
  constructor() {
    super({ key: 'PvP' });
  }

  preload() {
    this.load.image('wizball', wizball);
    this.load.image('background', background);
    this.load.image('crossbar', crossbar);
    this.load.image('net', net);
  }

  create() {
    
    this.image = this.add.sprite(400, 300, 'background');
    this.image.setScale(2, 2);
    
    this.player1 = this.physics.add.sprite(100, 700, 'wizball');
    this.player2 = this.physics.add.sprite(700, 700, 'wizball');
    this.ball = this.physics.add.sprite(300, 0);

    this.player1.setCircle(46);
    this.player2.setCircle(46);
    this.ball.setCircle(20);
    this.crossbars = this.physics.add.staticGroup();

    this.crossbars.create(50, 390, 'crossbar');
    this.crossbars.create(750, 390, 'crossbar');


    this.crossbars.setVisible(false)

    this.player1.setCollideWorldBounds(true);
    this.player2.setCollideWorldBounds(true);
    this.ball.setCollideWorldBounds(true);

    this.player1.setBounce(0);
    this.player2.setBounce(0);
    this.ball.setBounce(0.8);

    this.player1.setMass(1);
    this.player2.setMass(1);
    this.ball.setMass(0.8);

    this.physics.add.collider(this.player1, this.player2);
    this.physics.add.collider(this.ball, this.player2);
    this.physics.add.collider(this.ball, this.player1);
    this.physics.add.collider(this.crossbars, this.ball);
    this.physics.add.collider(this.crossbars, this.player1);
    this.physics.add.collider(this.crossbars, this.player2);

    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.net1 = this.add.sprite(755, 495,'net')
    this.net2 = this.add.sprite(45, 495,'net')
    this.net1.setScale(0.3, 0.3)
    this.net2.setScale(-0.3, 0.3)
  }


  update() {
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown) {
      this.player1.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player1.setVelocityX(300);
    } else {
      this.player1.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.player1.body.blocked.down) {
      this.player1.setVelocityY(-300);
    }

    if (this.A.isDown) {
      this.player2.setVelocityX(-300);
    } else if (this.D.isDown) {
      this.player2.setVelocityX(300);
    } else {
      this.player2.setVelocityX(0);
    }
    if (this.W.isDown && this.player2.body.blocked.down) {
      this.player2.setVelocityY(-300);
    }
  }
}

export default PvP;
