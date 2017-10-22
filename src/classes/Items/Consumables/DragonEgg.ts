import Consumable from './Consumable';
import MainScreen from '../../display/MainScreen';
import StatusAffect from '../../Effects/StatusAffect';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class DragonEgg extends Consumable {
    public constructor() {
        super("DrgnEgg", "DrgnEgg", "an unfertilized dragon egg", DragonEgg.DefaultValue, "A large, solid egg, easily the size of your clenched fist.  Its shell color is reddish-white, with blue splotches.");
    }

    public use(player: Player) {
        MainScreen.clearText();
        //Effect:
        //Boosts the special effect of Dragonbreath by 20% for 1 use. ie: if Tainted's breath weapon has a 80% chance to stun on hit, +20% equals 100% chance to stun.
        MainScreen.text("You crack the shell easily and swallow the large yolk and the copious amounts of albumen - the yolk is blue, while the rest is crimson-tinted.  It tastes like... well, it tastes mostly of spiced mint, you think.");
        if (player.perks.has("Dragonfire")) {
            if (player.statusAffects.has("DragonBreathCooldown")) player.statusAffects.remove("DragonBreathCooldown");
            else if (!player.statusAffects.has("DragonBreathBoost"))
                player.statusAffects.add(new StatusAffect("DragonBreathBoost", 0, 0, 0, 0));
            //(if PC has breath weapon)
            MainScreen.text("\n\nA sudden surge of energy fills your being and you feel like you could blast anything to atoms with a single breath, like the mighty dragons of legends.");
        }
        player.stats.fatigue -= 20;
    }
}