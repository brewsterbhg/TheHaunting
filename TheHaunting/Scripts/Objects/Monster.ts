/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Player.ts
Created: 11/26/14
Last Updated: 11/27/14
Description: This class handles the creation
and management of the monsters
*******************************************/

module Objects {
    export class Monster extends createjs.Sprite {
        container: createjs.Container;
        constructor(container: createjs.Container) {
            super(Util.AssetManager.torsoSpriteSheet);
            this.container = container;
            this.container.addChild(this);
            this.gotoAndPlay("idle");
        }
    }
}