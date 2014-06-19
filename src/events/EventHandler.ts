/*
 * systemts
 * Author: Kaspar Fenner
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */

module system.events {

    /**
     * Represents the method that will handle an event.
     */
    export interface EventHandler<TEventArgs extends EventArgs> {
        /**
         * Represents the method that will handle an event.
         * @param sender The source of the event.
         * @param e An System.EventArgs that contains the event data.
         */
        (sender: Object, e: TEventArgs): void;
    }
}