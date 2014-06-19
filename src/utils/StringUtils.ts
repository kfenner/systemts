/*
 * systemts
 * Author: Kaspar Fenner
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */

module system.utils {

    export class StringUtils {
        /**
        * Checks if a string is null or empty.
        */
        public static isNullOrEmpty(str: string): boolean {
            return (str === null || str === undefined) || ((typeof str === 'string' || typeof str === 'object') && str.length === 0);
        }

        /**
         * Joins a collection of objects into a string.
         */
        public static join<T extends Object>(collection: system.collections.IEnumerable<T>, seperator?: string): string {
            var str = '';
            if (seperator) {
                collection.each((v) => str += v.toString() + seperator);
                str = str.substr(0, str.length - seperator.length);
            }
            else {
                collection.each((v) => str += v.toString());
            }
            return str;
        }

        /** 
          * Returns the Unicode value of the character at the specified location.
          * @param index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned. If there is a high surrogate (UTF-16) at the specified position, -1 is returned.
          */
        public static unicodeCharCodeAt(str: string, index: number): number {
            var idx = index || 0;
            var code = str.charCodeAt(idx);

            // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters).
            if (0xD800 <= code && code <= 0xDBFF) {
                var high = code;
                var low = str.charCodeAt(idx + 1);
                if (isNaN(low)) {
                    // High surrogate not followed by low surrogate
                    return NaN;
                }
                return ((high - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
            }
            // Low surrogate
            if (0xDC00 <= code && code <= 0xDFFF) {
                // Return -1 to allow loops to skip this iteration since it should have
                // already handled high surrogate above in the previous iteration.
                return -1;
            }
            return code;
        }
    }
}