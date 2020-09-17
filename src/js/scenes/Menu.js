import Phaser from 'phaser';
import { Buttons, Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import { Slider } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
import football from '../../assets/football.jpg'
import options_window from '../../assets/options_window.png'

const COLOR_LIGHT = 0xEF233C;

const createButton = function (scene, text) {
  const rr = new RoundRectangle(scene, 0, 0, 0, 0, 20, COLOR_LIGHT);
  return new Label(scene, {
    width: 40,
    height: 40,
    background: scene.add.existing(rr),
    text: scene.add.text(0, 0, text, {
      fontSize: 20,
      fontFamily: 'Arial'
    }),
    space: {
      left: 10,
      right: 10,
    },
    align: 'center',
  });
};


class Options extends Phaser.Scene {

  constructor (handle, parent)
  {
      super(handle);
      this.parent = parent;
  }

  create ()
  {
      // var bg = this.add.image(200, 50, 'options_window').setOrigin(0);
      var slider = new Slider(this, {
        x: 0,
        y: 0,
        width: 200,
        height: 20,
        orientation: 'x',

        track: new RoundRectangle(this, 0, 0, 0, 0, 6, 0xffffff),
        thumb: new RoundRectangle(this, 0, 0, 0, 0, 10, 0xffffff),
        
        space: {
            top: 4,
            bottom: 4
        },
        input: 'click', // 'drag'|'click'
      })
      .layout();
      slider.setInteractive({useHandCursor: true});
      slider.on('pointerover', () => { console.log('SLIDER'); });
      var optionsWindow = new RoundRectangle(this, 0,0,400,500,30,COLOR_LIGHT).setOrigin(0,0);
      var optionsText = this.add.text(0,30,'Options', {fontFamily: 'Arial', fontSize: 30, fontStyle: 'Bold'});
      optionsText.x = (optionsWindow.width - optionsText.width)/2;
      var optionsContainer = this.add.container(200, 50, [optionsWindow, slider, optionsText]);
      optionsContainer.setSize(400, 500);
      optionsContainer.setInteractive(new Phaser.Geom.Rectangle(200, 50, 400, 500), Phaser.Geom.Rectangle.Contains);
      

  }

  refresh ()
  {
      // this.cameras.main.setPosition(this.parent.x, this.parent.y);
      // this.scene.bringToTop();
  }

}


class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: 'Menu',
    });
  }

  preload() {
    this.load.image('football', football);
    this.load.image('options_window', options_window);
  }

  create() {
    let background = this.add.image(0,0, 'football');
    background.setOrigin(0,0);
    background.setScale(0.939,1.25);
    
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
      if (button.text == 'Singleplayer') {
        this.scene.stop();
        this.scene.launch('PvP')
      }

      else if (button.text == 'Options') {
        this.createWindow(Options);
      }
      
    })  

    this.add.existing(buttons);
  }

  createWindow (func)
    {
        var x = 0;
        var y = 0;

        var handle = 'window';

        var win = this.add.zone(x, y, func.WIDTH, func.HEIGHT).setInteractive().setOrigin(0);

        var demo = new func(handle, win);
        this.scene.add(handle, demo, true);
    }

  update() {

  }
}

export default Menu;
