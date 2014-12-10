/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: AssetManager.ts
Created: 11/22/14
Last Updated: 11/27/14
Description: This class loads and manages
the game assets
*******************************************/

module Util {
    export class AssetManager {

        static loader;
        static girlSpriteSheet;
        static torsoSpriteSheet;
        static clockSpriteSheet;
        static cubeSpriteSheet;

        static girlData = {
            "images": ["Assets/Images/girl.png"],
            "frames": [

                [2, 2, 100, 100],
                [104, 2, 100, 100],
                [206, 2, 100, 100],
                [308, 2, 100, 100],
                [410, 2, 100, 100],
                [512, 2, 100, 100],
                [614, 2, 100, 100],
                [2, 2, 100, 100],
                [716, 2, 100, 100],
                [818, 2, 100, 100],
                [920, 2, 100, 100],
                [1022, 2, 100, 100],
                [1124, 2, 100, 100],
                [1226, 2, 100, 100],
                [1328, 2, 100, 100],
                [1430, 2, 100, 100],
                [1532, 2, 100, 100],
                [1634, 2, 100, 100]
            ],
            "animations": {
                "idle": {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    speed: 0.15
                },
                "walk": {
                    frames: [10, 11, 12, 13, 14, 15, 16, 17],
                    speed: 0.15
                }
            },
        }

        static torsoData = {
            "images": ["Assets/Images/torso.png"],
            "frames": [

                [2, 2, 123, 130],
                [127, 2, 123, 130],
                [252, 2, 123, 130],
                [377, 2, 123, 130],
                [502, 2, 123, 130],
                [627, 2, 123, 130],
                [752, 2, 123, 130],
                [877, 2, 123, 130],
                [1002, 2, 123, 130],
                [1127, 2, 123, 130],
                [1252, 2, 123, 130],
                [1377, 2, 100, 130],
                [1479, 2, 100, 130],
                [1581, 2, 100, 130],
                [1683, 2, 100, 130],
                [1785, 2, 100, 130]
            ],
            "animations": {
                "idle": {
                    frames: [11, 12, 13, 14, 15],
                    speed: 0.15
                },
                "attack": {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    speed: 0.15
                }
            },
        }

        static clockData = {
            "images": ["Assets/Images/clock.png"],
            "frames": [

                [2, 2, 40, 40],
                [2, 44, 40, 40],
                [2, 86, 40, 40],
                [44, 2, 40, 40],
                [86, 2, 40, 40],
                [44, 44, 40, 40],
                [44, 86, 40, 40],
                [86, 44, 40, 40],
                [86, 86, 40, 40]
            ],
            "animations": {

                "tick": {
                    frames: [1, 2, 3, 4, 5, 6, 7, 8, 0],
                    next: false,
                    speed: 0.01
                }
            },
        }

        static cubeData = {
            "images": ["Assets/Images/c.png"],
            "frames": [

                [2, 2, 33, 27],
                [37, 2, 33, 27],
                [72, 2, 33, 27],
                [72, 2, 33, 27],
                [37, 2, 33, 27],
                [2, 2, 33, 27]
            ],
            "animations": {

                "idle": {
                    frames: [0, 1, 2, 3, 4, 5],
                    speed: 0.15
                }
            },
        }

        //Set up the manifest to load
        static manifest = [{ id: "house", src: "Assets/Images/house.png" },
            { id: "aButton_g", src: "Assets/Images/aGreen.png" },
            { id: "aButton_r", src: "Assets/Images/ARed.png" },
            { id: "title", src: "Assets/Images/title_screen.png" },
            { id: "play", src: "Assets/Images/play_button.png" },
            { id: "instructions", src: "Assets/Images/instructions_button.png" },
            { id: "gameover", src: "Assets/Images/game-over.png" },
            { id: "win", src: "Assets/Images/congrats.png" },
            { id: "theme", src: "Assets/Sounds/maintheme.mp3" },
            { id: "horror", src: "Assets/Sounds/horror.mp3" }];

        //On initial game load
        static init() {
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(this.manifest);
            this.girlSpriteSheet = new createjs.SpriteSheet(this.girlData);
            this.torsoSpriteSheet = new createjs.SpriteSheet(this.torsoData);
            this.clockSpriteSheet = new createjs.SpriteSheet(this.clockData);
            this.cubeSpriteSheet = new createjs.SpriteSheet(this.cubeData);
        }
    }
}