/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Clock.ts
Created: 12/09/14
Last Updated: 12/09/14
Description: This class handles the creation
and management of the clock
*******************************************/

module Objects {
    export class Clock extends createjs.Sprite {
        container: createjs.Container;
        constructor(container: createjs.Container) {
            super(Util.AssetManager.clockSpriteSheet);
            this.container = container;
            this.container.addChild(this);
            this.play();
        }

        play() {
            this.gotoAndPlay("tick");
            this.on("animationend", this.removeThis);
        }

        removeThis(event) {
            this.dispatchEvent('timeup');
        }
    }
}