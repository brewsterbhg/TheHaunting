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
        velocity: number;
        maxSpeed: number;
        moving: boolean;
        constructor(container: createjs.Container) {
            super(container, "temp_hero");
            this.container.addChild(this);
            this.moving = false;
            this.velocity = 0;
            this.maxSpeed = 3;
            this.controls();
        }

        controls() {
            window.onkeydown = this.keyDown;
            window.onkeyup = this.keyUp;
        }

        moveRight() {
            if (this.velocity < this.maxSpeed) {
                this.velocity += 0.5;
            }
        }

        moveLeft() {
            if (this.velocity > -this.maxSpeed) {
                this.velocity -= 0.5;
            }
        }

        killSpeed() {
            if (this.velocity < 0) {
                this.velocity += 0.1;
            }
            if (this.velocity > 0) {
                this.velocity -= 0.1;
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
                player.moveLeft();
            }
            if (Constants.MOVE_RIGHT in keysPressed) {
                player.moveRight();
            }
            this.moving = true;
        }
    
        /*
        * This function fires on key up, and stops 
        * registering pressed keys
        * @param event : tracks what keys have been released
        */
        keyUp(event) {
            if (event.keyCode in keysPressed) {
                delete keysPressed[event.keyCode];
            }
            this.moving = false;
        }

        update() {
            this.x += this.velocity;
            this.y = 300;
            if (!this.moving) {
                this.killSpeed();
            }
        }

        //y positions: every 150
    }
}