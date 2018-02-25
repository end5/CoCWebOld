import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Game from '../../Game/Game';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class WingStick extends Consumable {
    public constructor() {
        super(ConsumableName.WingStick, new ItemDesc("Wingstick", "a wingstick", "A tri-bladed throwing weapon.  Though good for only a single use, it's guaranteed to do high damage if it hits.  (Cost: 16) (DMG: 40-100)"), 16);
    }

    public canUse(character: Character): boolean {
        if (Game.inCombat) return true;
        DisplayText("There's no one to throw it at!");
        return false;
    }

    public use(character: Character) {
        DisplayText().clear();
        DisplayText("You toss a wingstick at your foe!  It flies straight and true, almost as if it has a mind of its own as it arcs towards " + Game.monster.desc.a + Game.monster.desc.short + "!\n");
        if (Game.monster.stats.spe - 80 > Utils.rand(100) + 1) { // 1% dodge for each point of speed over 80
            DisplayText("Somehow " + Game.monster.desc.a + Game.monster.desc.short + "'");
            if (!Game.monster.desc.plural) DisplayText("s");
            DisplayText(" incredible speed allows " + Game.monster.desc.objectivePronoun + " to avoid the spinning blades!  The deadly device shatters when it impacts something in the distance.");
        }
        else { // Not dodged
            const damage: number = 40 + Utils.rand(61);
            DisplayText(Game.monster.desc.capitalA + Game.monster.desc.short + " is hit with the wingstick!  It breaks apart as it lacerates " + Game.monster.desc.objectivePronoun + ". (" + damage + ")");
            Game.monster.combat.stats.loseHP(damage, character);
            if (Game.monster.stats.HP < 0) Game.monster.stats.HP = 0;
        }
    }
}
