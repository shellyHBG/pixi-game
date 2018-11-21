import { EventEmitter } from "eventemitter3";

const EventSystem = new EventEmitter();
//Object.freeze(EventSystem);

const EventType = {
    Game_Run: "game:run",
    Game_Loop: "game:loop",
};

function GetSystem() {
    return EventSystem;
}

function On(event, callback, caller) {

    EventSystem.on(event, callback, caller);
}

function Once(event, callback, caller) {

    EventSystem.on(event, callback, caller);
}

function Emit(event, args) {

    EventSystem.emit(event, args);
}

export {
    EventType,
    GetSystem,
    On,
    Once,
    Emit
}