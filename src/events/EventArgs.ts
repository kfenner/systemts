/*
 * systemts
 * Author: Kaspar Fenner
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */

module system.events {

    /**
     * EventArgs represents the base class for classes containing event data.
     */
    export class EventArgs {
        /**
         * Represents an event with no event data.
         */
        public static empty: EventArgs = new EventArgs();
    }
}