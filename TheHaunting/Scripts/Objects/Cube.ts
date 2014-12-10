/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Cube.ts
Created: 12/10/14
Last Updated: 12/10/14
Description: This class handles the creation
and management of the cube
*******************************************/

module Objects {
    export class Cube extends createjs.Sprite {
        container: createjs.Container;
        constructor(container: createjs.Container) {
            super(Util.AssetManager.cubeSpriteSheet);
            this.container = container;
            this.container.addChild(this);
            this.gotoAndPlay("idle");
        }
    }
}