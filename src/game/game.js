import { Aquarium } from './aquarium.js';
import * as EventSystem from './../foundation/eventEmitter.js';

function GameObject() {

    let pixi_app = null;
    let _aquarium = null;

    function displayScene() {

        _aquarium = new Aquarium(pixi_app, 5);
        //_aquarium.Start();
    }

    function UpdateScene(delta) {
        //console.log("update game scene");
        _aquarium.Update(delta);
    }

    return {
        Run: function(app) {
            pixi_app = app;
            //console.log(this);
            EventSystem.On(EventSystem.EventType.Game_Loop, UpdateScene, this);
            displayScene();
        }
    }
}

const Game = new GameObject();
Object.freeze(Game);

export {
    Game
}