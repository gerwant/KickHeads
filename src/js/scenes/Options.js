import { Slider } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
import Close from '../../assets/close.png';

const COLOR_LIGHT = 0xEF233C;

class Options extends Phaser.Scene {

  

  constructor ()
  {
      super({
        key: 'Options'
      });
  }
  preload ()
  {
    this.load.image('Close', Close);
  }
  create ()
  {
    
    var close = this.add.image(350,20, 'Close').setOrigin(0,0);
    var optionsWindow = new RoundRectangle(this, 0,0,400,500,30,COLOR_LIGHT).setOrigin(0,0);
    var optionsText = this.add.text(0,30,'Options', {fontFamily: 'Arial', fontSize: 30, fontStyle: 'Bold'});
    optionsText.x = (optionsWindow.width - optionsText.width)/2;

    var audioSettingsText = this.add.text(0, 0, 'Audio Settings', {fontFamily: 'Arial', fontSize: 18});

    var masterVolumeLabel= this.add.text(0, 50, 'Master Volume', {fontFamily: 'Arial', fontSize: 14});
    var masterVolumeValue = this.add.text(210, 30, '', {fontFamily: 'Arial', fontSize: 14});

    var soundVolumeLabel = this.add.text(0, 100, 'Sound volume', {fontFamily: 'Arial', fontSize: 14});
    var soundVolumeValue = this.add.text(210, 80, '', {fontFamily: 'Arial', fontSize: 14});

    var effectsVolumeLabel= this.add.text(0, 150, 'Effects volume', {fontFamily: 'Arial', fontSize: 14});
    var effectsVolumeValue = this.add.text(210, 130, '', {fontFamily: 'Arial', fontSize: 14});

    var audioSettingsContainer = this.add.container(0, 100, [
      audioSettingsText, 
      masterVolumeLabel, 
      masterVolumeValue,
      soundVolumeLabel,
      soundVolumeValue,
      effectsVolumeLabel,
      effectsVolumeValue
    ]);

    audioSettingsContainer.setSize(300, 200);
    audioSettingsText.x = (audioSettingsContainer.width - audioSettingsText.width)/2;
    audioSettingsContainer.x = (optionsWindow.width - audioSettingsContainer.width)/2;

    var optionsContainer = this.add.container(200, 50, [
      optionsWindow, 
      optionsText, 
      audioSettingsContainer,
      close
    ]);

    optionsContainer.setSize(400, 500);
    optionsContainer.setInteractive(new Phaser.Geom.Rectangle(200, 50, 400, 500), Phaser.Geom.Rectangle.Contains);
    console.log(masterVolumeLabel.y);

    var masterVolumeSlider = new Slider(this, {
      x: 470,
      y: 210,
      width: 150,
      height: 20,
      orientation: 'x',

      track: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 6, 0xffffff)),
      thumb: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 10, 0x000000)),
      valuechangeCallback: function (value) {
        masterVolumeValue.text = Math.round(value * 100) + '%';
      },
      
      space: {
          top: 4,
          bottom: 4
      },
      input: 'drag', // 'drag'|'click'
      enable: true
    })
    .layout();

    var soundVolumeSlider = new Slider(this, {
      x: 470,
      y: 260,
      width: 150,
      height: 20,
      orientation: 'x',

      track: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 6, 0xffffff)),
      thumb: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 10, 0x000000)),
      valuechangeCallback: function (value) {
        soundVolumeValue.text = Math.round(value * 100) + '%';
      },
      
      space: {
          top: 4,
          bottom: 4
      },
      input: 'drag', // 'drag'|'click'
      enable: true
    })
    .layout();

    var effectsVolumeSlider = new Slider(this, {
      x: 470,
      y: 310,
      width: 150,
      height: 20,
      orientation: 'x',

      track: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 6, 0xffffff)),
      thumb: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 10, 0x000000)),
      valuechangeCallback: function (value) {
        effectsVolumeValue.text = Math.round(value * 100) + '%';
      },
      
      space: {
          top: 4,
          bottom: 4
      },
      input: 'drag', // 'drag'|'click'
      enable: true
    })
    .layout();

      
    close.setInteractive().on('pointerdown', () => {
      this.scene.stop();
    });

      
  }

  

  refresh ()
  {
      // this.cameras.main.setPosition(this.parent.x, this.parent.y);
      // this.scene.bringToTop();
  }

}

export default Options;