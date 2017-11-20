import Character from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import DisplayText from '../../../display/DisplayText';
import Player from '../../../Player/Player';
import Utils from '../../../Utilities/Utils';
import PlayerCombatAction from '../Player/PlayerCombatAction';

export default class Fireball implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.perks.has("FireLord");
    }

    public canUse(player: Player): boolean {
        return player.stats.fatigue + 20 <= 100;
    }

    public reasonCannotUse(): string {
        return "You are too tired to breathe fire.";
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        player.stats.fatigue += 20;
        if (monster.statusAffects.has("Shell")) {
            DisplayText.text("As soon as your magic touches the multicolored shell around " + monster.desc.a+ monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            DisplayText.text("Amily easily glides around your attack thanks to her complete concentration on your movements.");
            return;
        }
        if (monster.charType == CharacterType.LivingStatue) {
            DisplayText.text("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            return;
        }
        //[Failure]
        //(high damage to self, +20 fatigue)
        if (Utils.rand(5) == 0 || player.statusAffects.has("WebSilence")) {
            if (player.statusAffects.has("WebSilence")) DisplayText.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n\n");
            else if (player.statusAffects.has("GooArmorSilence")) DisplayText.text("You reach for the terrestrial fire but as you ready the torrent, it erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.  The slime covering your mouth bubbles and pops, boiling away where the escaping flame opens small rents in it.  That wasn't as effective as you'd hoped, but you can at least speak now.");
            else DisplayText.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, the fire inside erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.\n\n");
            player.stats.fatigue += 10;
            player.combat.loseHP(10 + Utils.rand(20), player);
            return;
        }
        // Player doesn't gain from this spell so why should the doppleganger gain for the player
        /*if (monster instanceof Doppleganger) {
            <Doppleganger>monster.handleSpellResistance("fireball");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock(player);
            return;
        }*/
        let damage: number;
        damage = Math.floor(player.stats.level * 10 + 45 + Utils.rand(10));
        if (player.statusAffects.has("GooArmorSilence")) {
            DisplayText.text("<b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b> ");
            player.statusAffects.remove("GooArmorSilence");
            damage += 25;
        }
        else DisplayText.text("A growl rumbles deep with your chest as you charge the terrestrial fire.  When you can hold it no longer, you release an ear splitting roar and hurl a giant green conflagration at your enemy. ");

        if (monster.desc.short == "Isabella") {
            DisplayText.text("Isabella shoulders her shield into the path of the emerald flames.  They burst over the wall of steel, splitting around the impenetrable obstruction and washing out harmlessly to the sides.\n\n");
            if (isabellaFollowerScene.isabellaAccent()) DisplayText.text("\"<i>Is zat all you've got?  It'll take more than a flashy magic trick to beat Izabella!</i>\" taunts the cow-girl.\n\n");
            else DisplayText.text("\"<i>Is that all you've got?  It'll take more than a flashy magic trick to beat Isabella!</i>\" taunts the cow-girl.\n\n");
            return;
        }
        else if (monster.desc.short == "Vala") {
            DisplayText.text("Vala beats her wings with surprising strength, blowing the fireball back at you! ");
            if (player.perks.has("Evade") && Utils.rand(2) == 0) {
                DisplayText.text("You dive out of the way and evade it!");
            }
            else if (player.perks.has("Flexibility") && Utils.rand(4) == 0) {
                DisplayText.text("You use your flexibility to barely fold your body out of the way!");
            }
            else {
                DisplayText.text("Your own fire smacks into your face! (" + damage + ")");
                player.combat.loseHP(damage, player);
            }
            DisplayText.text("\n\n");
        }
        else {
            //Using fire attacks on the goo]
            if (monster.desc.short == "goo-girl") {
                DisplayText.text(" Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer. ");
                if (!monster.perks.has("Acid"))
                    monster.perks.add(new Perk("Acid", 0, 0, 0, 0));
                damage = Math.round(damage * 1.5);
            }
            if (monster.statusAffects.has("Sandstorm")) {
                DisplayText.text("<b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>  ");
                damage = Math.round(0.2 * damage);
            }
            damage = monster.combat.loseHP(damage, player);
            DisplayText.text("(" + damage + ")\n\n");
            if (monster.desc.short == "Holli" && !monster.statusAffects.has("HolliBurning"))
                <Holli>monster.lightHolliOnFireMagically();
        }
    }
}
