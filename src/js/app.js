import Phaser from "phaser";

import Menu from './scenes/menu';

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
    scene: [Menu] 
};

var game = new Phaser.Game(config);
