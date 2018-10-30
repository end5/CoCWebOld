import { EquipSlot } from './EquipSlot';
import { EquipSlotList } from './EquipSlotList';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { ListSerializer } from '../../Engine/Utilities/ListSerializer';
import { Character } from '../Character/Character';
import { EquipableItem } from '../Items/EquipableItem';
import { Piercing } from '../Items/Misc/Piercing';
import { ListMonitor } from '../Utilities/ListMonitor';
import { Cock } from '../Body/Cock';
import { BreastRow } from '../Body/BreastRow';
import { ObservingEquipSlot } from './ObservingEquipSlot';

type PiercingSlot = EquipSlot<Piercing>;
type CockPiercingSlot = ObservingEquipSlot<Piercing, Cock>;
type NipplePiercingSlot = ObservingEquipSlot<Piercing, BreastRow>;
type BreastRowMonitor = ListMonitor<BreastRow, NipplePiercingSlot, EquipSlotList<Piercing, NipplePiercingSlot>>;
type CockMonitor = ListMonitor<Cock, CockPiercingSlot, EquipSlotList<Piercing, CockPiercingSlot>>;

export class PiercingInventory implements ISerializable<PiercingInventory> {
    public readonly clit: PiercingSlot;
    public readonly ears: PiercingSlot;
    public readonly eyebrow: PiercingSlot;
    public readonly lip: PiercingSlot;
    public readonly nose: PiercingSlot;
    public readonly tongue: PiercingSlot;
    public readonly labia: PiercingSlot;

    public readonly nipples = new EquipSlotList<Piercing, NipplePiercingSlot>();
    public readonly cocks = new EquipSlotList<Piercing, CockPiercingSlot>();

    private nipplesMonitor: BreastRowMonitor;
    private cocksMonitor: CockMonitor;

    public constructor(character: Character) {
        this.clit = new EquipSlot(character);
        this.ears = new EquipSlot(character);
        this.eyebrow = new EquipSlot(character);
        this.lip = new EquipSlot(character);
        this.nose = new EquipSlot(character);
        this.tongue = new EquipSlot(character);
        this.labia = new EquipSlot(character);
        this.addEquipEffects();

        this.nipplesMonitor = new ListMonitor<BreastRow, NipplePiercingSlot, EquipSlotList<Piercing, NipplePiercingSlot>>(this.nipples, ObservingEquipSlot, character);
        this.cocksMonitor = new ListMonitor<Cock, CockPiercingSlot, EquipSlotList<Piercing, CockPiercingSlot>>(this.cocks, ObservingEquipSlot, character);
        character.body.chest.attach(this.nipplesMonitor);
        character.body.cocks.attach(this.cocksMonitor);
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
        this.clit.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.sens += 2;
        });
        this.eyebrow.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.tou -= 0.5;
        });
        this.lip.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.tou -= 0.5;
        });
        this.nose.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.str += 0.5;
        });
        this.tongue.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.sens += 1;
        });
        this.labia.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.sens += 1;
        });
    }

    public serialize(): object | undefined {
        return {
            clit: this.clit.serialize(),
            ears: this.ears.serialize(),
            eyebrow: this.eyebrow.serialize(),
            lip: this.lip.serialize(),
            nose: this.nose.serialize(),
            tongue: this.tongue.serialize(),
            labia: this.labia.serialize(),
            nipples: ListSerializer.serialize(this.nipples),
            cocks: ListSerializer.serialize(this.cocks)
        };
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
