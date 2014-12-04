/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Room.ts
Created: 11/22/14
Last Updated: 11/26/14
Description: This class handles the creation
and management of the room class
*******************************************/

module Objects {
    export class Room extends createjs.Bitmap {
        width: number;
        height: number;
        container: createjs.Container;

        constructor(container:createjs.Container, roomType: string) {
            super(Util.AssetManager.loader.getResult(roomType));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.container = container;
            this.container.addChild(this);
            this.y = -20;
        }
    }
}