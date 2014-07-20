/*
 * SYSTEM.TS
 * Copyright (c) 2014 Kaspar Fenner
 * spdx:MIT
 * https://spdx.org/licenses/MIT
 */

module system.collections {

    export class KeyValuePair<TKey, TValue> {

        constructor(public key: TKey, public value: TValue) { }

    }

    export class Dictionary<TKey, TValue> {
        private keys: List<TKey> = new List<TKey>();
        private values: List<TValue> = new List<TValue>();

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

        public retrieve(key: TKey): TValue {
            var index = this.keys.indexOf(key);
            if (index > -1) {
                return this.values.at(index);
            }
            else {
                return Dictionary.getDefaultVal<TValue>();
            }
        }

        public remove(key: TKey): TValue {
            var index = this.keys.indexOf(key);
            if (index > -1) {
                this.keys.removeAt(index);
                return this.values.removeAt(index);
            }
            else {
                return Dictionary.getDefaultVal<TValue>();
            }
        }

        public containsKey(key: TKey): boolean {
            return this.keys.indexOf(key) > -1;
        }

        public containsValue(value: TValue): boolean {
            return this.values.indexOf(value) > -1;
        }

        public getKeys(): IEnumerable<TKey> {
            return this.keys;
        }

        public getValues(): IEnumerable<TValue> {
            return this.values;
        }

        public length(): number {
            return this.keys.length();
        }

        private static getDefaultVal<TValue>(): TValue {
            // Little trick: Returns default value for non existing property in JavaScript
            return {}['____nonExistingProperty'];
        }
    }
}