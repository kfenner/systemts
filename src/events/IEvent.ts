/*
 * SYSTEM.TS
 * Copyright (c) 2014 Kaspar Fenner
 * spdx:MIT
 * https://spdx.org/licenses/MIT
 */

module system {

    /**
     * Represents an Event object which can be used to attach handlers in order to receive notifications when the event fires. 
     */
    export interface IEvent<TEventArgs> {
        /** 
         * Adds an event handler which is invoked when the event fires.
         * @param handler The event handler to be registered.
         * @returns A reference to the registered event handler. Can be used to detach the handler from the event.
         */
        addHandler(handler: EventHandler<TEventArgs>): EventHandler<TEventArgs>;
        
        /** 
         * Removes a previously registered event handler from receiving notifications.
         * @param handler The event handler to be unregistered.
         */
        removeHandler(handler: EventHandler<TEventArgs>): void;
    }
}