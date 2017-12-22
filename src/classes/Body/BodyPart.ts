import Creature from './Creature';

export default abstract class BodyPart {
    protected body: Creature;
    public constructor(creature: Creature) {
        this.body = creature;
    }
}