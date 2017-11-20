import Consumable from './Consumable';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class FishFillet extends Consumable {
    public constructor() {
        super("FishFil", new ItemDesc("FishFil", "a fish fillet", "A perfectly cooked piece of fish.  You're not sure what type of fish is, since you're fairly certain \"delicious\" is not a valid species."));
    }

    public use(player: Player) {
        DisplayText.clear();
        if (!Game.inCombat)
            DisplayText.text("You sit down and unwrap your fish fillet. It's perfectly flaky, allowing you to break it off in bite-sized chunks.  The salty meal disappears quickly, and your stomach gives an appreciative gurgle.");
        //(In combat?)
        else
            DisplayText.text("You produce the fish fillet from your bag.  Rather than unwrap it and savor the taste as you normally would, you take a large bite out of it, leaf wrapping and all.  In no time your salty meal is gone, your stomach giving an appreciative gurgle.");

        //Increase HP by quite a bit!)
        //(Slight chance at increasing Toughness?)
        //(If lake has been tainted, +1 Corruption?)
        if (player.statusAffects.has(StatusAffectType.FactoryOverload)) player.stats.cor += 0.5;
        player.stats.cor += 0.1;
        player.stats.HP += Math.round(player.stats.maxHP() * .25);
    }
}