/*
 * systemts
 * Author: Kaspar Fenner
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */

module system.events {

    /**
     * Represents an Event object which can be used to attach handlers in order to receive notifications when the event fires. 
     */
    export class Event<TEventArgs> implements IEvent<TEventArgs> {
        private handlerList: system.collections.List<EventHandler<TEventArgs>> = new system.collections.List<EventHandler<TEventArgs>>();

        /** 
         * Adds an event handler which is invoked when the event fires.
         * @param handler The event handler to be registered.
         * @returns A reference to the registered event handler. Can be used to detach the handler from the event.
         */
        public addHandler(handler: EventHandler<TEventArgs>): EventHandler<TEventArgs> {
            this.handlerList.add(handler);
            return handler;
        }

        /** 
         * Removes a previously registered event handler from receiving notifications.
         * @param handler The event handler to be unregistered.
         */
        public removeHandler(handler: EventHandler<TEventArgs>): void {
            this.handlerList.removeAll(handler);
        }

        /** 
         * Removes all registered event handlers from receiving notifications.
         * @param handler The event handler to be unregistered.
         */
        public removeAllHandlers() {
            this.handlerList.clear();
        }

        /** 
         * Notifies all registered event handlers by sending the specified arguments.
         * @param handler The event handler to be unregistered.
         */
        public invoke(sender: Object, e: TEventArgs): void {
            this.handlerList.each((handler) => handler(sender, e));
        }

        /**
         * Invokes an event declared only by the IEvent interface.
         */
        public static invoke<TEventArgs>(event: IEvent<TEventArgs>, sender: Object, e: TEventArgs): void {
            (<Event<TEventArgs>>event).invoke(sender, e);
        }

        /**
         * Removes all handlers on an event declared only by the IEvent interface.
         */
        public static removeAllHandlers<TEventArgs>(event: IEvent<TEventArgs>): void {
            (<Event<TEventArgs>>event).removeAllHandlers();
        }
    }
}