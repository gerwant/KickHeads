import Phaser from 'phaser';
import { Buttons, Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';

const COLOR_LIGHT = 0x7b5e57;

let createButton = function (scene, text) {
    return new Label(scene, {
        width: 40,
        height: 40,
        background: new RoundRectangle(scene, 0, 0, 0, 0, 20, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        space: {
            left: 10,
            right: 10,
        },
        align: 'center'
    });
}

class Menu extends Phaser.Scene {

    constructor() {
        super({ 
            key: 'Menu',
        });
    }

    preload() {
        
    }

    create() {
        let expand = true;
        let buttons = new Buttons(this, {
            x: 400, y: 300,
            width: 300,
            orientation: 'x',

            buttons: [
                createButton(this, 'A'),
                createButton(this, 'B'),
                createButton(this, 'c'),
            ],

            expand: expand
        }).layout()
    }

    update() {

    }
}

export default Menu