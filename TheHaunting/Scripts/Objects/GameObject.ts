/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: GameObject.ts
Created: 11/22/14
Last Updated: 11/26/14
Description: This class acts as a game object
superclass that object classes will extend from
*******************************************/

module Objects {
    export class GameObject extends createjs.Sprite {
        width: number;
        height: number;
        container: createjs.Container;

        constructor(container: createjs.Container, filePath: string) {
            super(Util.AssetManager.loader.getResult(filePath));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.container = container;
        }
    }
}