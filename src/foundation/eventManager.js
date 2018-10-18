'use strict'

function IEventUnit()
{
    // string
    this.GetEventName = function(){ };

    // boolean
    this.GetSendAll = function(){ };

    // any object
    this.GetSecondKeyListened = function(){ };
}

function EventCaller(eventName, secondKey, callerObject, callback)
{
    // string
    let _eventName = eventName;

    // any object
    let _secondKey = secondKey;

    // any object
    let _callerObject = callerObject;

    // function (IEventUnit)=>void
    let _functionCall = callback;

    return {
        CallerObject: function() {
            return _callerObject;
        },
        FunctionCall: function() {
            return _functionCall;
        },
        SecondKey: function() {
            return _secondKey;
        },
        EventName: function() {
            return _eventName;
        }
    }
}

function EventManagerObject()
{
    // let _instance;
    // let _createInstance = function() {
    //     let ins = new Object();
    //     return ins;
    // }

    let _waitingAddEventTable = {};     // map {index: EventCaller}
    let _waitingRemoveEventList = [];   // nuumber []
    let _waitingSendEventList = [];     // IEventUnit []

    let _eventTable = {};               // map {eventName: map {}}
    let _callbackTable = {};            // map {int: EventCaller}
    let _currentAvailableIndex = 1;

    function SendPendingEvents()
    {
        //console.log(_waitingSendEventList);
        while(_waitingSendEventList.length > 0)
        {
            let event = _waitingSendEventList.pop();
            let eventName = event.GetEventName();
            if (!_eventTable.hasOwnProperty(eventName))
            {
                continue;
            }

            let secondKeyEventTable = _eventTable[eventName];
            if (event.GetSendAll())
            {
                Object.keys(secondKeyEventTable).forEach(secondKey=>{
                    secondKeyEventTable[secondKey].forEach(listenerIndex=>{
                        //console.log( "yyyyy " + eventName );

                        let listener = _callbackTable[listenerIndex];
                        let params = [];
                        params.push(event);
                        listener.FunctionCall().apply(listener.CallerObject(), params);
                    });
                });
            }
            else
            {
                if (!secondKeyEventTable.hasOwnProperty(event.GetSecondKeyListened()))
                {
                    continue;
                }
                
                let secondKeyListenerList = secondKeyEventTable[event.GetSecondKeyListened()];
                secondKeyListenerList.forEach(listenerIndex=>{
                    //console.log( "xxxxx " + eventName );

                    let listener = _callbackTable[listenerIndex];
                    let params = [];
                    params.push(event);
                    listener.FunctionCall().apply(listener.CallerObject(), params);
                });
            }
        }
    }

    function AddPendingEvents()
    {
        //console.log(_waitingAddEventTable);
        let keys = Object.keys(_waitingAddEventTable);
        keys.forEach(element=>
        {
            //console.log("_waitingAddEventTable: " + element);
            let listener = _waitingAddEventTable[element];
            let secondKeyEventTable = {};
            let listenerCollector = [];

            if (_eventTable.hasOwnProperty(listener.EventName()))
            {
                secondKeyEventTable = _eventTable[listener.EventName()];
            }
            else
            {
                secondKeyEventTable = {};
                _eventTable[listener.EventName()] = secondKeyEventTable;
            }

            if (secondKeyEventTable.hasOwnProperty(listener.SecondKey()))
            {
                listenerCollector = secondKeyEventTable[listener.SecondKey()];
            }
            else
            {
                listenerCollector = [];
                secondKeyEventTable[listener.SecondKey()] = listenerCollector;
            }

            listenerCollector.push(element);
            _callbackTable[element] = listener;

        });
        _waitingAddEventTable = {};
    }

    function RemovePendingEvents()
    {
        //console.log(_waitingRemoveEventList);
        while(Object.keys(_waitingRemoveEventList).length > 0)
        {
            let removingIndex = _waitingRemoveEventList.pop();
            if (_callbackTable.hasOwnProperty(removingIndex))
            {
                let removingListener = _callbackTable[removingIndex];
                if (!removingListener || !_eventTable.hasOwnProperty(removingListener.EventName()))
                {
                    continue;
                }

                let secondKeyEventTable = _eventTable[removingListener.EventName()];
                if (!secondKeyEventTable || !secondKeyEventTable.hasOwnProperty(removingListener.SecondKey()))
                {
                    continue;
                }

                let listenerCollector = secondKeyEventTable[removingListener.SecondKey()];
                if (!listenerCollector)
                {
                    continue;
                }

                let index = listenerCollector.indexOf(removingIndex);
                if (index >= 0)
                {
                    listenerCollector.splice(index, 1);
                }

                if (listenerCollector.length <= 0)
                {
                    delete secondKeyEventTable[removingListener.SecondKey()];
                }

                if (Object.keys(secondKeyEventTable).length <= 0)
                {
                    delete _eventTable[removingListener.EventName()];
                }
            }
        }
    }

    return {
        // GetInstance: function() {
        //     if (!_instance) {
        //         _instance = _createInstance();
        //     }
        //     return _instance;
        // },
        RegisterEventListner: function(type, callerObject, callback, secondKey = new Object) 
        {
            let currentIndex = _currentAvailableIndex;

            let instance = new type();
            let eventName = instance.GetEventName();
            //console.log( "eventName: " + eventName );
            let listener = new EventCaller(eventName, secondKey, callerObject, callback);

            _waitingAddEventTable[currentIndex] = listener;
            //console.log(_waitingAddEventTable);

            ++ _currentAvailableIndex;
            return currentIndex;
        },
        UnregisterEventListener: function(registerId)
        {
            _waitingRemoveEventList.push(registerId);
        },
        Send: function(event)   // IEventUnit
        {
            //console.log( "Send event: " + event.GetEventName() );
            _waitingSendEventList.push(event);
        },
        Update: function()
        {
            AddPendingEvents();
            RemovePendingEvents();
            SendPendingEvents();
        }
    }
};

const EventManager = new EventManagerObject();

/* test event */

function TestEvent() {}
// inheritance 
TestEvent.prototype = new IEventUnit();
// override constructor and ...
TestEvent.prototype.constructor = TestEvent;
TestEvent.prototype.GetEventName = function() { return  "TestEvent"; }
TestEvent.prototype.GetSendAll = function() { return  true; }
TestEvent.prototype.GetSecondKeyListened = function() { return  null; }


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// A frozen object can no longer be changed;...
Object.freeze(EventManager);
exports.EventManager = EventManager;
exports.TestEvent = TestEvent;
