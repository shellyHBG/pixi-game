// import * as PIXI from 'pixi.js';
// console.log(PIXI);

// event manager test
import { EventManager, TestEvent } from './foundation/eventManager.js';

function testEventCall(event) {
    console.log(event.GetEventName() + " triger!!!");
}
let registerEventIndex = EventManager.RegisterEventListner(TestEvent, this, testEventCall);
EventManager.Update();

let testEvent = new TestEvent();
EventManager.Send(testEvent);
EventManager.Update();