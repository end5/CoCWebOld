import EquipmentSlot from './EquipmentSlot';
import ListObserverEquipmentList from './ListObserverEquipmentList';
import BreastRow from '../Body/BreastRow';
import Cock from '../Body/Cock';
import Character from '../Character/Character';
import EquipableItem from '../Items/EquipableItem';
import Piercing from '../Items/Misc/Piercing';
import ISerializable from '../Utilities/ISerializable';
import ListSerializer from '../Utilities/ListSerializer';

export enum PiercingSlot {
    Clit,
    Dick,
    Ears,
    Eyebrow,
    Lip,
    Nipples,
    Nose,
    Tongue,
    Vulva
}

export default class PiercingInventory implements ISerializable<PiercingInventory> {
    private character: Character;
    public readonly clit: EquipmentSlot<Piercing>;
    public readonly ears: EquipmentSlot<Piercing>;
    public readonly eyebrow: EquipmentSlot<Piercing>;
    public readonly lip: EquipmentSlot<Piercing>;
    public readonly nose: EquipmentSlot<Piercing>;
    public readonly tongue: EquipmentSlot<Piercing>;
    public readonly labia: EquipmentSlot<Piercing>;

    public readonly nipples: ListObserverEquipmentList<BreastRow, Piercing>;
    public readonly cocks: ListObserverEquipmentList<Cock, Piercing>;

    public constructor(character: Character) {
        this.character = character;
        this.clit = new EquipmentSlot(character);
        this.ears = new EquipmentSlot(character);
        this.eyebrow = new EquipmentSlot(character);
        this.lip = new EquipmentSlot(character);
        this.nose = new EquipmentSlot(character);
        this.tongue = new EquipmentSlot(character);
        this.labia = new EquipmentSlot(character);
        this.addEquipEffects();

        this.nipples = new ListObserverEquipmentList(character, character.torso.chest);
        this.cocks = new ListObserverEquipmentList(character, character.torso.cocks);
    }

    // 0) **Clit (+2 sens)
    // 1) **Dick (+2 lib) adds the word 'pierced' sometimes to the description
    // 2) **Ears
    // 3) **Eyebrow (-.5 def)
    // 4) **Lip (-.5 def)
    // 5) **Nipples (+1 sens, +1 lib)
    // 6) **Nose (+.5 attack)
    // 7) **Tongue (+1 sens)
    // 8) **Labia (+1 sens)

    private addEquipEffects() {
        this.clit.addEquipEffect((item: EquipableItem, char: Character) => {
            char.stats.sens += 2;
        });
        this.eyebrow.addEquipEffect((item: EquipableItem, char: Character) => {
            char.stats.tou -= 0.5;
        });
        this.lip.addEquipEffect((item: EquipableItem, char: Character) => {
            char.stats.tou -= 0.5;
        });
        this.nose.addEquipEffect((item: EquipableItem, char: Character) => {
            char.stats.str += 0.5;
        });
        this.tongue.addEquipEffect((item: EquipableItem, char: Character) => {
            char.stats.sens += 1;
        });
        this.labia.addEquipEffect((item: EquipableItem, char: Character) => {
            char.stats.sens += 1;
        });
    }

    public serialize(): string {
        return JSON.stringify({
            clit: this.clit.serialize(),
            ears: this.ears.serialize(),
            eyebrow: this.eyebrow.serialize(),
            lip: this.lip.serialize(),
            nose: this.nose.serialize(),
            tongue: this.tongue.serialize(),
            labia: this.labia.serialize(),
            nipples: ListSerializer.serialize(this.nipples),
            cocks: ListSerializer.serialize(this.cocks)
        });
    }

    public deserialize(saveObject: PiercingInventory) {
        this.clit.deserialize(saveObject.clit);
        this.ears.deserialize(saveObject.ears);
        this.eyebrow.deserialize(saveObject.eyebrow);
        this.lip.deserialize(saveObject.lip);
        this.nose.deserialize(saveObject.nose);
        this.tongue.deserialize(saveObject.tongue);
        this.labia.deserialize(saveObject.labia);
        ListSerializer.deserialize(saveObject.nipples, this.nipples);
        ListSerializer.deserialize(saveObject.cocks, this.cocks);
    }
}
