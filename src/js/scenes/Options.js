/* import Phaser from 'phaser';

import optionsWindow from '../../assets/options_window.png';

class Options extends Phaser.Scene {
  constructor(handle, parent) {
    super({ key: 'Options' });
    this.parent = handle;
  }

  preload() {
    this.load.image('options_window', optionsWindow);
  }

  create() {
    const bg = this.add.image(200, 50, 'options_window').setOrigin(0);

    this.input.once('pointerdown', function () {
      this.scene.resume(this.parent);
      this.scene.remove();
    }, this);
  }
}

export default Options; */
import Phaser from 'phaser';
import { Slider } from 'phaser3-rex-plugins/templates/ui/ui-components';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle';
import Close from '../../assets/close.svg';

const COLOR_LIGHT = 0xEF233C;

class Options extends Phaser.Scene {
  constructor(parent) {
    super({
      key: 'Options',
    });

    this.parent = parent;
  }

  preload() {
    this.load.image('Close', Close);
  }

  create() {
    const close = this.add.image(450, 20, 'Close').setOrigin(0, 0);
    const optionsWindow = new RoundRectangle(this, 0, 0, 520, 475, 10, COLOR_LIGHT).setOrigin(0, 0);
    const optionsText = this.add.text(0, 27, 'Options', { fontFamily: 'Arial', fontSize: 32, fontStyle: 'Bold' });
    optionsText.x = (optionsWindow.width - optionsText.width) / 2;;

    const audioSettingsText = this.add.text(0, 0, 'Audio Settings', { fontFamily: 'Arial', fontSize: 18 });

    const masterVolumeLabel = this.add.text(0, 50, 'Master Volume', { fontFamily: 'Arial', fontSize: 14 });
    const masterVolumeValue = this.add.text(210, 30, '', { fontFamily: 'Arial', fontSize: 14 });

    const soundVolumeLabel = this.add.text(0, 100, 'Sound volume', { fontFamily: 'Arial', fontSize: 14 });
    const soundVolumeValue = this.add.text(210, 80, '', { fontFamily: 'Arial', fontSize: 14 });

    const effectsVolumeLabel = this.add.text(0, 150, 'Effects volume', { fontFamily: 'Arial', fontSize: 14 });
    const effectsVolumeValue = this.add.text(210, 130, '', { fontFamily: 'Arial', fontSize: 14 });

    const audioSettingsContainer = this.add.container(0, 100, [
      audioSettingsText,
      masterVolumeLabel,
      masterVolumeValue,
      soundVolumeLabel,
      soundVolumeValue,
      effectsVolumeLabel,
      effectsVolumeValue,
    ]);

    audioSettingsContainer.setSize(300, 200);
    audioSettingsText.x = (audioSettingsContainer.width - audioSettingsText.width) / 2;
    audioSettingsContainer.x = (optionsWindow.width - audioSettingsContainer.width) / 2;

    const optionsContainer = this.add.container(140, 62.5, [
      optionsWindow,
      optionsText,
      audioSettingsContainer,
      close,
    ]);

    optionsContainer.setSize(520, 475);
    optionsContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 520, 475), Phaser.Geom.Rectangle.Contains);


    const masterVolumeSlider = new Slider(this, {
      x: 470,
      y: 220,
      width: 150,
      height: 20,
      orientation: 'x',

      track: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 6, 0xffffff)),
      thumb: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 10, 0x000000)),
      valuechangeCallback(value) {
        masterVolumeValue.text = `${Math.round(value * 100)}%`;
      },

      space: {
        top: 4,
        bottom: 4,
      },
      input: 'drag', // 'drag'|'click'
      enable: true,
    })
      .layout();

    const soundVolumeSlider = new Slider(this, {
      x: 470,
      y: 270,
      width: 150,
      height: 20,
      orientation: 'x',

      track: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 6, 0xffffff)),
      thumb: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 10, 0x000000)),
      valuechangeCallback(value) {
        soundVolumeValue.text = `${Math.round(value * 100)}%`;
      },

      space: {
        top: 4,
        bottom: 4,
      },
      input: 'drag', // 'drag'|'click'
      enable: true,
    })
      .layout();

    const effectsVolumeSlider = new Slider(this, {
      x: 470,
      y: 320,
      width: 150,
      height: 20,
      orientation: 'x',

      track: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 6, 0xffffff)),
      thumb: this.add.existing(new RoundRectangle(this, 0, 0, 0, 0, 10, 0x000000)),
      valuechangeCallback(value) {
        effectsVolumeValue.text = `${Math.round(value * 100)}%`;
      },

      space: {
        top: 4,
        bottom: 4,
      },
      input: 'drag', // 'drag'|'click'
      enable: true,
    })
      .layout();

    close.setInteractive().on('pointerdown', () => {
      // this.scene.stop();
      this.scene.resume(this.parent);
      this.scene.remove();
    });
  }
}

export default Options;
