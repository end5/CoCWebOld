import MaterialName from './MaterialName';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Item from '../Item';
import ItemDesc from '../ItemDesc';
import ItemType from '../ItemType';

export default class Material extends Item {
    private readonly useDesc: string;
    constructor(name: MaterialName, desc: ItemDesc, useText?: string, value?: number) {
        super(name, ItemType.Material, desc, value);
        this.useDesc = useText;
    }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character) { }

    public useText(character: Character) {
        DisplayText(this.useDesc);
    }
}
