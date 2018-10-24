import { ResourceManager } from './../foundation/resourceManager.js';

function displayScene() {
    let tex0 = ResourceManager.GetTexture("0.png");
    let bonus_animal1 = ResourceManager.GetTexture("SlotBouns_Animal_01.png");

}

function GameObject() {
    return {
        Run() {
            displayScene();
        }
    }
}

const Game = new GameObject();
Object.freeze(Game);

export {
    Game
}