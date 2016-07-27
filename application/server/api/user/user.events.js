/**
 *   User Event Emitter
 *    - Dispatches events that are being watched by socket.io
 *
 *   <JoelCox @JoelCoxOKX>
 */

import {EventEmitter} from 'events';
import User from './user.model';

const events_ = ['save', 'remove'];

export class UserEventsEmitter extends EventEmitter {

  constructor(...args) {
    super(...args)

    // Set max event listeners (0 == unlimited)
    this.setMaxListeners(0);
  }

  configure(...args) {
    super.configure && super.configure(...args);

    // Register the event emitter to the model events
    let createListener;
    let keys = events_.slice()
    let event;
    let name;

    createListener = (name, event)=> {
      let uniqueEvent = `${event}:${doc._id}`;
      let emitter = (doc)=> {
        this.emit(uniqueEvent, doc);
        this.emit(event, doc);
      }
      User.schema.post(name, emitter);
    }

    while(name = keys.shift()) {
      createListener(name, events[name]);
    }
  }
}

const UserEvents = new UserEventsEmitter();
export { UserEvents }


