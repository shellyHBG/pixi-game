
//  =========== Dependencies ===========
import EventEmitter from 'eventemitter3';


//  =========== Functions ===========

/**
 *  See [EventEmitter3](https://github.com/primus/eventemitter3).
 *  
 */
const system = Object.freeze( new EventEmitter() );

//  READ ONLY
function getEventSystem() {
    return system;
}
 
export default getEventSystem;
