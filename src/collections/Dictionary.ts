/*
 * SYSTEM.TS
 * Copyright (c) 2014 Kaspar Fenner
 * spdx:MIT
 * https://spdx.org/licenses/MIT
 */

module system.collections {

    /**
     * Represents a key-value pair.
     */
    export class KeyValuePair<TKey, TValue> {

        constructor(public key: TKey, public value: TValue) { }

    }
    
    /**
     * Represents a strongly typed dictionary (also called map) to store key-value pairs.
     */
    export class Dictionary<TKey, TValue> implements IEnumerable<KeyValuePair<TKey, TValue>> {
        private keys: List<TKey> = new List<TKey>();
        private values: List<TValue> = new List<TValue>();

        /**
         * Determines whether all elements of a sequence satisfy a condition.
         * @param predicate A function to test each element for a condition.
         * @returns true if every element of the sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, false.
         */
        public all(predicate: (element: KeyValuePair<TKey, TValue>) => boolean): boolean {
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
        public any(predicate: (element: KeyValuePair<TKey, TValue>) => boolean): boolean {
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
         * Returns whether the key exists in the dictionary.
         * @returns True if the key exists; Otherwise, false.
         */
        public containsKey(key: TKey): boolean {
            return this.keys.indexOf(key) > -1;
        }

        /**
         * Returns whether the value exists in the dictionary.
         * @returns True if the value exists; Otherwise, false.
         */
        public containsValue(value: TValue): boolean {
            return this.values.indexOf(value) > -1;
        }

        /**
         * Performs the specified action on each element of the collection.
         * @param action The action to perform on each element of the list.
         */
        public each(action: (value: KeyValuePair<TKey, TValue>, index?: number) => void): void {
            for (var i = 0; i < this.length(); i += 1) {
                action(new KeyValuePair(this.keys.at(i), this.values.at(i)));
            }
        }

        /**
         * Returns the first element of a sequence.
         * @returns The first element in the sequence.
         */
        public first(): KeyValuePair<TKey, TValue>;

        /**
         * Returns the first element in a sequence that satisfies a specified condition.
         * @param predicate A function to test each element for a condition.
         * @returns The first element in the sequence that passes the test in the specified predicate function.
         */
        public first(predicate: (element: KeyValuePair<TKey, TValue>) => boolean): KeyValuePair<TKey, TValue>;

        // Actual implementation
        public first(predicate?: (element: KeyValuePair<TKey, TValue>) => boolean): KeyValuePair<TKey, TValue> {
            if (predicate) {
                var result: KeyValuePair<TKey, TValue>;
                this.until((ele) => {
                    if (predicate(ele)) {
                        result = ele;
                        return false;
                    }
                });
                return result;
            }
            else {
                return this.isEmpty() ? Dictionary.getUndefinedKeyValue<TKey, TValue>() : new KeyValuePair(this.keys.at(0), this.values.at(0));
            }
        }

        /**
         * Returns the first element of a sequence or a default value if the sequence contains no elements.
         * @returns The first element in the sequence or a default value if the sequence is empty.
         */
        public firstOrDefault(defaultValue: KeyValuePair<TKey, TValue>): KeyValuePair<TKey, TValue>;

        /**
         * Returns the first element of a sequence that satisfies a specified condition or a default value if no such element is found.
         * @returns The first element in the sequence or a default value if no such element is found.
         */
        public firstOrDefault(predicate: (element: KeyValuePair<TKey, TValue>) => boolean, defaultValue: KeyValuePair<TKey, TValue>): KeyValuePair<TKey, TValue>;

        // Actual implementation
        public firstOrDefault(predicateOrDefaultValue: any, defaultValue?: KeyValuePair<TKey, TValue>): KeyValuePair<TKey, TValue> {
            if (typeof defaultValue === "undefined") {
                return this.isEmpty() ? predicateOrDefaultValue : new KeyValuePair(this.keys.at(0), this.values.at(0));
            }
            else {
                var result: KeyValuePair<TKey, TValue> = defaultValue;
                this.until((ele) => {
                    if (predicateOrDefaultValue(ele)) {
                        result = ele;
                        return false;
                    }
                });
                return result;
            }
        }

        /**
         * Performs the specified action on each element of the collection starting with the last element until the specified action returns false.
         * @param action The action to perform on each element of the list until it returns false.
         */
        public fromLastUntil(action: (value: KeyValuePair<TKey, TValue>, index?: number) => any): void {
            for (var i = this.length() - 1; i >= 0; i -= 1) {
                if (action(new KeyValuePair(this.keys.at(i), this.values.at(i)), i) === false) {
                    return;
                }
            }
        }

        /**
         * Returns the keys stored in the dictionary.
         * @returns The keys stored in the dictionary.
         */
        public getKeys(): IEnumerable<TKey> {
            return this.keys;
        }

        /**
         * Returns the values stored in the dictionary.
         * @returns The values stored in the dictionary.
         */
        public getValues(): IEnumerable<TValue> {
            return this.values;
        }

        /**
         * Returns whether the sequence contains elements.
         * @returns True if the sequence contains no elements; Otherwise, false.
         */
        public isEmpty(): boolean {
            return this.length() === 0;
        }

        /**
         * Returns the last element of a sequence.
         * @returns The last element in the sequence.
         */
        public last(): KeyValuePair<TKey, TValue>;

        /**
         * Returns the last element in a sequence that satisfies a specified condition.
         * @param predicate A function to test each element for a condition.
         * @returns The last element in the sequence that passes the test in the specified predicate function.
         */
        public last(predicate: (element: KeyValuePair<TKey, TValue>) => boolean): KeyValuePair<TKey, TValue>;

        // Actual implementation
        public last(predicate?: (element: KeyValuePair<TKey, TValue>) => boolean): KeyValuePair<TKey, TValue> {
            if (predicate) {
                var result: KeyValuePair<TKey, TValue>;
                this.fromLastUntil((ele) => {
                    if (predicate(ele)) {
                        result = ele;
                        return false;
                    }
                });
                return result;
            }
            else {
                return this.isEmpty() ? Dictionary.getUndefinedKeyValue<TKey, TValue>() : new KeyValuePair(this.keys.at(this.length() - 1), this.values.at(this.length() - 1));
            }
        }

        /**
         * Returns the last element of a sequence or a default value if the sequence contains no elements.
         * @returns The last element in the sequence or a default value if the sequence is empty.
         */
        public lastOrDefault(defaultValue: KeyValuePair<TKey, TValue>): KeyValuePair<TKey, TValue>;

        /**
         * Returns the last element of a sequence that satisfies a specified condition or a default value if no such element is found.
         * @returns The last element in the sequence or a default value if no such element is found.
         */
        public lastOrDefault(predicate: (element: KeyValuePair<TKey, TValue>) => boolean, defaultValue: KeyValuePair<TKey, TValue>): KeyValuePair<TKey, TValue>;

        // Actual implementation
        public lastOrDefault(predicateOrDefaultValue: any, defaultValue?: KeyValuePair<TKey, TValue>): KeyValuePair<TKey, TValue> {
            if (typeof defaultValue === "undefined") {
                return this.isEmpty() ? predicateOrDefaultValue : new KeyValuePair(this.keys.at(this.length() - 1), this.values.at(this.length() - 1));
            }
            else {
                var result: KeyValuePair<TKey, TValue> = defaultValue;
                this.fromLastUntil((ele) => {
                    if (predicateOrDefaultValue(ele)) {
                        result = ele;
                        return false;
                    }
                });
                return result;
            }
        }

        /**
         * Returns the number of elements in a sequence.
         * @returns The number of elements in the sequence.
         */
        public length(): number {
            return this.keys.length();
        }

        /**
         * Adds the specified key and value to the dictionary.
         * @key The key under which to store the value.
         * @value The value to be stored for the specified key.
         */
        public put(key: TKey, value: TValue): void {
            var index = this.keys.indexOf(key);
            if (index > -1) {
                this.values.put(index, value);
            }
            else {
                this.keys.add(key);
                this.values.add(value);
            }
        }
        
        /**
         * Removes the element from the dictionary.
         * @key The key of the element to be removed.
         * @returns The element which has been removed from the dictionary.
         */
        public remove(key: TKey): TValue {
            var index = this.keys.indexOf(key);
            if (index > -1) {
                this.keys.removeAt(index);
                return this.values.removeAt(index);
            }
            else {
                return Dictionary.getUndefinedValue<TValue>();
            }
        }
        
        /**
         * Retrieves the element from the dictionary.
         * @key The key of the element to be retrieved.
         * @returns The element which is stored under the specified key.
         */
        public retrieve(key: TKey): TValue {
            var index = this.keys.indexOf(key);
            if (index > -1) {
                return this.values.at(index);
            }
            else {
                return Dictionary.getUndefinedValue<TValue>();
            }
        }

        /**
         * Inverts the order of the elements in a sequence.
         * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
         */
        public reverse(): IEnumerable<KeyValuePair<TKey, TValue>> {
            return this.toList().reverse();
        }

        /**
         * Projects each element of a sequence into a new form.
         * @param selector A transform function to apply to each element.
         * @returns An IEnumerable<TResult> whose elements are the result of invoking the transform function on each element of source.
         */
        public select<TResult>(selector: (element: KeyValuePair<TKey, TValue>) => TResult): IEnumerable<TResult> {
            return new ReadOnlyCollection(this.toArray().map(selector));
        }

        /**
         * Creates an array from the sequence.
         * @returns An array that contains the elements from the input sequence.
         */
        public toArray(): Array<KeyValuePair<TKey, TValue>> {
            return this.toList().toArray();
        }

        /**
         * Creates a List of key-value pairs from the sequence.
         * @returns A List that contains the key-value pairs from the input sequence.
         */
        public toList(): List<KeyValuePair<TKey, TValue>> {
            var result = new List<KeyValuePair<TKey, TValue>>();
            for (var i = 0; i < this.length(); i += 1) {
                result.add(new KeyValuePair(this.keys.at(i), this.values.at(i)));
            }
            return result;
        }

        /**
         * Performs the specified action on each element of the collection until the specified action returns false.
         * @param action The action to perform on each element of the list until it returns false.
         */
        public until(action: (value: KeyValuePair<TKey, TValue>, index?: number) => any): void {
            for (var i = 0; i < this.length(); i += 1) {
                if (action(new KeyValuePair(this.keys.at(i), this.values.at(i)), i) === false) {
                    return;
                }
            }
        }

        /**
         * Filters a sequence of values based on a predicate.
         * @param predicate A function to test each element for a condition.
         * @returns An IEnumerable<TSource> that contains elements from the input sequence that satisfy the condition.
         */
        public where(predicate: (element: KeyValuePair<TKey, TValue>) => boolean): IEnumerable<KeyValuePair<TKey, TValue>> {
            return new ReadOnlyCollection(this.toArray().filter(predicate));
        }

        /**
         * Merges two sequences by using the specified selector function.
         * @param collection The sequence to merge.
         * @param resultSelector A function that specifies how to merge the elements of two input sequences.
         * @returns An IEnumerable<TResult> that contains merged elements
         */
        public zip<TResult, TSecond>(collection: IEnumerable<TSecond>, resultSelector: (first: KeyValuePair<TKey, TValue>, second: TSecond, index?: number) => TResult): IEnumerable<TResult> {
            var result = new List<TResult>();
            var arr2 = collection.toArray();
            var stop = Math.max(this.length(), collection.length());
            for (var i = 0; i < stop; i += 1) {
                result.add(resultSelector(i < this.length() ? new KeyValuePair(this.keys.at(i), this.values.at(i)) : Dictionary.getUndefinedKeyValue<TKey, TValue>(), arr2[i], i));
            }
            return result;
        }

        private static getUndefinedValue<TValue>(): TValue {
            // Little trick: Returns default value for non existing property in JavaScript
            return {}['____nonExistingProperty'];
        }

        private static getUndefinedKeyValue<TKey, TValue>(): KeyValuePair<TKey, TValue> {
            // Little trick: Returns default value for non existing property in JavaScript
            return {}['____nonExistingProperty'];
        }
    }
}