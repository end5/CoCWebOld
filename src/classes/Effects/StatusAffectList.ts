import StatusAffect from './StatusAffect';
import StatusAffectFactory from './StatusAffectFactory';
import ComponentList from '../Utilities/ComponentList';

export default class StatusAffectList extends ComponentList<StatusAffect> {
    public serialize(): string {
        let saveObject = {};
        this.iterate((item: StatusAffect) => {
            saveObject[item.uniqueKey] = item.serialize();
        });
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