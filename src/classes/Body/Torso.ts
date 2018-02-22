import Arms from './Arms';
import Balls from './Balls';
import BreastRow from './BreastRow';
import Butt from './Butt';
import Chest from './Chest';
import Clit from './Clit';
import Cock from './Cock';
import Hips from './Hips';
import Neck from './Neck';
import Tail from './Tail';
import Vagina from './Vagina';
import Wings from './Wings';
import ISerializable from '../Utilities/ISerializable';
import ListSerializer from '../Utilities/ListSerializer';
import ObservableList from '../Utilities/ObservableList';

export default class Torso implements ISerializable<Torso> {
    public readonly neck: Neck;
    public readonly arms: Arms;
    public readonly chest: Chest;
    public readonly wings: Wings;

    public readonly hips: Hips;
    public readonly tails: ObservableList<Tail>;
    public readonly butt: Butt;
    public readonly cocks: ObservableList<Cock>;
    public readonly balls: Balls;
    public readonly vaginas: ObservableList<Vagina>;
    public readonly clit: Clit;

    public constructor() {
        this.neck = new Neck();
        this.arms = new Arms();
        this.chest = new Chest();
        this.wings = new Wings();

        this.hips = new Hips();
        this.tails = new ObservableList();
        this.butt = new Butt();
        this.cocks = new ObservableList();
        this.balls = new Balls();
        this.vaginas = new ObservableList();
        this.clit = new Clit();
    }

    public serialize(): string {
        return JSON.stringify({
            neck: this.neck.serialize(),
            arms: this.arms.serialize(),
            chest: ListSerializer.serialize(this.chest),
            wings: this.wings.serialize(),
            hips: this.hips.serialize(),
            tails: ListSerializer.serialize(this.tails),
            butt: this.butt.serialize(),
            cocks: ListSerializer.serialize(this.cocks),
            balls: this.balls.serialize(),
            vaginas: ListSerializer.serialize(this.vaginas),
            clit: this.clit.serialize()
        });
    }

    public deserialize(saveObject: Torso) {
        this.neck.deserialize(saveObject.neck);
        this.arms.deserialize(saveObject.arms);
        this.wings.deserialize(saveObject.wings);
        this.hips.deserialize(saveObject.hips);
        this.butt.deserialize(saveObject.butt);
        this.balls.deserialize(saveObject.balls);
        this.clit.deserialize(saveObject.clit);
        ListSerializer.deserialize(saveObject.chest, this.chest, BreastRow);
        ListSerializer.deserialize(saveObject.cocks, this.cocks, Cock);
        ListSerializer.deserialize(saveObject.tails, this.tails, Tail);
        ListSerializer.deserialize(saveObject.vaginas, this.vaginas, Vagina);
    }
}
