import Weapon from './Weapon';
import WeaponName from './WeaponName';
import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import PlayerFlags from '../../Character/Player/PlayerFlags';
import User from '../../User';
import ItemDesc from '../ItemDesc';

export default class DragonShellShield extends Weapon {
    public constructor() {
        super(WeaponName.DragonShellShield, new ItemDesc("DrgnShl", "a dragon-shell shield", "A durable shield that has been forged from the remains of the dragon egg you found in the swamp.  Absorbs any fluid attacks you can catch, rendering them useless."), "dragon-shell shield", "smack", 0, 1500, "Large");
    }

    public useText(character: Character): void {
        if ((User.flags.get("Player") as PlayerFlags).TIMES_EQUIPPED_EMBER_SHIELD === 0) {
            DisplayText().clear();
            DisplayText("Turning the sturdy shield over in inspection, you satisfy yourself as to its craftsmanship and adjust the straps to fit your arm snugly.  You try a few practice swings, but find yourself overbalancing at each one due to the deceptive lightness of the material.  Eventually, though, you pick up the knack of putting enough weight behind it to speed it through the air while thrusting a leg forward to stabilize yourself, and try bashing a nearby rock with it.  You smile with glee as ");
            if (character.stats.str < 80)
                DisplayText("bits and pieces from the surface of the");
            else
                DisplayText("huge shards of the shattered");
            DisplayText(" rock are sent flying in all directions.");
            DisplayText("\n\nAfter a few more practice bashes and shifts to acquaint yourself with its weight, you think you're ready to try facing an enemy with your new protection.  One last thing... taking off the shield and turning it straps-down, you spit onto the surface.  Satisfyingly, the liquid disappears into the shell as soon as it touches.");
        }
        (User.flags.get("Player") as PlayerFlags).TIMES_EQUIPPED_EMBER_SHIELD++;
    }
}
