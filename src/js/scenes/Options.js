import { Slider } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';

const COLOR_LIGHT = 0xEF233C;

class Options extends Phaser.Scene {

  constructor ()
  {
      super({
        key: 'Options'
      });
  }

  create ()
  {
      var optionsWindow = new RoundRectangle(this, 0,0,400,500,30,COLOR_LIGHT).setOrigin(0,0);
      var optionsText = this.add.text(0,30,'Options', {fontFamily: 'Arial', fontSize: 30, fontStyle: 'Bold'});
      optionsText.x = (optionsWindow.width - optionsText.width)/2;
      var slider = new Slider(this, {
        x: 100,
        y: 200,
        width: 40,
        height: 20,
        orientation: 'x',

        track: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 6, 0xffffff)),
        thumb: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 10, 0x000000)),
        
        space: {
            top: 4,
            bottom: 4
        },
        input: 'drag', // 'drag'|'click'
        enable: true
      })
      .layout();
      var optionsContainer = this.add.container(200, 50, [optionsWindow, optionsText, slider]);
      optionsContainer.setSize(400, 500);
      optionsContainer.setInteractive(new Phaser.Geom.Rectangle(200, 50, 400, 500), Phaser.Geom.Rectangle.Contains);
      

  }

  refresh ()
  {
      // this.cameras.main.setPosition(this.parent.x, this.parent.y);
      // this.scene.bringToTop();
  }

}

export default Options;