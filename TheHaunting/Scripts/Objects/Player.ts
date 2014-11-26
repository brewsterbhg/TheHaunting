/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Player.ts
Created: 11/26/14
Last Updated: 11/26/14
Description: This class handles the creation
and management of the player
*******************************************/

module Objects {
    export class Player extends GameObject {
        constructor(container: createjs.Container) {
            super(container, "temp_hero");
            this.container.addChild(this);
        }
    }
}