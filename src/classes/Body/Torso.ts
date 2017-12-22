import Arms from './Arms';
import Balls from './Balls';
import Butt from './Butt';
import Chest from './Chest';
import CockSpot from './CockSpot';
import Creature from './Creature';
import Hips from './Hips';
import Legs from './Legs';
import Neck from './Neck';
import Tail from './Tail';
import VaginaSpot from './VaginaSpot';
import Wings from './Wings';
import SerializeInterface from '../SerializeInterface';
import SerializableList from '../Utilities/SerializableList';

export default class Torso implements SerializeInterface {
    public readonly neck: Neck;
    public readonly arms: Arms;
    public readonly chest: Chest;
    public wings: Wings;

    public readonly hips: Hips;
    public readonly tails: SerializableList<Tail>;
    public readonly butt: Butt;
    public readonly cocks: CockSpot;
    public readonly balls: Balls;
    public readonly vaginas: VaginaSpot;

    public constructor() {
        this.neck = new Neck();
        this.arms = new Arms();
        this.chest = new Chest();

        this.hips = new Hips();
        this.tails = new SerializableList(Tail);
        this.butt = new Butt();
        this.cocks = new CockSpot();
        this.balls = new Balls();
        this.vaginas = new VaginaSpot();
    }

    public serialize(): string {
        return JSON.stringify({
            neck: this.neck,
            arms: this.arms,
            chest: this.chest,
            wings: this.wings,
            hips: this.hips,
            tails: this.tails,
            butt: this.butt,
            cocks: this.cocks,
            balls: this.balls,
            vaginas: this.vaginas
        });
    }

    public deserialize(saveObject: Torso) {
        this.neck.deserialize(saveObject.neck);
        this.arms.deserialize(saveObject.arms);
        this.chest.deserialize(saveObject.chest);
        this.hips.deserialize(saveObject.hips);
        this.tails.deserialize(saveObject.tails);
        this.butt.deserialize(saveObject.butt);
        this.cocks.deserialize(saveObject.cocks);
        this.balls.deserialize(saveObject.balls);
        this.vaginas.deserialize(saveObject.vaginas);
        if (saveObject.wings) {
            if (!this.wings)
                this.wings = new Wings();
            this.wings.deserialize(saveObject.wings);
        }
    }
}