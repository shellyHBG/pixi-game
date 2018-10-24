import { loader, TextureCache } from './../pixi/application.js';

const resourceList = [
    "resources/images/jumanji_items.json",
    "resources/images/jumanji_bonus.json"
];

let initCallback = null;
let initCaller = null;

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

function setup() {
    console.log("All files loaded");

    if (initCallback) {
        initCallback.apply(initCaller);
    }
    else {
        console.log("no callback after loaded");
    }
}

function ResourceManagerObject() {

    return {
        Init: function(callback = null, caller = null) {

            // assign loading callback
            initCallback = callback;
            initCaller = caller;

            loader
                .add(resourceList)
                .on("progress", onProgress)
                .on("error", onError)
                .load(setup);
        },
        GetTexture: function(name) {
            if (!TextureCache[name]) {
                console.log(name + " not exist.");
            }
            return TextureCache[name];
        },
        GetSprite: function(name) {
            if (!TextureCache[name]) {
                console.log(name + " not exist.");
            }
            return new Sprite(TextureCache[name]);
        }
    }
}

const ResourceManager = new ResourceManagerObject();
Object.freeze(ResourceManager);

export {
    ResourceManager
}