import Weapon from './Weapon';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class LargeClaymore extends Weapon {
    public constructor() {
        super("Claymor", new ItemDesc("L.Claymore", "a large claymore", "A massive sword that a very strong warrior might use.  Requires 40 strength to use.  (ATK: 15) (Cost: 1000)"), "large claymore", "cleaving sword-slash", 15, 1000, "Large");
    }

    public canUse(player: Player): boolean {
        if (player.stats.str >= 40)
            return true;
        DisplayText.text("You aren't strong enough to handle such a heavy weapon!  ");
        return false;
    }
    
    equip(character: Character): void { }
    unequip(character: Character): void { }
    equipText(): void { }
    unequipText(): void { }
    use(player: Player) { }
}
