import ButtWomb from './ButtWomb';
import Womb from './Womb';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';
import UpdateInterface from '../../UpdateInterface';
import IObserverList from '../../Utilities/IObserverList';
import ISerializable from '../../Utilities/ISerializable';
import SerializableList from '../../Utilities/SerializableList';
import Creature from '../Creature';
import Vagina from '../Vagina';

export default class PregnancyManager implements UpdateInterface, ISerializable<PregnancyManager> {
    protected body: Creature;
    public readonly buttWomb: ButtWomb;
    public readonly womb: Womb;

    public constructor(body: Creature) {
        this.body = body;
        this.womb = new Womb(body);
        this.buttWomb = new ButtWomb(body);
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
            wombs: this.womb.serialize()
        });
    }

    public deserialize(saveObject: PregnancyManager) {
        this.buttWomb.deserialize(saveObject.buttWomb);
        this.womb.deserialize(saveObject.womb);
    }
}
