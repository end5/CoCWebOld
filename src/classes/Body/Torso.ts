import Arms from './Arms';
import Balls from './Balls';
import Butt from './Butt';
import Chest from './Chest';
import Clit from './Clit';
import Cock from './Cock';
import Hips from './Hips';
import Legs from './Legs';
import Neck from './Neck';
import Tail from './Tail';
import Vagina from './Vagina';
import Wings from './Wings';
import ISerializable from '../Utilities/ISerializable';
import SerializableList from '../Utilities/SerializableList';

export default class Torso implements ISerializable<Torso> {
    public readonly neck: Neck;
    public readonly arms: Arms;
    public readonly chest: Chest;
    public readonly wings: Wings;

    public readonly hips: Hips;
    public readonly tails: SerializableList<Tail>;
    public readonly butt: Butt;
    public readonly cocks: SerializableList<Cock>;
    public readonly balls: Balls;
    public readonly vaginas: SerializableList<Vagina>;
    public readonly clit: Clit;

    public constructor() {
        this.neck = new Neck();
        this.arms = new Arms();
        this.chest = new Chest();
        this.wings = new Wings();

        this.hips = new Hips();
        this.tails = new SerializableList(Tail);
        this.butt = new Butt();
        this.cocks = new SerializableList(Cock);
        this.balls = new Balls();
        this.vaginas = new SerializableList(Vagina);
        this.clit = new Clit();
    }

    public serialize(): string {
        return JSON.stringify({
            neck: this.neck.serialize(),
            arms: this.arms.serialize(),
            chest: this.chest.serialize(),
            wings: this.wings.serialize(),
            hips: this.hips.serialize(),
            tails: this.tails.serialize(),
            butt: this.butt.serialize(),
            cockSpot: this.cocks.serialize(),
            balls: this.balls.serialize(),
            vaginas: this.vaginas.serialize(),
            clit: this.clit.serialize()
        });
    }

    public deserialize(saveObject: Torso) {
        this.neck.deserialize(saveObject.neck);
        this.arms.deserialize(saveObject.arms);
        this.chest.deserialize(saveObject.chest);
        this.wings.deserialize(saveObject.wings);

        this.hips.deserialize(saveObject.hips);
        this.tails.deserialize(saveObject.tails);
        this.butt.deserialize(saveObject.butt);
        this.cocks.deserialize(saveObject.cocks);
        this.balls.deserialize(saveObject.balls);
        this.vaginas.deserialize(saveObject.vaginas);
        this.clit.deserialize(saveObject.clit);
    }
}
