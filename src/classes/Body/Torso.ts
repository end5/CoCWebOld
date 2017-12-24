﻿import Arms from './Arms';
import Balls from './Balls';
import Butt from './Butt';
import Chest from './Chest';
import CockSpot from './CockSpot';
import Creature from './Creature';
import Hips from './Hips';
import Legs from './Legs';
import Neck from './Neck';
import Tail from './Tail';
import Vagina from './Vagina';
import Wings from './Wings';
import SerializeInterface from '../SerializeInterface';
import SerializableList from '../Utilities/SerializableList';

export default class Torso implements SerializeInterface {
    public readonly neck: Neck;
    public readonly arms: Arms;
    public readonly chest: Chest;
    public readonly wings: Wings;

    public readonly hips: Hips;
    public readonly tailSpot: SerializableList<Tail>;
    public readonly butt: Butt;
    public readonly cockSpot: CockSpot;
    public readonly balls: Balls;
    public readonly vaginaSpot: SerializableList<Vagina>;

    public constructor(creature: Creature) {
        this.neck = new Neck();
        this.arms = new Arms();
        this.chest = new Chest();
        this.wings = new Wings();

        this.hips = new Hips();
        this.tailSpot = new SerializableList(Tail);
        this.butt = new Butt();
        this.cockSpot = new CockSpot(creature);
        this.balls = new Balls();
        this.vaginaSpot = new SerializableList(Vagina);
    }

    public serialize(): string {
        return JSON.stringify({
            neck: this.neck.serialize(),
            arms: this.arms.serialize(),
            chest: this.chest.serialize(),
            wings: this.wings.serialize(),
            hips: this.hips.serialize(),
            tails: this.tailSpot.serialize(),
            butt: this.butt.serialize(),
            cockSpot: this.cockSpot.serialize(),
            balls: this.balls.serialize(),
            vaginas: this.vaginaSpot.serialize()
        });
    }

    public deserialize(saveObject: Torso) {
        this.neck.deserialize(saveObject.neck);
        this.arms.deserialize(saveObject.arms);
        this.chest.deserialize(saveObject.chest);
        this.wings.deserialize(saveObject.wings);

        this.hips.deserialize(saveObject.hips);
        this.tailSpot.deserialize(saveObject.tailSpot);
        this.butt.deserialize(saveObject.butt);
        this.cockSpot.deserialize(saveObject.cockSpot);
        this.balls.deserialize(saveObject.balls);
        this.vaginaSpot.deserialize(saveObject.vaginaSpot);
    }
}
