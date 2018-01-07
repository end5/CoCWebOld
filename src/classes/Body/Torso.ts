import Arms from './Arms';
import Balls from './Balls';
import Butt from './Butt';
import Chest from './Chest';
import Clit from './Clit';
import CockList from './CockList';
import Hips from './Hips';
import Legs from './Legs';
import Neck from './Neck';
import TailList from './TailList';
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
    public readonly tails: TailList;
    public readonly butt: Butt;
    public readonly cocks: CockList;
    public readonly balls: Balls;
    public readonly vaginas: SerializableList<Vagina>;
    public readonly clit: Clit;

    public constructor() {
        this.neck = new Neck();
        this.arms = new Arms();
        this.chest = new Chest();
        this.wings = new Wings();

        this.hips = new Hips();
        this.tails = new TailList();
        this.butt = new Butt();
        this.cocks = new CockList();
        this.balls = new Balls();
        this.vaginas = new SerializableList(new Vagina().deserialize);
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

    public deserialize(saveObject: Torso): Torso {
        const newTorso = new Torso();
        newTorso.neck.deserialize(saveObject.neck);
        newTorso.arms.deserialize(saveObject.arms);
        newTorso.chest.deserialize(saveObject.chest);
        newTorso.wings.deserialize(saveObject.wings);

        newTorso.hips.deserialize(saveObject.hips);
        newTorso.tails.deserialize(saveObject.tails);
        newTorso.butt.deserialize(saveObject.butt);
        newTorso.cocks.deserialize(saveObject.cocks);
        newTorso.balls.deserialize(saveObject.balls);
        newTorso.vaginas.deserialize(saveObject.vaginas);
        newTorso.clit.deserialize(saveObject.clit);
        return newTorso;
    }
}
