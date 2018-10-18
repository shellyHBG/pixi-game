// import * as PIXI from 'pixi.js';
// console.log(PIXI);

// event manager test
import { EventManager, TestEvent } from './foundation/eventManager.js';

let registerEventIndex = EventManager.RegisterEventListner(TestEvent, this, ()=>{ console.log("test event triger!!!"); });
EventManager.Update();

let testEvent = new TestEvent();
EventManager.Send(testEvent);
EventManager.Update();