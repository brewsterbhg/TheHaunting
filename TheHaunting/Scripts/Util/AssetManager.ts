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

        static girlData = {
            "images": ["Assets/Images/girl_walk.png"],
            "frames": [
                
                [2, 2, 100, 100],
                [104, 2, 100, 100],
                [206, 2, 100, 100],
                [308, 2, 100, 100],
                [410, 2, 100, 100],
                [512, 2, 100, 100],
                [614, 2, 100, 100],
                [716, 2, 100, 100]
            ],
            "animations": {
                "walk": {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7],
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


        //Set up the manifest to load
        static manifest = [{ id: "house", src: "Assets/Images/house.png" },
            { id: "aButton", src: "Assets/Images/aGreen.png" }];

        //On initial game load
        static init() {
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(this.manifest);
            this.girlSpriteSheet = new createjs.SpriteSheet(this.girlData);
            this.torsoSpriteSheet = new createjs.SpriteSheet(this.torsoData);
        }
    }
}