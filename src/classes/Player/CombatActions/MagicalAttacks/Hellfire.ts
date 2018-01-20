import Character from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import DisplayText from '../../../display/DisplayText';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Utils } from '../../../Utilities/Utils';
import Player from '../../Player';
import PlayerSpellAction from '../PlayerSpellAction';

export class Hellfire extends PlayerSpellAction {
    public name: string = "Hellfire";
    public reasonCannotUse: string = "You are too tired to breathe fire.\n";
    public readonly baseCost: number = 20;

    public isPossible(player: Player): boolean {
        return player.perks.has(PerkType.Hellfire);
    }

    public use(player: Player, monster: Character) {
        DisplayText().clear();
        player.stats.fatigueMagic(this.baseCost);
        // Amily!
        if (monster.statusAffects.has(StatusAffectType.Concentration)) {
            DisplayText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        if (monster.charType === CharacterType.LivingStatue) {
            DisplayText("The fire courses over the stone behemoths skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            return;
        }
        let damage: number = (player.stats.level * 8 + Utils.rand(10) + player.stats.cor / 5);
        if (!player.statusAffects.has(StatusAffectType.GooArmorSilence)) DisplayText("You take in a deep breath and unleash a wave of corrupt red flames from deep within.");

        if (player.statusAffects.has(StatusAffectType.WebSilence)) {
            DisplayText("  <b>The fire burns through the webs blocking your mouth!</b>");
            player.statusAffects.remove(StatusAffectType.WebSilence);
        }
        if (player.statusAffects.has(StatusAffectType.GooArmorSilence)) {
            DisplayText("  <b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b>");
            player.statusAffects.remove(StatusAffectType.GooArmorSilence);
            damage += 25;
        }
        if (monster.desc.short === "Isabella") {
            DisplayText("  Isabella shoulders her shield into the path of the crimson flames.  They burst over the wall of steel, splitting around the impenetrable obstruction and washing out harmlessly to the sides.\n\n");
            if (isabellaFollowerScene.isabellaAccent()) DisplayText("\"<i>Is zat all you've got?  It'll take more than a flashy magic trick to beat Izabella!</i>\" taunts the cow-girl.\n\n");
            else DisplayText("\"<i>Is that all you've got?  It'll take more than a flashy magic trick to beat Isabella!</i>\" taunts the cow-girl.\n\n");

            return;
        }
        else if (monster.desc.short === "Vala") {
            DisplayText("  Vala beats her wings with surprising strength, blowing the fireball back at you!  ");
            if (player.perks.has(PerkType.Evade) && Utils.rand(2) === 0) {
                DisplayText("You dive out of the way and evade it!");
            }
            else if (player.perks.has(PerkType.Flexibility) && Utils.rand(4) === 0) {
                DisplayText("You use your flexibility to barely fold your body out of the way!");
            }
            else {
                damage = Math.floor(damage / 6);
                DisplayText("Your own fire smacks into your face, arousing you!");
                player.stats.lust += damage;
            }
            DisplayText("\n");
        }
        else {
            if (monster.stats.int < 10) {
                DisplayText("  Your foe lets out a shriek as their form is engulfed in the blistering flames.");
                damage = Math.floor(damage);
                damage = monster.combat.stats.loseHP(damage, player);
                DisplayText("(" + damage + ")\n");
            }
            else {
                if (monster.stats.lustVuln > 0) {
                    DisplayText("  Your foe cries out in surprise and then gives a sensual moan as the flames of your passion surround them and fill their body with unnatural lust.\n");
                    monster.stats.lust += monster.stats.lustVuln * damage / 6;
                }
                else {
                    DisplayText("  The corrupted fire doesn't seem to have affect on " + monster.desc.a+ monster.desc.short + "!\n");
                }
            }
        }
        DisplayText("\n");
        if (monster.desc.short === "Holli" && !monster.statusAffects.has(StatusAffectType.HolliBurning))
            monster.lightHolliOnFireMagically() as Holli;
    }
}
