import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { WingType } from '../../Body/Wings';
import DisplayText from '../../display/DisplayText';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';

export default function customCharlie(player: Player): void {
    DisplayText("You're strong, smart, fast, and tough.  It also helps that you've got four dongs well beyond what others have lurking in their trousers.  With your wings, bow, weapon, and tough armor, you're a natural for protecting the town.");
    player.gender = 1;
    player.stats.tou += 2;
    player.stats.str += 3;
    player.fertility = 5;
    player.torso.neck.head.hair.length = 26;
    player.torso.neck.head.hair.color = "blond";
    player.skin.tone = "light";
    player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 0.2;
    player.torso.chest.add(new BreastRow());
    player.torso.chest.get(0).rating = 0;
    player.torso.balls.quantity = 2;
    player.torso.balls.size = 3;
    player.tallness = 113;
    player.tone = 50;
    player.thickness = 50;
    player.femininity = 50;
    player.torso.hips.rating = 5;
    player.torso.butt.rating = 5;
    player.teaseLevel = 1;
    // Large feathered wings (Any chance in heck I could get 'angel' as the race descriptor? Just asking. I'm fine if the answer is 'no')
    player.torso.wings.type = WingType.FEATHERED_LARGE;
    player.torso.wings.desc = "large, feathered";

    // While we're on the subject, would glowing eyes be possible? I'll take normal eyes if not.
    // Beautiful Sword
    player.setWeapon(weapons.B_SWORD);
    player.setArmor(armors.SSARMOR);
    // Beautiful Armor (Or just Spider Silk Armor)
    // Pure Pearl
    // Tallness 84 (8 feet 0 inches)
    player.tallness = 84;
    // Femininity 10
    player.femininity = 10;
    // Thickness 50
    player.thickness = 50;
    // Tone 90
    player.tone = 90;
    // Int 50 (if possible)
    player.stats.int = 50;
    // Str/Tou/Spd 25 (if possible)
    player.stats.str = 25;
    player.stats.tou = 25;
    player.stats.spe = 25;
    // Bow
    player.createKeyItem("Bow", 0, 0, 0, 0);
    // Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
    player.statusAffects.set(StatusAffectType.Kelt, StatusAffectFactory.create(StatusAffectType.Kelt, 100, 0, 0, 0));
    // Is it possible to get extra starting perks added? If so, I'd like History: Religious added to whatever is selected on creation. If not, please ignore this line.
    // Freckled skin.adj
    player.skin.adj = "freckled";
    // 10 Perk Points (if possible, feel free to make it less if you feel it necessary)
    player.perkPoints = 10;
    // Male
    player.gender = 1;
    // Would it be possible to code a cock type that morphs into different cock types? (i.e. it loads a different cock type description each sex scene) If so, I'd like him to have a pair of them, one 24 inches long and 3 inches wide and the second 12-inches long and 2 inches wide. If not, I'll take a dragon and horse cock at 24/3 each as well as a dog and cat cock at 12/2 each.
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.cocks.get(0).length = 24;
    player.torso.cocks.get(0).thickness = 3;
    player.torso.cocks.get(0).type = CockType.HORSE;
    player.torso.cocks.get(1).length = 24;
    player.torso.cocks.get(1).thickness = 3;
    player.torso.cocks.get(1).type = CockType.DRAGON;
    player.torso.cocks.get(2).length = 12;
    player.torso.cocks.get(2).thickness = 2;
    player.torso.cocks.get(2).type = CockType.DOG;
    player.torso.cocks.get(3).length = 12;
    player.torso.cocks.get(3).thickness = 2;
    player.torso.cocks.get(3).type = CockType.CAT;

    // A pair of 8-inch balls
    player.torso.balls.quantity = 2;
    player.torso.balls.size = 8;
    // A virility boost would be nice too if possible.
    player.cumMultiplier = 50;
}
