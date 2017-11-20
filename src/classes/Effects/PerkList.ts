import Perk from './Perk';
import PerkFactory from './PerkFactory';
import { PerkType } from './PerkType';
import ComponentList from '../Utilities/ComponentList';

export default class PerkList extends ComponentList<Perk, PerkType> {
    public serialize(): string {
        let saveObject = {};
        this.iterate((item: Perk) => {
            saveObject[item.uniqueKey] = item.serialize();
        });
        return JSON.stringify(saveObject);
    }
    
    public deserialize(saveObject: object) {
        this.clear();
        for (const key of Object.keys(saveObject)) {
            const newPerk = PerkFactory.create(saveObject[key]["type"]);
            newPerk.deserialize(saveObject[key]);
            this.add(newPerk);
        }
    }
}