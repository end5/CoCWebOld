import NamedObject from "./Utilities/Component";

export default class KeyItem extends NamedObject {
	public value1: number;
	public value2: number;
	public value3: number;
    public value4: number;

    public constructor(name: string) {
        super(name);
	    this.value1 = 0;
        this.value2 = 0;
        this.value3 = 0;
        this.value4 = 0;
    }
}

