import ButtWomb from './ButtWomb';
import Ovipositor from './Ovipositor';
import Womb from './Womb';
import DisplayText from '../../display/DisplayText';
import UpdateInterface from '../../UpdateInterface';
import ISerializable from '../../Utilities/ISerializable';
import Creature from '../Creature';

export default class PregnancyManager implements UpdateInterface, ISerializable<PregnancyManager> {
    protected body: Creature;
    public readonly buttWomb: ButtWomb;
    public readonly womb: Womb;
    public readonly ovipositor: Ovipositor;

    public constructor(body: Creature) {
        this.body = body;
        this.womb = new Womb(body);
        this.buttWomb = new ButtWomb(body);
        this.ovipositor = new Ovipositor();
    }

    public update(hours: number) {
        for (let timeCountdown: number = 0; timeCountdown < hours; timeCountdown++) {
            this.buttWomb.update();
            this.womb.update();
        }
    }

    public serialize(): string {
        return JSON.stringify({
            buttWomb: this.buttWomb.serialize(),
            wombs: this.womb.serialize(),
            ovipositor: this.ovipositor.serialize()
        });
    }

    public deserialize(saveObject: PregnancyManager) {
        this.buttWomb.deserialize(saveObject.buttWomb);
        this.womb.deserialize(saveObject.womb);
        this.ovipositor.deserialize(saveObject.ovipositor);
    }
}
