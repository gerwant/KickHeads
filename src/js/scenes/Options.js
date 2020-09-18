import Phaser from 'phaser';

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

export default Options;
