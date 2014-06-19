/*
 * systemts
 * Author: Kaspar Fenner
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */

module system.collections {

    /**
     * Represents a generic read-only collection, normally used to to perform all sorts of actions and data queries on a standard array.
     * Read-only means no elements can be added or removed from the collection. The underlaying elements are not read-only.
     */
    export class ReadOnlyCollection<TSource> implements IEnumerable<TSource> {
        private arr: Array<TSource>;

        constructor(source?: Array<TSource>) {
            this.arr = source ? source : [];
        }

        /**
         * Determines whether all elements of a sequence satisfy a condition.
         * @param predicate A function to test each element for a condition.
         * @returns true if every element of the sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, false.
         */
        public all(predicate: (element: TSource) => boolean): boolean {
            var result = true;
            this.until((ele) => {
                if (!predicate(ele)) {
                    result = false;
                    return false;
                }
            });
            return result;
        }
        
        /**
         * Determines whether any element of a sequence satisfies a condition.
         * @param predicate A function to test each element for a condition.
         * @returns true if any elements in the sequence pass the test in the specified predicate; otherwise, false.
         */
        public any(predicate: (element: TSource) => boolean): boolean {
            var result = false;
            this.until((ele) => {
                if (predicate(ele)) {
                    result = true;
                    return false;
                }
            });
            return result;
        }

        /**
         * Performs the specified action on each element of the collection.
         * @param action The action to perform on each element of the list.
         */
        public each(action: (value: TSource, index?: number) => void): void {
            this.arr.forEach(action);
        }

        /**
         * Returns the first element of a sequence.
         * @returns The first element in the sequence.
         */
        public first(): TSource;
        /**
         * Returns the first element in a sequence that satisfies a specified condition.
         * @param predicate A function to test each element for a condition.
         * @returns The first element in the sequence that passes the test in the specified predicate function.
         */
        public first(predicate: (element: TSource) => boolean): TSource;
        // Actual implementation
        public first(predicate?: (element: TSource) => boolean): TSource {
            if (predicate) {
                var result: TSource;
                this.until((ele) => {
                    if (predicate(ele)) {
                        result = ele;
                        return false;
                    }
                });
                return result;
            }
            else {
                return this.arr[0];
            }
        }

        /**
         * Performs the specified action on each element of the collection starting with the last element until the specified action returns false.
         * @param action The action to perform on each element of the list until it returns false.
         */
        public fromLastUntil(action: (value: TSource, index?: number) => any): void {
            for (var i = this.arr.length -1; i >= 0; i -= 1) {
                if (action(this.arr[i], i) === false) {
                    return;
                }
            }
        }

        /**
         * Returns the last element of a sequence.
         * @returns The last element in the sequence.
         */
        public last(): TSource;
        /**
         * Returns the last element in a sequence that satisfies a specified condition.
         * @param predicate A function to test each element for a condition.
         * @returns The last element in the sequence that passes the test in the specified predicate function.
         */
        public last(predicate: (element: TSource) => boolean): TSource;
        // Actual implementation
        public last(predicate?: (element: TSource) => boolean): TSource {
            if (predicate) {
                var result: TSource;
                this.fromLastUntil((ele) => {
                    if (predicate(ele)) {
                        result = ele;
                        return false;
                    }
                });
                return result;
            }
            else {
                return this.arr[this.arr.length - 1];
            }
        }

        /**
         * Returns the number of elements in a sequence.
         * @returns The number of elements in the sequence.
         */
        public length(): number {
            return this.arr.length;
        }

        /**
         * Inverts the order of the elements in a sequence.
         * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
         */
        public reverse(): IEnumerable<TSource> {
            return new ReadOnlyCollection(this.arr.reverse());
        }

        /**
         * Projects each element of a sequence into a new form.
         * @param selector A transform function to apply to each element.
         * @returns An IEnumerable<TResult> whose elements are the result of invoking the transform function on each element of source.
         */
        public select<TResult>(selector: (element: TSource) => TResult): IEnumerable<TResult> {
            return new ReadOnlyCollection(this.arr.map(selector));
        }

        /**
         * Creates an array from the sequence.
         * @returns An array that contains the elements from the input sequence.
         */
        public toArray(): Array<TSource> {
            return this.arr;
        }

        /**
         * Performs the specified action on each element of the collection until the specified action returns false.
         * @param action The action to perform on each element of the list until it returns false.
         */
        public until(action: (value: TSource, index?: number) => any): void {
            for (var i = 0; i < this.arr.length; i += 1) {
                if (action(this.arr[i], i) === false) {
                    return;
                }
            }
        }

        /**
         * Filters a sequence of values based on a predicate.
         * @param predicate A function to test each element for a condition.
         * @returns An IEnumerable<TSource> that contains elements from the input sequence that satisfy the condition.
         */
        public where(predicate: (element: TSource) => boolean): IEnumerable<TSource> {
            return new ReadOnlyCollection(this.arr.filter(predicate));
        }

        /**
         * Merges two sequences by using the specified selector function.
         * @param collection The sequence to merge.
         * @param resultSelector A function that specifies how to merge the elements of two input sequences.
         * @returns An IEnumerable<TResult> that contains merged elements
         */
        public zip<TResult, TSecond>(collection: IEnumerable<TSecond>, resultSelector: (first: TSource, second: TSecond) => TResult): IEnumerable<TResult> {
            // TODO: Implement function
            return undefined;
        }
    }
}