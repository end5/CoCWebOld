import StatusAffect from './StatusAffect';
import StatusAffectFactory from './StatusAffectFactory';
import { StatusAffectType } from './StatusAffectType';
import ComponentList from '../Utilities/ComponentList';

export default class StatusAffectList extends ComponentList<StatusAffect, StatusAffectType> {
    public serialize(): string {
        let saveObject = {};
        for(let index = 0; index < this.count(); index++) {
            let statusAffect = this.at(index);
            saveObject[statusAffect.uniqueKey] = statusAffect.serialize();
        }
        return JSON.stringify(saveObject);
    }

    public deserialize(saveObject: object) {
        this.clear();
        for (const key of Object.keys(saveObject)) {
            const newStatusAffect = StatusAffectFactory.create(saveObject[key]["type"]);
            newStatusAffect.deserialize(saveObject[key]);
            this.add(newStatusAffect);
        }
    }
}