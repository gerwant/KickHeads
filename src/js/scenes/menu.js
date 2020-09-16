import Phaser from 'phaser';

import wizball from '../../assets/wizball.png';

class Menu extends Phaser.Scene {
    constructor() {
        super({key: "Menu"});
    }

    preload() {
        this.load.image('wizball', wizball);
    }

    create() {

        this.ball;

        this.player1 = this.physics.add.sprite(100, 700, 'wizball');
        this.player2 = this.physics.add.sprite(700, 700, 'wizball');
        this.ball = this.physics.add.sprite(300, 0);

        this.player1.setCircle(46);
        this.player2.setCircle(46);
        this.ball.setCircle(20);

        this.player1.setCollideWorldBounds(true);
        this.player2.setCollideWorldBounds(true);
        this.ball.setCollideWorldBounds(true);

        this.player1.setBounce(0);
        this.player2.setBounce(0);
        this.ball.setBounce(0.8);

        this.player1.setMass(1)
        this.player2.setMass(1)
        this.ball.setMass(0.8)

        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.ball, this.player2);
        this.physics.add.collider(this.ball, this.player1);

        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update() {
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.cursors.left.isDown)
        {
            this.player1.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown)
        {
            this.player1.setVelocityX(300);
        }
        else
        {
            this.player1.setVelocityX(0);
        }
        if (this.cursors.up.isDown && this.player1.body.blocked.down)
        {
            this.player1.setVelocityY(-300);
        }


        if (this.A.isDown)
        {
            this.player2.setVelocityX(-300);
        }
        else if (this.D.isDown)
        {
            this.player2.setVelocityX(300);
        }
        else
        {
            this.player2.setVelocityX(0);
        }
        if (this.W.isDown && this.player2.body.blocked.down)
        {
            this.player2.setVelocityY(-300);
        }
    }
}

export default Menu