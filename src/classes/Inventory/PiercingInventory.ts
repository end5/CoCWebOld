import EquipSlot from './EquipSlot';
import EquipSlotList from './EquipSlotList';
import Character from '../Character/Character';
import EquipableItem from '../Items/EquipableItem';
import Piercing from '../Items/Misc/Piercing';
import ISerializable from '../Utilities/ISerializable';
import ListMonitor from '../Utilities/ListMonitor';
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
    public readonly clit: EquipSlot<Piercing>;
    public readonly ears: EquipSlot<Piercing>;
    public readonly eyebrow: EquipSlot<Piercing>;
    public readonly lip: EquipSlot<Piercing>;
    public readonly nose: EquipSlot<Piercing>;
    public readonly tongue: EquipSlot<Piercing>;
    public readonly labia: EquipSlot<Piercing>;

    public readonly nipples: EquipSlotList<Piercing>;
    public readonly cocks: EquipSlotList<Piercing>;

    private nipplesMonitor: ListMonitor;
    private cocksMonitor: ListMonitor;

    public constructor(character: Character) {
        this.character = character;
        this.clit = new EquipSlot(character);
        this.ears = new EquipSlot(character);
        this.eyebrow = new EquipSlot(character);
        this.lip = new EquipSlot(character);
        this.nose = new EquipSlot(character);
        this.tongue = new EquipSlot(character);
        this.labia = new EquipSlot(character);
        this.addEquipEffects();

        this.nipples = new EquipSlotList(character);
        this.cocks = new EquipSlotList(character);
        this.nipplesMonitor = new ListMonitor(this.nipples, EquipSlot, character);
        this.cocksMonitor = new ListMonitor(this.cocks, EquipSlot, character);
        character.torso.chest.attach(this.nipplesMonitor);
        character.torso.cocks.attach(this.cocksMonitor);
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
