import Character from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import DisplayText from '../../../display/DisplayText';
import PerkFactory from '../../../Effects/PerkFactory';
import { PerkType } from '../../../Effects/PerkType';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Utils from '../../../Utilities/Utils';
import Player from '../../Player';
import PlayerSpellAction from '../PlayerSpellAction';

export class DragonBreath extends PlayerSpellAction {
    public name: string = "DragonFire";
    public readonly baseCost: number = 20;
    
    public isPossible(player: Player): boolean {
        return player.perks.has(PerkType.Dragonfire);
    }

    public canUse(player: Player): boolean {
        if (!player.perks.has(PerkType.BloodMage) && player.stats.fatigue + this.spellCost(player) > 100) {
            this.reasonCannotUse = "You are too tired to breathe fire.";
            return false;
        }
        //Not Ready Yet:
        if (player.statusAffects.has(StatusAffectType.DragonBreathCooldown)) {
            this.reasonCannotUse = "You try to tap into the power within you, but your burning throat reminds you that you're not yet ready to unleash it again...";
            return false;
        }
        return true;
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        player.stats.fatigueMagic(this.baseCost);
        player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.DragonBreathCooldown, 0, 0, 0, 0));
        let damage: number = Math.floor(player.stats.level * 8 + 25 + Utils.rand(10));
        if (player.statusAffects.has(StatusAffectType.DragonBreathBoost)) {
            player.statusAffects.remove(StatusAffectType.DragonBreathBoost);
            damage *= 1.5;
        }
        //Shell
        if (monster.statusAffects.has(StatusAffectType.Shell)) {
            DisplayText.text("As soon as your magic touches the multicolored shell around " + monster.desc.a+ monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        //Amily!
        if (monster.statusAffects.has(StatusAffectType.Concentration)) {
            DisplayText.text("Amily easily glides around your attack thanks to her complete concentration on your movements.");
            return;
        }
        if (monster.charType == CharacterType.LivingStatue) {
            DisplayText.text("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            return;
        }
        DisplayText.text("Tapping into the power deep within you, you let loose a bellowing roar at your enemy, so forceful that even the environs crumble around " + monster.desc.objectivePronoun + ".  " + monster.desc.capitalA + monster.desc.short + " does " + monster.desc.possessivePronoun + " best to avoid it, but the wave of force is too fast.");
        if (monster.statusAffects.has(StatusAffectType.Sandstorm)) {
            DisplayText.text("  <b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>");
            damage = Math.round(0.2 * damage);
        }
        //Miss: 
        if ((player.statusAffects.has(StatusAffectType.Blind) && Utils.rand(2) == 0) || (monster.stats.spe - player.stats.spe > 0 && Math.floor(Math.random() * (((monster.stats.spe - player.stats.spe) / 4) + 80)) > 80)) {
            DisplayText.text("  Despite the heavy impact caused by your roar, " + monster.desc.a+ monster.desc.short + " manages to take it at an angle and remain on " + monster.desc.possessivePronoun + " feet and focuses on you, ready to keep fighting.");
        }
        //Special enemy avoidances
        else if (monster.desc.short == "Vala") {
            DisplayText.text("Vala beats her wings with surprising strength, blowing the fireball back at you! ");
            if (player.perks.has(PerkType.Evade) && Utils.rand(2) == 0) {
                DisplayText.text("You dive out of the way and evade it!");
            }
            else if (player.perks.has(PerkType.Flexibility) && Utils.rand(4) == 0) {
                DisplayText.text("You use your flexibility to barely fold your body out of the way!");
            }
            else {
                damage = player.combat.stats.loseHP(damage, monster);
                DisplayText.text("Your own fire smacks into your face! (" + damage + ")");
            }
            DisplayText.text("\n\n");
        }
        //Goos burn
        else if (monster.desc.short == "goo-girl") {
            DisplayText.text(" Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer. ");
            if (!monster.perks.has(PerkType.Acid))
                monster.perks.add(PerkFactory.create(PerkType.Acid, 0, 0, 0, 0));
            damage = Math.round(damage * 1.5);
            damage = monster.combat.stats.loseHP(damage, player);
            monster.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Stunned, 0, 0, 0, 0));
            DisplayText.text("(" + damage + ")\n\n");
        }
        else {
            if (!monster.perks.has(PerkType.Resolute)) {
                DisplayText.text("  " + monster.desc.capitalA + monster.desc.short + " reels as your wave of force slams into " + monster.desc.objectivePronoun + " like a ton of rock!  The impact sends " + monster.desc.objectivePronoun + " crashing to the ground, too dazed to strike back.");
                monster.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Stunned, 1, 0, 0, 0));
            }
            else {
                DisplayText.text("  " + monster.desc.capitalA + monster.desc.short + " reels as your wave of force slams into " + monster.desc.objectivePronoun + " like a ton of rock!  The impact sends " + monster.desc.objectivePronoun + " staggering back, but <b>" + monster.desc.subjectivePronoun + " ");
                if (!monster.desc.plural) DisplayText.text("is ");
                else DisplayText.text("are");
                DisplayText.text("too resolute to be stunned by your attack.</b>");
            }
            damage = monster.combat.stats.loseHP(damage, player);
            DisplayText.text(" (" + damage + ")");
        }
        DisplayText.text("\n\n");
        if (monster.desc.short == "Holli" && !monster.statusAffects.has(StatusAffectType.HolliBurning))
            <Holli>monster.lightHolliOnFireMagically();
    }
}
