/// <reference path="Util/Constants.ts" />
/// <reference path="Util/AssetManager.ts" />
/// <reference path="Objects/World.ts" />
/// <reference path="Objects/GameObject.ts" />
/// <reference path="Objects/Player.ts" />
/// <reference path="Objects/Monster.ts" />
/// <reference path="Objects/Room.ts" />
/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Game.ts
Created: 11/19/14
Last Updated: 12/04/14
Description: The class that runs the main
logic for the game
*******************************************/
//Class level variables
var stage;
var roomContainer;
var gameContainer;
var room;
var player;
var monster;
var currentFloor;
var aButton;
var onStairs = false;
var path;

var keysPressed = {};
var gameState;

/*
* Preload the necessary assets
*/
function preload() {
    Util.AssetManager.init();
    Util.AssetManager.loader.addEventListener("complete", initGame);
}

/*
* Set up the initial settings: canvas, state
*/
function initGame() {
    //Create the stage
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver();
    createjs.Ticker.setFPS(60);

    //Set ticker
    createjs.Ticker.addEventListener("tick", gameLoop);

    //Add listeners for key press
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    //Set play state and initial floor
    gameState = Constants.PLAY_STATE;
    currentFloor = Constants.FLOOR_THREE;

    //The container that holds the game sprites
    roomContainer = new createjs.Container;
    room = new Objects.Room(roomContainer, "house");
    roomContainer.addChild(room);

    //Player object
    player = new Objects.Player(roomContainer);
    roomContainer.addChild(player);
    player.currentFloor = currentFloor; //Set initial player y-position

    //Monster object
    monster = new Objects.Monster(roomContainer);
    roomContainer.addChild(monster);
    monster.x = 500;
    monster.y = 520;
    stage.addChild(roomContainer);

    //The action button that shows when you're near a usable object
    aButton = new createjs.Bitmap(Util.AssetManager.loader.getResult("aButton"));
    stage.addChild(aButton);

    //Set to false initially
    aButton.visible = false;
}

/*
* This function checks if the player is colliding with any usable objects
* Checks what floor the user is on, then checks if they're colliding with
* anything on that floor (positions don't move, and are hardcoded in the
* constants class)
*/
function checkCollisions() {
    if (currentFloor == Constants.FLOOR_ONE) {
        //Bottom of staircase one
        if (player.x > Constants.STAIRS_ONE && player.x < Constants.STAIRS_ONE + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 1;
        } else {
            onStairs = false;
            path = 0;
        }
    } else if (currentFloor == Constants.FLOOR_TWO) {
        //Bottom of staircase two
        if (player.x > Constants.STAIRS_TWO && player.x < Constants.STAIRS_TWO + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 2;
        } else if (player.x > Constants.STAIRS_ONE_TOP && player.x < Constants.STAIRS_ONE_TOP + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 3;
        } else {
            onStairs = false;
            path = 0;
        }
    } else if (currentFloor == Constants.FLOOR_THREE) {
        //Bottom of ladder one
        if (player.x > Constants.LADDER_ONE && player.x < Constants.LADDER_ONE + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 4;
        } else if (player.x > Constants.LADDER_TWO && player.x < Constants.LADDER_TWO + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 5;
        } else if (player.x > Constants.STAIRS_TWO_TOP && player.x < Constants.STAIRS_TWO_TOP + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 6;
        } else {
            onStairs = false;
            path = 0;
        }
    } else if (currentFloor == Constants.FLOOR_FOUR) {
        //Top of ladder one
        if (player.x > Constants.LADDER_ONE && player.x < Constants.LADDER_ONE + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 7;
        } else if (player.x > Constants.LADDER_TWO && player.x < Constants.LADDER_TWO + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 8;
        } else {
            onStairs = false;
            path = 0;
        }
    }
}

/*
* This function handles management of keys pressed. The only key it will handle
* is the "A" key for usable objects. It checks whether the user is on a path, or
* in front of an object, and acts accordingly
*/
function keyDown(event) {
    keysPressed[event.keyCode] = true;

    //Make sure the user is playing
    if (gameState == Constants.PLAY_STATE) {
        //If the flag onStairs is true (the user is on a travel path)
        if (onStairs && Constants.USE in keysPressed) {
            if (path != 0) {
                switch (path) {
                    case 1:
                        //First floor to second floor
                        player.x = Constants.STAIRS_ONE_TOP;
                        currentFloor = Constants.FLOOR_TWO;
                        break;
                    case 2:
                        //Second floor to third floor
                        player.x = Constants.STAIRS_TWO_TOP;
                        currentFloor = Constants.FLOOR_THREE;
                        break;
                    case 3:
                        //Second floor to first floor
                        player.x = Constants.STAIRS_ONE;
                        currentFloor = Constants.FLOOR_ONE;
                        break;
                    case 4:
                        //Third floor to fourth floor (ladder one)
                        player.x = Constants.LADDER_ONE;
                        currentFloor = Constants.FLOOR_FOUR;
                        break;
                    case 5:
                        //Third floor to fourth floor (ladder two)
                        player.x = Constants.LADDER_TWO;
                        currentFloor = Constants.FLOOR_FOUR;
                        break;
                    case 6:
                        //Third floor to second floor
                        player.x = Constants.STAIRS_TWO;
                        currentFloor = Constants.FLOOR_TWO;
                        break;
                    case 7:
                        //Fourth four to third floor (ladder one)
                        player.x = Constants.LADDER_ONE;
                        currentFloor = Constants.FLOOR_THREE;
                        break;
                    case 8:
                        //Fourth floor to third floor (ladder two)
                        player.x = Constants.LADDER_TWO;
                        currentFloor = Constants.FLOOR_THREE;
                        break;
                }

                //Set the new player y-position
                player.currentFloor = currentFloor;
            }
        }
    }
}

/*
* After the user has released the use button, erase it
*/
function keyUp(event) {
    delete keysPressed[event.keyCode];
}

/**
* This function takes two points, and calculates the distance
*
**/
function distance(point1, point2) {
    //Get points
    var p1;
    var p2;
    var itemX;
    var itemY;
    var result;

    p1 = new createjs.Point();
    p2 = new createjs.Point();

    p1.x = point1.x;
    p1.y = point1.y;
    p2.x = point2.x;
    p2.y = point2.y;

    itemX = p2.x - p1.x;
    itemY = p2.y - p1.y;

    itemX = itemX * itemX;
    itemY = itemY * itemY;

    //Return the distance result
    result = Math.sqrt(itemX + itemY);
    return result;
}

/*
* Change the current game state
* @param state : the new state to switch to
*/
function changeState(state) {
    gameState = state;
    switch (state) {
        case Constants.MENU_STATE:
            break;
        case Constants.PLAY_STATE:
            break;
        case Constants.END_STATE:
            break;
    }
}

/*
* The main game loop. Update all objects, and check player collisions
*/
function gameLoop() {
    player.update();
    stage.update();
    checkCollisions();
    if (onStairs) {
        //Display the use button
        aButton.visible = true;
        aButton.x = player.x + 20;
        aButton.y = player.y - 90;
    }
    if (!onStairs) {
        //Hide the use button
        aButton.visible = false;
    }
}
//# sourceMappingURL=Game.js.map
