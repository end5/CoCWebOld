import Cock, { CockType } from './Cock';
import Creature from './Creature';
import { PerkType } from '../Effects/PerkType';
import SerializeInterface from '../SerializeInterface';
import SerializableList from '../Utilities/SerializableList';

export default class CockSpot extends SerializableList<Cock> {
    private creature: Creature;
    public constructor(creature: Creature) {
        super(Cock);
        this.creature = creature;
    }
    
    public remove(index: number): void {
        if (index >= 0 && index < this.list.length) {
            const cock = this.list[index];
            if (cock.sock == "viridian") {
                this.creature.perks.remove(PerkType.LustyRegeneration);
            }
            else if (cock.sock == "cockring") {
                let numRings: number = 0;
                for (let index: number = 0; index < this.list.length; index++) {
                    if (this.list[index].sock == "cockring")
                        numRings++;
                }

                if (numRings == 0)
                    this.creature.perks.remove(PerkType.PentUp);
                else
                    this.creature.perks.get(PerkType.PentUp).value1 = 5 + (numRings * 5);
            }
            this.list.splice(index, 1);
        }
    }

    // Note: DogCocks/FoxCocks are functionally identical. They actually change back and forth depending on some
    // of the PC's attributes, and this is recaluculated every hour spent at camp.
    // As such, delineating between the two is kind of silly.
    public filterType(type: CockType): Cock[] {
        return this.filter((cock: Cock) => {
            if (cock.type == type) {
                if (cock.type == CockType.DOG || cock.type == CockType.FOX)
                    return cock;
                else
                    return cock;
            }
        })
    }

    public filterSockType(type: string = ""): Cock[] {
        return this.list.filter((a: Cock) => {
            if (a.sock == type || type == "")
                return a;
        });
    }
}