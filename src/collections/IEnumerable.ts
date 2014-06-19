/*
 * systemts
 * Author: Kaspar Fenner
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */

module system.collections {

    /**
     * An interface for element collections with methods for querying objects and performing actions.
     */
    export interface IEnumerable<TSource> {

        /**
         * Determines whether all elements of a sequence satisfy a condition.
         * @param predicate A function to test each element for a condition.
         * @returns true if every element of the sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, false.
         */
        all(predicate: (element: TSource) => boolean): boolean;

        /**
         * Determines whether any element of a sequence satisfies a condition.
         * @param predicate A function to test each element for a condition.
         * @returns true if any elements in the sequence pass the test in the specified predicate; otherwise, false.
         */
        any(predicate: (element: TSource) => boolean): boolean;

        /**
         * Performs the specified action on each element of the collection.
         * @param action The action to perform on each element of the list.
         */
        each(action: (value: TSource, index?: number) => void): void;

        /**
         * Returns the first element of a sequence.
         * @returns The first element in the sequence.
         */
        first(): TSource;

        /**
         * Returns the first element in a sequence that satisfies a specified condition.
         * @param predicate A function to test each element for a condition.
         * @returns The first element in the sequence that passes the test in the specified predicate function.
         */
        first(predicate: (element: TSource) => boolean): TSource;

        /**
         * Performs the specified action on each element of the collection starting with the last element until the specified action returns false.
         * @param action The action to perform on each element of the list until it returns false.
         */
        fromLastUntil(action: (value: TSource, index?: number) => any): void;

        /**
         * Returns the last element of a sequence.
         * @returns The last element in the sequence.
         */
        last(): TSource;

        /**
         * Returns the last element in a sequence that satisfies a specified condition.
         * @param predicate A function to test each element for a condition.
         * @returns The last element in the sequence that passes the test in the specified predicate function.
         */
        last(predicate: (element: TSource) => boolean): TSource;

        /**
         * Returns the number of elements in a sequence.
         * @returns The number of elements in the sequence.
         */
        length(): number;

        /**
         * Inverts the order of the elements in a sequence.
         * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
         */
        reverse(): IEnumerable<TSource>;

        /**
         * Projects each element of a sequence into a new form.
         * @param selector A transform function to apply to each element.
         * @returns An IEnumerable<TResult> whose elements are the result of invoking the transform function on each element of source.
         */
        select<TResult>(selector: (element: TSource) => TResult): IEnumerable<TResult>;

        /**
         * Creates an array from the sequence.
         * @returns An array that contains the elements from the input sequence.
         */
        toArray(): Array<TSource>;

        /**
         * Performs the specified action on each element of the collection until the specified action returns false.
         * @param action The action to perform on each element of the list until it returns false.
         */
        until(action: (value: TSource, index?: number) => any): void;

        /**
         * Filters a sequence of values based on a predicate.
         * @param predicate A function to test each element for a condition.
         * @returns An IEnumerable<TSource> that contains elements from the input sequence that satisfy the condition.
         */
        where(predicate: (element: TSource) => boolean): IEnumerable<TSource>;

        /**
         * Merges two sequences by using the specified selector function.
         * @param collection The sequence to merge.
         * @param resultSelector A function that specifies how to merge the elements of two input sequences.
         * @returns An IEnumerable<TResult> that contains merged elements
         */
        zip<TResult, TSecond>(collection: IEnumerable<TSecond>, resultSelector: (first: TSource, second: TSecond) => TResult): IEnumerable<TResult>;
    }
}