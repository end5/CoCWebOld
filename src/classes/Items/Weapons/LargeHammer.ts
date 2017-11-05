import Weapon from './Weapon';
import Character from '../../Character/Character';
import MainScreen from '../../display/MainScreen';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class LargeHammer extends Weapon {
    public constructor() {
        super("L.Hammr", new ItemDesc("L.Hammr", "Marble's large hammer", "This two-handed warhammer looks pretty devastating.  You took it from Marble after she refused your advances."), "large hammer", "smash", 16, 90, "Large");
    }

    public canUse(player: Player): boolean {
        if (player.tallness >= 60)
            return true;
        MainScreen.text("This hammer is too large for you to wield effectively.  ");
        return false;
    }
    
    equip(character: Character): void { }
    unequip(character: Character): void { }
    equipText(): void { }
    unequipText(): void { }
    use(player: Player) { }
}
