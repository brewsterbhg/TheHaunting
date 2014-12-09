/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Player.ts
Created: 11/26/14
Last Updated: 12/04/14
Description: This class handles the creation
and management of the player
*******************************************/

module Objects {
    export class Player extends createjs.Sprite {
        container: createjs.Container;
        width: number;
        height: number;
        velocity: number;
        maxSpeed: number;
        moving: boolean;
        dir: number;
        currentFloor: number;
        constructor(container: createjs.Container) {
            super(Util.AssetManager.girlSpriteSheet);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.moving = false;
            this.velocity = 0;
            this.maxSpeed = 3;
            this.x = 50;
            this.controls();
            this.dir = 0;
            this.container = container;
            this.gotoAndPlay("idle");
            this.container.addChild(this);
        }

        controls() {
            window.onkeydown = this.keyDown;
            window.onkeyup = this.keyUp;
        }

        moveRight() {
            if (this.velocity < this.maxSpeed) {
                this.velocity += 0.5;
                this.dir++;
            }
        }

        moveLeft() {
            if (this.velocity > -this.maxSpeed) {
                this.velocity -= 0.5;
                this.dir--;
            }
        }

        killSpeed() {
            if (this.velocity < 0) {
                this.velocity += 0.1;
                if (this.velocity > -0.1) {
                    this.dir = 0;
                    this.velocity = 0;
                }
            }
            if (this.velocity > 0) {
                this.velocity -= 0.1;
                if (this.velocity < 0.1) {
                    this.dir = 0;
                    this.velocity = 0;
                }
            }
            if (this.velocity == 0) {
                this.stop();
            }
        }

        /*
        * This function fires on key down event, 
        * and runs conditional statements accordingly
        * @param event : tracks what keys have been pressed
        */
        keyDown(event) {
            keysPressed[event.keyCode] = true;
            if (Constants.MOVE_LEFT in keysPressed) {
                this.moving = true;
                player.moveLeft();
            }
            if (Constants.MOVE_RIGHT in keysPressed) {
                this.moving = true;
                player.moveRight();
            }
        }
    
        /*
        * This function fires on key up, and stops 
        * registering pressed keys
        * @param event : tracks what keys have been released
        */
        keyUp(event) {
            if (event.keyCode in keysPressed) {
                delete keysPressed[event.keyCode];
                this.moving = false;
            }
        }

        switchFloor(floor) {
            this.currentFloor = floor;
        }

        update() {
            this.x += this.velocity;
            this.y = this.currentFloor;
            if (!this.moving) {
                this.killSpeed();
            }
            if (this.dir == 1) {
                this.scaleX = 1;
                this.gotoAndPlay("walk");
            }
            if (this.dir == -1) {
                this.scaleX = -1;
                this.gotoAndPlay("walk");
            }
            if (this.velocity == 0) {
                this.gotoAndPlay("idle");
            }
        }
    }
}