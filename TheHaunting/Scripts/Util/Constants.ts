/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Constants.ts
Created: 11/19/14
Last Updated: 12/04/14
Description: The constants used for the game
*******************************************/
module Constants {
    //Canvas size constants
    export var STAGE_WIDTH: number = 1000;
    export var STAGE_HEIGHT: number = 500;
    export var SCALE: number = 30;
    //Game state constants
    export var MENU_STATE: number = 1;
    export var PLAY_STATE: number = 2;
    export var END_STATE: number = 3;
    //Control constants
    export var MOVE_LEFT: number = 37;
    export var MOVE_RIGHT: number = 39;
    export var USE: number = 65;
    //Game constants
    export var LEFT_WALL: number;
    export var RIGHT_WALL: number;
    export var FLOOR_ONE: number = 600;
    export var FLOOR_TWO: number = 450;
    export var FLOOR_THREE: number = 300;
    export var FLOOR_FOUR: number = 140;
    export var LADDER_ONE: number = 85;
    export var LADDER_TWO: number = 900;
    export var STAIRS_ONE: number = 220;
    export var STAIRS_ONE_TOP: number = 300;
    export var STAIRS_TWO: number = 600;
    export var STAIRS_TWO_TOP: number = 500;
    export var MOVE_WIDTH: number = 50;
}