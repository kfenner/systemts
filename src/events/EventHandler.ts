/*
 * SYSTEM.TS
 * Copyright ©2014 Kaspar Fenner
 * spdx:MIT
 * https://spdx.org/licenses/MIT
 */

module system {

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