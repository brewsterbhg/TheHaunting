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
    //Game state constants
    export var MENU_STATE: number = 1;
    export var PLAY_STATE: number = 2;
    export var END_STATE: number = 3;
    //Level state constants
    export var LEVEL_ONE: number = 1;
    export var LEVEL_TWO: number = 2;
    export var LEVEL_THREE: number = 3;
    //Control constants
    export var MOVE_LEFT: number = 37;
    export var MOVE_RIGHT: number = 39;
    export var USE: number = 65;
    //Game constants
    export var LEFT_WALL: number = 65;
    export var RIGHT_WALL: number = 925;
    export var FLOOR_ONE: number = 600;
    export var FLOOR_TWO: number = 450;
    export var FLOOR_THREE: number = 300;
    export var FLOOR_FOUR: number = 140;
    //Travel path constants
    export var LADDER_ONE: number = 85;
    export var LADDER_TWO: number = 900;
    export var STAIRS_ONE: number = 220;
    export var STAIRS_ONE_TOP: number = 300;
    export var STAIRS_TWO: number = 600;
    export var STAIRS_TWO_TOP: number = 500;
    export var MOVE_WIDTH: number = 50;
    //Furniture constants
    export var CUPBOARD_FLOOR_FOUR: number = 315;
    export var BED_FLOOR_FOUR: number = 500;
    export var TUB_FLOOR_THREE: number = 380;
    export var BED_FLOOR_THREE: number = 790;
    export var CUPBOARD_FLOOR_TWO: number = 700;
    export var SHOWER_FLOOR_TWO: number = 55;
    export var CUPBOARD_FLOOR_ONE: number = 130;
    export var FRIDGE_FLOOR_ONE: number = 890;
    //Font constants
    export var GAME_FONT: string = "bold 14px Verdana"
    export var GAME_COLOUR: string = "#FFFFFF";
}