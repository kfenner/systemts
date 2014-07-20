/*
 * SYSTEM.TS
 * Copyright (c) 2014 Kaspar Fenner
 * spdx:MIT
 * https://spdx.org/licenses/MIT
 */

module system {

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