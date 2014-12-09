/// <reference path="../util/constants.ts" />

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
        playerX: number;
        playerFloor: number;
        monsterFloor: number;
        speed: number = 3;
        ladderToUse: number;
        playerHiding: boolean;
        pickRandom: boolean = false;
        dir: number = -1;
        attacking: boolean = false;
        constructor(container: createjs.Container) {
            super(Util.AssetManager.torsoSpriteSheet);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.container = container;
            this.container.addChild(this);
            this.monsterFloor = Constants.FLOOR_ONE;
            this.gotoAndPlay("idle");
        }

        logic() {
            //If the player is on a different floor
            if (this.monsterFloor != this.playerFloor) {
                //If monster is under player
                if (this.monsterFloor > this.playerFloor) {
                    //If floor one, needs to go up
                    if (this.monsterFloor == Constants.FLOOR_ONE) {
                        if (this.x > Constants.STAIRS_ONE - 3 && this.x < Constants.STAIRS_ONE + 3) {
                            this.monsterFloor = Constants.FLOOR_TWO;
                        }
                        else if (this.x < Constants.STAIRS_ONE) {
                            this.x += this.speed;
                            this.scaleX = -1;
                        }
                        else if (this.x > Constants.STAIRS_ONE) {
                            this.x -= this.speed;
                            this.scaleX = 1;
                        }
                    }
                    //If floor two, needs to go up
                    if (this.monsterFloor == Constants.FLOOR_TWO) {
                        if (this.x > Constants.STAIRS_TWO - 3 && this.x < Constants.STAIRS_TWO + 3) {
                            //Set random value of which ladder to use
                            this.ladderToUse = Math.round(Math.random());
                            this.monsterFloor = Constants.FLOOR_THREE;
                        }
                        else if (this.x < Constants.STAIRS_TWO) {
                            this.x += this.speed;
                            this.scaleX = -1;
                        }
                        else if (this.x > Constants.STAIRS_TWO) {
                            this.x -= this.speed;
                            this.scaleX = 1;
                        }
                    }
                    //If floor three, needs to go up
                    if (this.monsterFloor == Constants.FLOOR_THREE) {
                        if ((this.x > Constants.LADDER_ONE - 100 && this.x < Constants.LADDER_ONE + 3) || (this.x > Constants.LADDER_TWO - 3
                            && this.x < Constants.LADDER_TWO + 100)) {
                            this.ladderToUse = Math.round(Math.random());
                            this.monsterFloor = Constants.FLOOR_FOUR;
                        }
                        else if (this.ladderToUse == 1 && this.x < Constants.LADDER_TWO) {
                            this.x += this.speed;
                            this.scaleX = -1;
                        }
                        else if (this.ladderToUse == 0 && this.x > Constants.LADDER_ONE) {
                            this.x -= this.speed;
                            this.scaleX = 1;
                        }
                    }
                }
                //If monster is above player
                if (this.monsterFloor < this.playerFloor) {
                    //If floor four, needs to go down
                    if (this.monsterFloor == Constants.FLOOR_FOUR) {
                        if ((this.x > Constants.LADDER_ONE - 100 && this.x < Constants.LADDER_ONE + 3) || (this.x > Constants.LADDER_TWO - 3
                            && this.x < Constants.LADDER_TWO + 100)) {
                            this.ladderToUse = Math.round(Math.random());
                            this.monsterFloor = Constants.FLOOR_THREE;
                        }
                        else if (this.ladderToUse == 1 && this.x < Constants.LADDER_TWO) {
                            this.x += this.speed;
                            this.scaleX = -1;
                        }
                        else if (this.ladderToUse == 0 && this.x > Constants.LADDER_ONE) {
                            this.x -= this.speed;
                            this.scaleX = 1;
                        }
                    }
                    //If floor three, needs to go down
                    if (this.monsterFloor == Constants.FLOOR_THREE) {
                        if (this.x > Constants.STAIRS_TWO_TOP - 3 && this.x < Constants.STAIRS_TWO_TOP + 3) {
                            this.monsterFloor = Constants.FLOOR_TWO;
                            this.x = Constants.STAIRS_TWO;
                        }
                        else if (this.x < Constants.STAIRS_TWO_TOP) {
                            this.x += this.speed;
                            this.scaleX = -1;
                        }
                        else if (this.x > Constants.STAIRS_TWO_TOP) {
                            this.x -= this.speed;
                            this.scaleX = 1;
                        }
                    }
                    //If floor two, needs to go down
                    if (this.monsterFloor == Constants.FLOOR_TWO) {
                        if (this.x > Constants.STAIRS_ONE_TOP - 3 && this.x < Constants.STAIRS_ONE_TOP + 3) {
                            this.monsterFloor = Constants.FLOOR_ONE;
                            this.x = Constants.STAIRS_ONE;
                        }
                        else if (this.x < Constants.STAIRS_ONE_TOP) {
                            this.x += this.speed;
                            this.scaleX = -1;
                        }
                        else if (this.x > Constants.STAIRS_ONE_TOP) {
                            this.x -= this.speed;
                            this.scaleX = 1;
                        }
                    }
                }
            }
            if (this.monsterFloor == this.playerFloor && !playerHiding) {
                //If the player is on the same floor
                if (this.x < this.playerX) {
                    this.x += this.speed;
                    this.scaleX = -1;
                }
                if (this.x > this.playerX) {
                    this.x -= this.speed;
                    this.scaleX = 1;
                }
            }
        }

        randomizeFloor() {
            //If the player is hiding
            if (playerHiding) {
                if (!this.pickRandom) {
                    this.playerFloor = Math.floor(Math.random() * 4) + 1;
                    switch (this.playerFloor) {
                        case 1:
                            this.playerFloor = Constants.FLOOR_ONE;
                            break;
                        case 2:
                            this.playerFloor = Constants.FLOOR_TWO;
                            break;
                        case 3:
                            this.playerFloor = Constants.FLOOR_THREE;
                            break;
                        case 4:
                            this.playerFloor = Constants.FLOOR_FOUR;
                            break;
                    }
                    this.pickRandom = true;
                }
                if (this.monsterFloor == this.playerFloor) {
                    if (this.dir == -1) {
                        this.dir = Math.round(Math.random());
                    }
                    switch (this.dir) {
                        case 0:
                            if (this.x >= Constants.LEFT_WALL) {
                                this.x -= this.speed;
                                this.scaleX = 1;
                            }
                            else if (this.x < Constants.LEFT_WALL + 5) {
                                this.dir = -1;
                                this.pickRandom = false;
                            }
                            break;
                        case 1:
                            if (this.x <= Constants.RIGHT_WALL) {
                                this.x += this.speed;
                                this.scaleX = -1;
                            }
                            else if (this.x > Constants.RIGHT_WALL) {
                                this.dir = -1;
                                this.pickRandom = false;
                            }
                    }
                }
            }
        }

        attack() {
            if (!this.attacking) {
                this.attacking = true;
                this.gotoAndPlay("attack");
            }
        }

        update(playerX, playerFloor, playerHiding) {
            this.playerX = playerX;
            this.playerHiding = playerHiding;
            if (!playerHiding) {
                this.playerFloor = playerFloor;
            }
            else {
                this.randomizeFloor();
            }
            this.y = this.monsterFloor;
            this.logic();
        }
    }
}