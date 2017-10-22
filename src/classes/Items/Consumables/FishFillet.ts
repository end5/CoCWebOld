import Consumable from './Consumable';
import MainScreen from '../../display/MainScreen';
import Game from '../../Game/Game';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class FishFillet extends Consumable {
    public constructor() {
        super("FishFil", "FishFil", "a fish fillet", FishFillet.DefaultValue, "A perfectly cooked piece of fish.  You're not sure what type of fish is, since you're fairly certain \"delicious\" is not a valid species.");
    }

    public use(player: Player) {
        MainScreen.clearText();
        if (!Game.inCombat)
            MainScreen.text("You sit down and unwrap your fish fillet. It's perfectly flaky, allowing you to break it off in bite-sized chunks.  The salty meal disappears quickly, and your stomach gives an appreciative gurgle.");
        //(In combat?)
        else
            MainScreen.text("You produce the fish fillet from your bag.  Rather than unwrap it and savor the taste as you normally would, you take a large bite out of it, leaf wrapping and all.  In no time your salty meal is gone, your stomach giving an appreciative gurgle.");

        //Increase HP by quite a bit!)
        //(Slight chance at increasing Toughness?)
        //(If lake has been tainted, +1 Corruption?)
        if (player.statusAffects.has("FactoryOverload")) player.stats.cor += 0.5;
        player.stats.cor += 0.1;
        player.stats.HP += Math.round(player.stats.maxHP() * .25);
    }
}