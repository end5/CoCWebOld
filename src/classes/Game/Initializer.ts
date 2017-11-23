import PerkFactory from '../Effects/PerkFactory';
import StatusAffectFactory from '../Effects/StatusAffectFactory';
import ItemFactory from '../Items/ItemFactory';

export default class Initializer {
    public constructor() {
        new ItemFactory();
        new PerkFactory();
        new StatusAffectFactory();
    }
}