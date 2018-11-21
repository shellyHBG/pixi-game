import { loader, TextureCache } from './../pixi/application.js';
import * as EventSystem from './eventEmitter.js';

import bg from './../../resources/images/BG.jpg';
import fish_items from './../../resources/images/fish_items.json';
import fish_items_png from './../../resources/images/fish_items.png';

const resourceList = [
    bg,
    fish_items_png,
];

const resourceAtlas = [
    fish_items,
];

let atlasSourceTextureMap = {};

function onProgress(loader, resource) {
    //Display the file `url` currently being loaded
    console.log("loading: " + resource.url);

    //Display the percentage of files currently loaded
    console.log("progress: " + loader.progress + "%");
}

function onError(error, loader, resource) {
    if (error) {
        console.log("error: " + error + "; at " + resource.url);
    }
}

function resourceSetup() {
    console.log("Resource files loaded");

    if (resourceAtlas.length == 0) {
        EventSystem.Emit(EventSystem.EventType.Game_Run, null);
    }
    else {
        atlasLoad();
    }
}

function atlasLoad() {
    console.log("load atlas");

    resourceAtlas.forEach((data) => {

        let spritesheet = new PIXI.Spritesheet(TextureCache["assets/images/" + data.meta.image].baseTexture, data);
        spritesheet.parse(function (textures) {
            //console.log(textures);

            // finished preparing spritesheet textures
            atlasSourceTextureMap[data.meta.image.split('.')[0]] = textures;

            if (Object.keys(atlasSourceTextureMap).length == resourceAtlas.length) {
                EventSystem.Emit(EventSystem.EventType.Game_Run, null);
            }
        });
    });
}

function ResourceManagerObject() {

    return {
        Init: function(callback = null, caller = null) {

            loader
                .add(resourceList)
                .on("progress", onProgress)
                .on("error", onError)
                .load(resourceSetup);

        },
        GetTexture: function(name, atlas = null) {

            if (atlas) {
                return atlasSourceTextureMap[atlas][name];
            }
            else if (TextureCache["assets/images/" + name]) {
                return TextureCache["assets/images/" + name];
            }
            else {
                console.log(name + " not exist.");
            }
        },
        GetSprite: function(name, atlas = null) {

            if (atlas) {
                return new Sprite(atlasSourceTextureMap[atlas][name]);
            }
            else if (TextureCache["assets/images/" + name]) {
                return new Sprite(TextureCache["assets/images/" + name]);
            }
            else {
                console.log(name + " not exist.");
            }
        }
    }
}

const ResourceManager = new ResourceManagerObject();
Object.freeze(ResourceManager);

export {
    ResourceManager
}