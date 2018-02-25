import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Game from '../../Game/Game';
import ItemDesc from '../ItemDesc';

export default class FishFillet extends Consumable {
    public constructor() {
        super(ConsumableName.FishFillet, new ItemDesc("FishFil", "a fish fillet", "A perfectly cooked piece of fish.  You're not sure what type of fish is, since you're fairly certain \"delicious\" is not a valid species."));
    }

    public use(character: Character) {
        DisplayText().clear();
        if (!Game.inCombat)
            DisplayText("You sit down and unwrap your fish fillet. It's perfectly flaky, allowing you to break it off in bite-sized chunks.  The salty meal disappears quickly, and your stomach gives an appreciative gurgle.");
        // (In combat?)
        else
            DisplayText("You produce the fish fillet from your bag.  Rather than unwrap it and savor the taste as you normally would, you take a large bite out of it, leaf wrapping and all.  In no time your salty meal is gone, your stomach giving an appreciative gurgle.");

        // Increase HP by quite a bit!)
        // (Slight chance at increasing Toughness?)
        // (If lake has been tainted, +1 Corruption?)
        if (character.statusAffects.has(StatusAffectType.FactoryOverload)) character.stats.cor += 0.5;
        character.stats.cor += 0.1;
        character.stats.HP += Math.round(character.stats.maxHP() * .25);
    }
}
