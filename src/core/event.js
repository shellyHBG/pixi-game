/*
 * Description: For Event Management.
 * 
 */

//  =========== Dependencies ===========
import EventEmitter from 'eventemitter3';


//  =========== Functions ===========

/** 
 *  See [EventEmitter3](https://github.com/primus/eventemitter3).
 */
const system = Object.freeze( new EventEmitter() );

/**
 *  The Interface For Event System
 *  
 *  @return {EventEmitter} 
 */
function getSystem() {
    return system;
}
 
export {
    getSystem
}
