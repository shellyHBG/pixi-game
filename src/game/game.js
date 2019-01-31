import { Aquarium } from './aquarium.js';
import * as EventSystem from './../foundation/eventEmitter.js';

function GameObject() {

    let pixi_app = null;
    let _aquarium = null;
    let resetBtnElement = null;

    function displayScene() {

        if (_aquarium) {
            _aquarium.Destroy();
            clearStage();
            _aquarium = null;
        }

        _aquarium = new Aquarium(pixi_app, 20);
        console.log("new _aquarium");
        //_aquarium.Start();
    }

    function activeResetBtn() {
        resetBtnElement = document.getElementById('resetBtn');
        resetBtnElement.onclick = function() {
            displayScene();
            resetBtnElement.innerText = "Reset";
        }
    }

    function clearStage() {
        for (let i = pixi_app.stage.children.length - 1; i >= 0; i--) {	
            pixi_app.stage.removeChild(pixi_app.stage.children[i]);
        }
        console.log("clearStage finish");
    }

    function UpdateScene(delta) {
        //console.log("update game scene");
        if (!_aquarium) {
            //console.log("Aquarium NOT exist!");
            return;
        }
        _aquarium.Update(delta);
    }

    return {
        Run: function(app) {
            pixi_app = app;
            EventSystem.On(EventSystem.EventType.Game_Loop, UpdateScene, this);
            activeResetBtn();
        }
    }
}

const Game = new GameObject();
Object.freeze(Game);

export {
    Game
}