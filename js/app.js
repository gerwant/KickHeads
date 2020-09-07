var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    canvas: document.getElementById("game"),
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 500 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var cursors;
var player1;
var player2;
var ball;

function preload ()
{
    this.load.image('wizball', '../assets/wizball.png');
}

function create ()
{
    player1 = this.physics.add.sprite(100, 700, 'wizball');
    player2 = this.physics.add.sprite(700, 700, 'wizball');
    ball = this.physics.add.sprite(300, 0);

    player1.setCircle(46);
    player2.setCircle(46);
    ball.setCircle(20);

    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    ball.setCollideWorldBounds(true);

    player1.setBounce(0);
    player2.setBounce(0);
    ball.setBounce(0.8);

    player1.setMass(1)
    player2.setMass(1)
    ball.setMass(0.8)

 

    this.physics.add.collider(player1, player2);
    this.physics.add.collider(ball, player2);
    this.physics.add.collider(ball, player1);

    cursors = this.input.keyboard.createCursorKeys();
   
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    
}

function update(){
    if (cursors.left.isDown)
    {
        player1.setVelocityX(-300);
    }
    else if (cursors.right.isDown)
    {
        player1.setVelocityX(300);
    }
    else
    {
        player1.setVelocityX(0);
    }
    if (cursors.up.isDown && player1.body.blocked.down)
    {
        player1.setVelocityY(-300);
    }


    if (this.A.isDown)
    {
        player2.setVelocityX(-300);
    }
    else if (this.D.isDown)
    {
        player2.setVelocityX(300);
    }
    else
    {
        player2.setVelocityX(0);
    }
    if (this.W.isDown && player2.body.blocked.down)
    {
        player2.setVelocityY(-300);
    }
}