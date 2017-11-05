import Weapon from './Weapon';
import Character from '../../Character/Character';
import MainScreen from '../../display/MainScreen';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class DragonShellShield extends Weapon {
    public constructor() {
        super("DrgnShl", new ItemDesc("DrgnShl", "a dragon-shell shield", "A durable shield that has been forged from the remains of the dragon egg you found in the swamp.  Absorbs any fluid attacks you can catch, rendering them useless."), "dragon-shell shield", "smack", 0, 1500, "Large");
    }

    public useText(player: Player): void { //Produces any text seen when equipping the armor normally
        if (Flags.list[FlagEnum.TIMES_EQUIPPED_EMBER_SHIELD] == 0) {
            MainScreen.clearText();
            MainScreen.text("Turning the sturdy shield over in inspection, you satisfy yourself as to its craftsmanship and adjust the straps to fit your arm snugly.  You try a few practice swings, but find yourself overbalancing at each one due to the deceptive lightness of the material.  Eventually, though, you pick up the knack of putting enough weight behind it to speed it through the air while thrusting a leg forward to stabilize yourself, and try bashing a nearby rock with it.  You smile with glee as ");
            if (player.stats.str < 80)
                MainScreen.text("bits and pieces from the surface of the");
            else
                MainScreen.text("huge shards of the shattered");
            MainScreen.text(" rock are sent flying in all directions.");
            MainScreen.text("\n\nAfter a few more practice bashes and shifts to acquaint yourself with its weight, you think you're ready to try facing an enemy with your new protection.  One last thing... taking off the shield and turning it straps-down, you spit onto the surface.  Satisfyingly, the liquid disappears into the shell as soon as it touches.");
        }
        Flags.list[FlagEnum.TIMES_EQUIPPED_EMBER_SHIELD]++;
    }
    
    equip(character: Character): void {}
    unequip(character: Character): void {}
    equipText(): void {}
    unequipText(): void {}
    use(player: Player) {}
}

