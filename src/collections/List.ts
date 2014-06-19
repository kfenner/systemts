﻿/*
 * systemts
 * Author: Kaspar Fenner
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */

module system.collections {

    /**
     * Represents a strongly typed list of objects that can be accessed by index.
     */
    export class List<TSource> implements IEnumerable<TSource> {
        private container: Array<TSource> = new Array<TSource>();
        private readonly: ReadOnlyCollection<TSource> = new ReadOnlyCollection(this.container);

        /**
         * Adds an object to the end of the list.
         * @param item The object to be added to the end of the list.
         */
        public add(item: TSource): void {
            this.container.push(item);
        }

        /**
         * Adds the elements of the specified collection to the end of the list.
         * @param collection The collection whose elements should be added to the end of the list.
         */
        public addRange(collection: IEnumerable<TSource>): void;
        /**
         * Adds the elements of the specified collection to the end of the list.
         * @param collection The collection whose elements should be added to the end of the list.
         */
        public addRange(collection: Array<TSource>): void
        // Actual implementation
        public addRange(collection: any): void {
            (<IEnumerable<TSource>>collection).each((v) => this.add(v));
        }

        /**
         * Returns the element at the specified position.
         */
        public at(index: number): TSource {
            return this.container[index];
        }

        /**
         * Returns the index of the first occurence of the specified item in the list.
         * Returns -1 if the value is not found.
         */
        public indexOf(item: TSource): number {
            return this.container.indexOf(item);
        }

        /**
         * Replaces the element at the specified position in this list with the specified element.
         */
        public put(index: number, item: TSource): void {
            this.container[index] = item;
        }

        /**
         * Removes the first occurence of the item in the list.
         */
        public remove(item: TSource): void {
            var i;
            if ((i = this.container.indexOf(item)) !== -1) {
                this.container.splice(i, 1);
            }
        }

        /**
         * Removes all instances of the specified item.
         */
        public removeAll(item: TSource): void {
            var i;
            while ((i = this.container.indexOf(item)) !== -1) {
                this.container.splice(i, 1);
            }
        }

        /**
         * Removes the element at the specified position in the list and returns it.
         * @returns The removed item.
         */
        public removeAt(index: number): TSource {
            return this.container.splice(index, 1)[0];
        }

        /**
         * Determines whether all elements of a sequence satisfy a condition.
         * @param predicate A function to test each element for a condition.
         * @returns true if every element of the sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, false.
         */
        public all(predicate: (element: TSource) => boolean): boolean {
            return this.readonly.all(predicate);
        }

        /**
         * Determines whether any element of a sequence satisfies a condition.
         * @param predicate A function to test each element for a condition.
         * @returns true if any elements in the sequence pass the test in the specified predicate; otherwise, false.
         */
        public any(predicate: (element: TSource) => boolean): boolean {
            return this.readonly.any(predicate);
        }

        /**
         * Removes all elements from the List<T>.
         */
        public clear(): void {
            this.container.length = 0;
        }

        /**
         * Performs the specified action on each element of the collection.
         * @param action The action to perform on each element of the list.
         */
        public each(action: (value: TSource, index?: number) => void): void {
            this.readonly.each(action);
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
            return this.readonly.first(predicate);
        }

        /**
         * Performs the specified action on each element of the collection starting with the last element until the specified action returns false.
         * @param action The action to perform on each element of the list until it returns false.
         */
        public fromLastUntil(action: (value: TSource, index?: number) => any): void {
            this.readonly.fromLastUntil(action);
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
            return undefined;
        }

        /**
         * Returns the number of elements in a sequence.
         * @returns The number of elements in the sequence.
         */
        public length(): number {
            return this.container.length;
        }

        /**
         * Inverts the order of the elements in a sequence.
         * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
         */
        public reverse(): IEnumerable<TSource> {
            return this.readonly.reverse();
        }

        /**
         * Projects each element of a sequence into a new form.
         * @param selector A transform function to apply to each element.
         * @returns An IEnumerable<TResult> whose elements are the result of invoking the transform function on each element of source.
         */
        public select<TResult>(selector: (element: TSource) => TResult): IEnumerable<TResult> {
            return this.readonly.select(selector);;
        }

        /**
         * Creates an array from the sequence.
         * @returns An array that contains the elements from the input sequence.
         */
        public toArray(): Array<TSource> {
            return this.container;
        }

        /**
         * Performs the specified action on each element of the collection until the specified action returns false.
         * @param action The action to perform on each element of the list until it returns false.
         */
        public until(action: (value: TSource, index?: number) => any): void {
            this.readonly.until(action);
        }

        /**
         * Filters a sequence of values based on a predicate.
         * @param predicate A function to test each element for a condition.
         * @returns An IEnumerable<TSource> that contains elements from the input sequence that satisfy the condition.
         */
        public where(predicate: (element: TSource) => boolean): IEnumerable<TSource> {
            return this.readonly.where(predicate);
        }

        /**
         * Merges two sequences by using the specified selector function.
         * @param collection The sequence to merge.
         * @param resultSelector A function that specifies how to merge the elements of two input sequences.
         * @returns An IEnumerable<TResult> that contains merged elements
         */
        public zip<TResult, TSecond>(collection: IEnumerable<TSecond>, resultSelector: (first: TSource, second: TSecond) => TResult): IEnumerable<TResult> {
            return this.readonly.zip(collection, resultSelector);
        }
    }
}