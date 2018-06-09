// This is a special class that immitates a array/dictionary, and 
// yet has some special behaviour to make it look & act like any arbitrary aray value 
// is pre-initialized to 0. 
export class DefaultDict {
    // Actual key<->value pairs are stored in _dict
    private _dict: Object;

    // Set to true to print any access to defaultDict members
    private debugPrintDict: boolean = false;

    public DefaultDict()		// Constructor
    {
        this._dict = new Object();
        if (this.debugPrintDict) trace("Instantiating default dict class");
    }

    // used to determine status of the query 'name in defaultDict'. 
    // Since we want to *look* like have any arbitrary key, we always return true.
    public hasProperty(name: any): boolean {
        if (this.debugPrintDict) trace("hasProperty", name);
        return true;
    }

    // called when someone requests defaultDict[name] or defaultDict.name
    // we have a special case to override the query for defaultDict.length, since
    // that is used for determining how many flags the save/load mechanism iterates over.
    // I'm going to update that to properly iterating over each item in the save eventually
    // but this makes it work as a stop-gap measure
    public getProperty(name: any): any {
        if (this.debugPrintDict) trace("getProperty Called");
        if (name == "length") {
            if (this.debugPrintDict) trace("Querying array length. Faking out retVal");
            return 3000;
        }

        // If we have name as a key in _dict, return _dict[name]. Else, return 0
        if (name in this._dict) {
            if (this.debugPrintDict) trace("Flag " + name + " being accessed. Value = " + this._dict[name]);
            return this._dict[name];
        }
        else {
            if (this.debugPrintDict) trace("Unset Flag " + name + " being accessed.");
            return 0;
        }
    }

    // Overrides any attempt to set a class member or indice (defaultDict[name] = x or defaultDict.name = x)
    // If x == 0, it removes {name} from _dict if it's present, otherwise does nothing. Else, it sets _dict[name] = x
    public setProperty(name: any, value: any): void {
        if (value != 0) {
            if (this.debugPrintDict) trace("setProperty ", name, value);
            this._dict[name] = value;
        }
        else
            if (name in this._dict) {
                if (this.debugPrintDict) trace("setProperty " + name + " to " + value + " Deleting key");
                delete this._dict[name];
            }
            else
                if (this.debugPrintDict) trace("setProperty " + name + " to " + value + " Ignoring");
    }

    // callProperly is called when functions are called on instances of defaultDict, 
    // e.g. defaultDict.push(), etc...
    // Since we don't have an array length, per se, we just swallow instances of push.
    // otherwise, we just apply the called function name to _dict.
    public callProperty(methodName: any, ...args): any {
        if (this.debugPrintDict) trace("call Property ", methodName);
        if (String(methodName) == "push") {
            if (this.debugPrintDict) trace("Doing nothing (this ain't an array anymore!)");
        }
        else {
            var res: any;
            res = this._dict[methodName].apply(this._dict, args);
            return res;
        }
    }


    // you have to implement object management bits yourself, since unfortunately the proxy
    // object doesn't have default stuff you can just override where you want special behaviour
    // As such, the following functions just make defaultDict iterable, and manage removing 
    // things, etc...

    //public getIteratorObj():IIterator
    //{
    //	return IIterator(_dict);
    //
    //}

    public deleteProperty(name: any): boolean {
        if (this.debugPrintDict) trace("deleteProperty", name);
        return delete this._dict[name];
    }


    public nextName(index: number): string {
        if (this.debugPrintDict) trace("nextName", index);
        return String(index - 1);
    }

    public nextValue(index: number): any {
        if (this.debugPrintDict) trace("nextValue", index);
        return this._dict[index - 1];
    }

    public nextNameIndex(index: number): number {

        if (this.debugPrintDict) trace("nextNameIndex ", index);
        if (!(index in this._dict)) {
            if (this.debugPrintDict) trace("Returning 0");
            return 0;
        }
        return index + 1;
    }
}
