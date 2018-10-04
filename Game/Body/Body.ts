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
import { ModifiableStat } from './Stat/ModifiableStat';
import { Womb } from './Pregnancy/Womb';
import { Ovipositor } from './Pregnancy/Ovipositor';
import { ButtWomb } from './Pregnancy/ButtWomb';
import { IObserverList } from '../Utilities/IObserverList';

class VaginaObserver implements IObserverList<Vagina> {
    public constructor(
        private readonly body: Body,
        private readonly wombs: ObservableList<Womb>
    ) { }

    public onAdd(item: Vagina): void {
        this.wombs.add(new Womb(this.body));
    }

    public onRemove(index: number): void {
        this.wombs.remove(index);
    }

    public onClear(): void {
        this.wombs.clear();
    }

    public update(message: string): void { }
}

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

    public cumMultiplier: number = 0;
    private femStat = new ModifiableStat('femininity');

    public get femininity(): number {
        return this.femStat.value;
    }

    public set femininity(value: number) {
        this.femStat.value = value;
    }

    private fertStat = new ModifiableStat('fertility');

    public get fertility(): number {
        return this.fertStat.value;
    }

    public set fertility(value: number) {
        this.fertStat.value = value;
    }

    public wombs = new ObservableList<Womb>();
    public buttWomb = new ButtWomb(this);
    public ovipositor = new Ovipositor();

    public constructor() {
        this.femStat.value = 50;
        this.femStat.max = 100;
        this.femStat.min = 0;
        this.fertStat.value = 10;
        this.fertStat.max = 100;
        this.fertStat.min = 0;

        this.vaginas.attach(new VaginaObserver(this, this.wombs));
    }

    public update(hours: number) {
        for (let timeCountdown: number = 0; timeCountdown < hours; timeCountdown++) {
            for (const womb of this.wombs)
                womb.update();
            this.buttWomb.update();
        }
    }

    public serialize(): object {
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
            cumMultiplier: this.cumMultiplier,
            femStat: this.femStat.serialize(),
            fertStat: this.fertStat.serialize(),

            buttWomb: this.buttWomb.serialize(),
            wombs: ListSerializer.serialize(this.wombs),
            ovipositor: this.ovipositor.serialize()
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
        this.cumMultiplier = saveObject.cumMultiplier;
        this.femStat.deserialize(saveObject.femStat);
        this.fertStat.deserialize(saveObject.fertStat);

        this.buttWomb.deserialize(saveObject.buttWomb);
        ListSerializer.deserialize(saveObject.wombs, this.wombs, Womb);
        this.ovipositor.deserialize(saveObject.ovipositor);
    }
}
