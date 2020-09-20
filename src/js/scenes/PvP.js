import Phaser from 'phaser';

import wizball from '../../assets/wizball.png';
import background from '../../assets/pvp_background.jpg';
import crossbar from '../../assets/crossbar.png';
import net from '../../assets/net.png';
import ball from '../../assets/ball.png';

const vel_limit = 10;

class PvP extends Phaser.Scene {
  constructor() {
    super({ key: 'PvP' });
  }
  
  preload() {
    this.load.image('wizball', wizball);
    this.load.image('background', background);
    this.load.image('crossbar', crossbar);
    this.load.image('net', net);
    this.load.image('ball',ball);
    
  }

  create() {
    this.image = this.add.sprite(400, 300, 'background');
    this.image.setScale(2, 2);

    this.player1 = this.physics.add.sprite(100, 700, 'wizball');
    this.player1.setScale(0.7, 0.7);
    this.player2 = this.physics.add.sprite(700, 700, 'wizball');
    this.player2.setScale(0.7, 0.7);
    this.ball = this.physics.add.sprite(400, 100, 'ball');
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

    this.player1.setBounce(0.05);
    //this.player1.setFriction(1, 1);
    this.player2.setBounce(0.05);
    //this.player2.setFriction(1, 1);
    this.ball.setBounce(0.65);
    //this.ball.setFriction(1, 1);

    this.player1.setMass(1);
    this.player2.setMass(1);
    this.ball.setMass(0.7);

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
  }

  update() {
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown && this.cursors.right.isDown) {
      this.player1.setVelocityX(0);
      this.player1.setAccelerationX(0);
    } 
    if (this.cursors.left.isDown) {
      this.player1.setAccelerationX(0);
      this.player1.setVelocityX(-250);
      this.player1.setAccelerationX(600);
    } 
    else if (this.cursors.right.isDown) {
      this.player1.setAccelerationX(0);
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

    /* for(let i = 0; i < 1000; i++) {
      console.log(this.player1.body.velocity.x);
    } */

    if (this.A.isDown && this.D.isDown) {
      this.player2.setVelocityX(0);
      this.player2.setAccelerationX(0);
    } 

    if (this.A.isDown) {
      this.player2.setAccelerationX(0);
      this.player2.setVelocityX(-250);
      this.player2.setAccelerationX(600);
    } 
    else if (this.D.isDown) {
      this.player2.setAccelerationX(0);
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
          this.ball.setAccelerationX(20) // TODO lower velocity.x by constant % when blocked.down and fix acceleration gained after hitting a wall
        }
      }
    } else {
        this.ball.setAccelerationX(0);
        this.ball.setVelocityX(0);
    }
  }
}

export default PvP;
