/// <reference path="Util/Constants.ts" />
/// <reference path="Util/AssetManager.ts" />
/// <reference path="Objects/GameObject.ts" />
/// <reference path="Objects/Player.ts" />
/// <reference path="Objects/Monster.ts" />
/// <reference path="Objects/Cube.ts" />
/// <reference path="Objects/Clock.ts" />
/// <reference path="Objects/Room.ts" />
/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Game.ts
Created: 11/19/14
Last Updated: 12/07/14
Description: The class that runs the main
logic for the game
*******************************************/
//Class level variables
var stage;
var menuContainer;
var roomContainer;
var shadowContainer;
var room;
var player;
var clock;
var monster;
var monster2;
var cube;

var currentFloor;
var aButtonGreen;
var aButtonRed;
var onStairs = false;
var onObject = false;
var path;
var obj;
var playerHiding = false;
var keysPressed = {};
var gameState;
var level;
var timer = 5;
var debuffClock;
var timeLeftOnDebuff;
var debuff = false;
var gameTick;
var gameTime = 120;
var gameTimeValue;

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

    //Set game state
    changeState(Constants.MENU_STATE);

    //Set ticker
    createjs.Ticker.addEventListener("tick", gameLoop);

    //Add listeners for key press
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    //Set title screen
    menuContainer = new createjs.Container;
    var titleScreen = new createjs.Bitmap(Util.AssetManager.loader.getResult("title"));
    menuContainer.addChild(titleScreen);

    //Add play button
    var playButton = new createjs.Bitmap(Util.AssetManager.loader.getResult("play"));
    menuContainer.addChild(playButton);
    playButton.addEventListener("mouseover", mousePointer);
    playButton.addEventListener("mouseout", mouseDefault);
    playButton.addEventListener("click", playGame);

    //Add instructions button
    var instructionsButton = new createjs.Bitmap(Util.AssetManager.loader.getResult("instructions"));
    menuContainer.addChild(instructionsButton);
    instructionsButton.addEventListener("mouseover", mousePointer);
    playButton.addEventListener("mouseout", mouseDefault);
    stage.addChild(menuContainer);
    createjs.Sound.play("theme", "none", 0, 0, -1);
    stage.update();
}

function playGame() {
    createjs.Sound.stop();
    createjs.Sound.play("horror", "none", 0, 0, -1);

    //Set play state and initial floor
    changeState(Constants.PLAY_STATE);
    level = Constants.LEVEL_TWO;
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
    stage.addChild(roomContainer);

    //The action button that shows when you're near a usable object
    aButtonGreen = new createjs.Bitmap(Util.AssetManager.loader.getResult("aButton_g"));
    stage.addChild(aButtonGreen);

    //Set to false initially
    aButtonGreen.visible = false;
    aButtonRed = new createjs.Bitmap(Util.AssetManager.loader.getResult("aButton_r"));
    stage.addChild(aButtonRed);

    //Set to false initially
    aButtonRed.visible = false;

    //Set game timer
    gameTimeValue = new createjs.Text("Time Remaining: " + gameTime.toString(), Constants.GAME_FONT, Constants.GAME_COLOUR);
    stage.addChild(gameTimeValue);
    var gameClock = setInterval(gameTimer, 1000);

    //Add shadow container
    shadowContainer = new createjs.Container;
    var shadowOne = new createjs.Shape();
    shadowOne.graphics.beginFill("#000000");
    shadowOne.graphics.drawRect(0, 50, Constants.STAGE_WIDTH, 150);
    shadowContainer.addChild(shadowOne);
    var shadowTwo = new createjs.Shape();
    shadowTwo.graphics.beginFill("#000000");
    shadowTwo.graphics.drawRect(0, 200, Constants.STAGE_WIDTH, 150);
    shadowContainer.addChild(shadowTwo);
    var shadowThree = new createjs.Shape();
    shadowThree.graphics.beginFill("#000000");
    shadowThree.graphics.drawRect(0, 350, Constants.STAGE_WIDTH, 150);
    shadowContainer.addChild(shadowThree);
    var shadowFour = new createjs.Shape();
    shadowFour.graphics.beginFill("#000000");
    shadowFour.graphics.drawRect(0, 500, Constants.STAGE_WIDTH, 150);
    shadowContainer.addChild(shadowFour);
    shadowOne.alpha = 0.9;
    shadowTwo.alpha = 0.9;
    shadowThree.alpha = 0.9;
    shadowFour.alpha = 0.9;
    stage.addChild(shadowContainer);
    shadowContainer.visible = false;
    shadowContainer.getChildAt(1).visible = false;
}

/*
* This function checks if the player is colliding with any usable objects
* Checks what floor the user is on, then checks if they're colliding with
* anything on that floor (positions don't move, and are hardcoded in the
* constants class)
*/
function checkCollisions() {
    //Wall collisions
    if (player.x <= Constants.LEFT_WALL) {
        player.x = Constants.LEFT_WALL;
    }
    if (player.x >= Constants.RIGHT_WALL) {
        player.x = Constants.RIGHT_WALL;
    }
    if (currentFloor == Constants.FLOOR_ONE) {
        //Bottom of staircase one
        if (player.x > Constants.STAIRS_ONE && player.x < Constants.STAIRS_ONE + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 1;
        } else if (player.x > Constants.CUPBOARD_FLOOR_ONE && player.x < Constants.CUPBOARD_FLOOR_ONE + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 1;
        } else if (player.x > Constants.FRIDGE_FLOOR_ONE && player.x < Constants.FRIDGE_FLOOR_ONE + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 2;
        } else {
            onStairs = false;
            onObject = false;
            path = 0;
            obj = 0;
        }
    } else if (currentFloor == Constants.FLOOR_TWO) {
        //Bottom of staircase two
        if (player.x > Constants.STAIRS_TWO && player.x < Constants.STAIRS_TWO + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 2;
        } else if (player.x > Constants.STAIRS_ONE_TOP && player.x < Constants.STAIRS_ONE_TOP + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 3;
        } else if (player.x > Constants.SHOWER_FLOOR_TWO && player.x < Constants.SHOWER_FLOOR_TWO + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 3;
        } else if (player.x > Constants.CUPBOARD_FLOOR_TWO && player.x < Constants.CUPBOARD_FLOOR_TWO + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 4;
        } else {
            onStairs = false;
            onObject = false;
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
        } else if (player.x > Constants.TUB_FLOOR_THREE && player.x < Constants.TUB_FLOOR_THREE + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 5;
        } else if (player.x > Constants.BED_FLOOR_THREE && player.x < Constants.BED_FLOOR_THREE + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 6;
        } else {
            onStairs = false;
            onObject = false;
            path = 0;
            obj = 0;
        }
    } else if (currentFloor == Constants.FLOOR_FOUR) {
        //Top of ladder one
        if (player.x > Constants.LADDER_ONE && player.x < Constants.LADDER_ONE + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 7;
        } else if (player.x > Constants.LADDER_TWO && player.x < Constants.LADDER_TWO + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 8;
        } else if (player.x > Constants.BED_FLOOR_FOUR && player.x < Constants.BED_FLOOR_FOUR + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 7;
        } else if (player.x > Constants.CUPBOARD_FLOOR_FOUR && player.x < Constants.BED_FLOOR_FOUR + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 8;
        } else {
            onStairs = false;
            onObject = false;
            path = 0;
            obj = 0;
        }
    }

    //Check monster collision
    if (monster.x > player.x - 5 && monster.x < player.x + 5) {
        if (monster.y == player.y) {
            monster.attack();
        }
    }

    //Check cube collision
    if (roomContainer.getChildByName("cube") != null) {
        if (player.x > cube.x - 3 && player.x < cube.x + 3 && currentFloor == cube.y) {
            roomContainer.removeChild(cube);
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
                var switchFloor = 1;
                var floorAsNum;
                switch (path) {
                    case 1:
                        //First floor to second floor
                        player.x = Constants.STAIRS_ONE_TOP;
                        currentFloor = Constants.FLOOR_TWO;
                        floorAsNum = 2;
                        break;
                    case 2:
                        //Second floor to third floor
                        player.x = Constants.STAIRS_TWO_TOP;
                        currentFloor = Constants.FLOOR_THREE;
                        floorAsNum = 1;
                        break;
                    case 3:
                        //Second floor to first floor
                        player.x = Constants.STAIRS_ONE;
                        currentFloor = Constants.FLOOR_ONE;
                        floorAsNum = 3;
                        break;
                    case 4:
                        //Third floor to fourth floor (ladder one)
                        player.x = Constants.LADDER_ONE;
                        currentFloor = Constants.FLOOR_FOUR;
                        floorAsNum = 0;
                        break;
                    case 5:
                        //Third floor to fourth floor (ladder two)
                        player.x = Constants.LADDER_TWO;
                        currentFloor = Constants.FLOOR_FOUR;
                        floorAsNum = 0;
                        break;
                    case 6:
                        //Third floor to second floor
                        player.x = Constants.STAIRS_TWO;
                        currentFloor = Constants.FLOOR_TWO;
                        floorAsNum = 2;
                        break;
                    case 7:
                        //Fourth four to third floor (ladder one)
                        player.x = Constants.LADDER_ONE;
                        currentFloor = Constants.FLOOR_THREE;
                        floorAsNum = 1;
                        break;
                    case 8:
                        //Fourth floor to third floor (ladder two)
                        player.x = Constants.LADDER_TWO;
                        currentFloor = Constants.FLOOR_THREE;
                        floorAsNum = 1;
                        break;
                }

                //Set the new player y-position
                player.currentFloor = currentFloor;
                shadowContainer.getChildAt(0).visible = true;
                shadowContainer.getChildAt(1).visible = true;
                shadowContainer.getChildAt(2).visible = true;
                shadowContainer.getChildAt(3).visible = true;
                shadowContainer.getChildAt(floorAsNum).visible = false;
            }
        } else if (onObject && Constants.USE in keysPressed) {
            if (obj != 0 && !playerHiding && !debuff) {
                debuff = true;

                //Set player hiding flag
                playerHiding = true;
                player.visible = false;

                //Check to make sure there's no clock on the screen
                if (roomContainer.getChildByName("clock") == null) {
                    //Add a new clock, and listen for when it finishes it's animation
                    clock = new Objects.Clock(roomContainer);
                    roomContainer.addChild(clock);
                    clock.x = player.x;
                    clock.y = player.y;
                    clock.name = "clock";
                    clock.addEventListener("timeup", unhideHero);
                }
            } else if (obj != 0 && playerHiding) {
                unhideHero();
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

/*
* When the clock timer ends, unhide the hero
*/
function unhideHero() {
    player.visible = true;
    playerHiding = false;
    roomContainer.removeChild(clock);
    debuffClock = setInterval(debuffTimer, 1000);
    if (stage.getChildByName("timeleft") == null) {
        //Show player how long they have to wait
        timeLeftOnDebuff = new createjs.Text(timer.toString(), Constants.GAME_FONT, Constants.GAME_COLOUR);
        stage.addChild(timeLeftOnDebuff);
        timeLeftOnDebuff.x = player.x - 50;
        timeLeftOnDebuff.y = player.y - 100;
        timeLeftOnDebuff.name = "timeleft";
    }
}

/*
*
*/
function debuffTimer() {
    timer--;
}

/*
*
*/
function gameTimer() {
    gameTime--;
    stage.removeChild(gameTimeValue);
    gameTimeValue = new createjs.Text("Time Remaining: " + gameTime.toString(), Constants.GAME_FONT, Constants.GAME_COLOUR);
    stage.addChild(gameTimeValue);
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
* Creates a cube object (collect for score) and randomly places it in the house
*/
function createCube() {
    if (roomContainer.getChildByName("cube") == null) {
        cube = new Objects.Cube(roomContainer);
        roomContainer.addChild(cube);
        cube.name = "cube";

        //Randomize the x position
        cube.x = Math.floor(Math.random() * Constants.STAGE_WIDTH);
        if (cube.x > Constants.RIGHT_WALL) {
            cube.x - Constants.RIGHT_WALL;
        }
        if (cube.x < Constants.LEFT_WALL) {
            cube.x + Constants.LEFT_WALL;
        }
        var floor = Math.floor(Math.random() * 4) + 1;

        switch (floor) {
            case 1:
                cube.y = Constants.FLOOR_ONE;
                break;
            case 2:
                cube.y = Constants.FLOOR_TWO;
                break;
            case 3:
                cube.y = Constants.FLOOR_THREE;
                break;
            case 4:
                cube.y = Constants.FLOOR_FOUR;
                break;
        }
    }
}

/*
* Checks the flag if a player is standing next to a usable object
* Show green use button if a travel path, red for a furnishing
*/
function checkActionButtons() {
    if (onStairs) {
        //Display the green use button
        aButtonGreen.visible = true;
        aButtonGreen.x = player.x + 20;
        aButtonGreen.y = player.y - 90;
    }
    if (!onStairs) {
        //Hide the use button
        aButtonGreen.visible = false;
    }
    if (onObject) {
        //Display the red use button
        aButtonRed.visible = true;
        aButtonRed.x = player.x;
        aButtonRed.y = player.y - 90;
    }
    if (!onObject) {
        //Hide the use button
        aButtonRed.visible = false;
    }
}

function checkTimer() {
    if (timer == 0) {
        stage.removeChild(timeLeftOnDebuff);
        timer = 5;
        debuff = false;
        clearInterval(debuffClock);
    }
    if (stage.getChildByName("timeleft") != null) {
        stage.removeChild(timeLeftOnDebuff);

        //Show player how long they have to wait
        timeLeftOnDebuff = new createjs.Text(timer.toString(), Constants.GAME_FONT, Constants.GAME_COLOUR);
        stage.addChild(timeLeftOnDebuff);
        timeLeftOnDebuff.x = player.x - 20;
        timeLeftOnDebuff.y = player.y - 80;
        timeLeftOnDebuff.name = "timeleft";
    }
    if (gameTime == 0) {
    }
    if (gameTime % 5 == 0) {
        createCube();
    }
}

/*
* The main game loop. Update all objects, and check player collisions
*/
function gameLoop() {
    if (gameState == Constants.PLAY_STATE) {
        //Updates
        if (!playerHiding) {
            player.update();
        }
        monster.update(player.x, currentFloor, playerHiding);
        stage.update();
        checkCollisions();
        checkActionButtons();
        checkTimer();

        //During level 2 and level 3
        if (level != Constants.LEVEL_ONE) {
            shadowContainer.visible = true;
        }
    }
    if (level == Constants.LEVEL_THREE) {
        //Level 3
        monster2 = new Objects.Monster(roomContainer);
        roomContainer.addChild(monster2);
        monster2.x = 100;
        monster2.update(player.x, currentFloor, playerHiding);
    }
}

//Changing the cursor to pointer for hoverable objects
function mousePointer(e) {
    document.body.style.cursor = 'pointer';
}

//Changing the cursor back to default on mouse out
function mouseDefault(e) {
    document.body.style.cursor = 'default';
}
//# sourceMappingURL=Game.js.map
