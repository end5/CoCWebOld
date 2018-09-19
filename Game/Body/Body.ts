import { Arms } from './Arms';
import { Balls } from './Balls';
import { BreastRow } from './BreastRow';
import { Butt } from './Butt';
import { Chest } from './Chest';
import { Clit } from './Clit';
import { Cock } from './Cock';
import { Hips } from './Hips';
import { Neck } from './Neck';
import { Tail } from './Tail';
import { Vagina } from './Vagina';
import { Wings } from './Wings';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { ListSerializer } from '../../Engine/Utilities/ListSerializer';
import { ObservableList } from '../Utilities/ObservableList';
import { Skin } from './Skin';
import { Hair } from './Hair';
import { Ears } from './Ears';
import { Horns } from './Horns';
import { Face } from './Face';
import { Legs } from './Legs';
import { Eyes } from './Eyes';
import { Tongue } from './Tongue';
import { Beard } from './Beard';
import { Antennae } from './Antennae';

export class Body implements ISerializable<Body> {
    public readonly antennae = new Antennae();
    public readonly horns = new Horns();
    public readonly hair = new Hair();
    public readonly ears = new Ears();

    public readonly face = new Face();
    public readonly eyes = new Eyes();
    public readonly tongue = new Tongue();
    public readonly beard = new Beard();

    public readonly neck = new Neck();
    public readonly arms = new Arms();
    public readonly chest = new Chest();
    public readonly wings = new Wings();

    public readonly hips = new Hips();
    public readonly tails = new ObservableList<Tail>();
    public readonly butt = new Butt();
    public readonly cocks = new ObservableList<Cock>();
    public readonly balls = new Balls();
    public readonly vaginas = new ObservableList<Vagina>();
    public readonly clit = new Clit();
    public readonly legs = new Legs();

    public skin: Skin = new Skin();
    public tallness: number = 0;
    public thickness: number = 0;
    public tone: number = 0;
    private fem: number = 50;

    public get femininity(): number {
        if (this.fem > 100)
            this.fem = 100;

        return this.fem;
    }

    public set femininity(value: number) {
        if (value > 100)
            value = 100;
        else if (value < 0)
            value = 0;

        this.fem = value;
    }

    // Fertility is a % out of 100.
    public fertility: number = 10;
    public cumMultiplier: number = 1;

    public serialize(): object | undefined {
        return {
            antennae: this.antennae.serialize(),
            horns: this.horns.serialize(),
            hair: this.hair.serialize(),
            ears: this.ears.serialize(),
            face: this.face.serialize(),
            eyes: this.eyes.serialize(),
            tongue: this.tongue.serialize(),
            beard: this.beard.serialize(),
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
            clit: this.clit.serialize(),
            legs: this.legs.serialize(),
            skin: this.skin.serialize(),
            tallness: this.tallness,
            thickness: this.thickness,
            tone: this.tone,
            femininity: this.fem,
            fertility: this.fertility,
            cumMultiplier: this.cumMultiplier,
        };
    }

    public deserialize(saveObject: Body) {
        this.antennae.deserialize(saveObject.antennae);
        this.horns.deserialize(saveObject.horns);
        this.hair.deserialize(saveObject.hair);
        this.ears.deserialize(saveObject.ears);
        this.face.deserialize(saveObject.face);
        this.eyes.deserialize(saveObject.eyes);
        this.tongue.deserialize(saveObject.tongue);
        this.beard.deserialize(saveObject.beard);
        this.neck.deserialize(saveObject.neck);
        this.arms.deserialize(saveObject.arms);
        ListSerializer.deserialize(saveObject.chest, this.chest, BreastRow);
        this.wings.deserialize(saveObject.wings);
        this.hips.deserialize(saveObject.hips);
        ListSerializer.deserialize(saveObject.tails, this.tails, Tail);
        this.butt.deserialize(saveObject.butt);
        ListSerializer.deserialize(saveObject.cocks, this.cocks, Cock);
        this.balls.deserialize(saveObject.balls);
        ListSerializer.deserialize(saveObject.vaginas, this.vaginas, Vagina);
        this.clit.deserialize(saveObject.clit);
        this.legs.deserialize(saveObject.legs);
        this.skin.deserialize(saveObject.skin);
        this.tallness = saveObject.tallness;
        this.thickness = saveObject.thickness;
        this.tone = saveObject.tone;
        this.fem = saveObject.femininity;
        this.fertility = saveObject.fertility;
        this.cumMultiplier = saveObject.cumMultiplier;
    }
}
