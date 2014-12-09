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
            "images": ["Assets/Images/torso_idle.png"],
            "frames": [

                [2, 2, 100, 130],
                [2, 134, 100, 130],
                [2, 266, 100, 130],
                [2, 398, 100, 130],
                [2, 530, 100, 130]
            ],
            "animations": {
                "idle": {
                    frames: [0, 1, 2, 3, 4],
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
                    frames: [1, 2, 3, 4, 5, 6, 7, 8, 0, false],
                    speed: 0.03
                }
            },
        }

        //Set up the manifest to load
        static manifest = [{ id: "house", src: "Assets/Images/house.png" },
            { id: "aButton_g", src: "Assets/Images/aGreen.png" },
            { id: "aButton_r", src: "Assets/Images/aRed.png" },
            { id: "title", src: "Assets/Images/title_screen.png" },
            { id: "play", src: "Assets/Images/play_button.png" },
            { id: "instructions", src: "Assets/Images/instructions_button.png" }];

        //On initial game load
        static init() {
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(this.manifest);
            this.girlSpriteSheet = new createjs.SpriteSheet(this.girlData);
            this.torsoSpriteSheet = new createjs.SpriteSheet(this.torsoData);
            this.clockSpriteSheet = new createjs.SpriteSheet(this.clockData);
        }
    }
}