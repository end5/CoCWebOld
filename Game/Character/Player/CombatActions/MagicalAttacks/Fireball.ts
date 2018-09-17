import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { PerkType } from '../../../../Effects/PerkType';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { CharacterType } from '../../../CharacterType';

export class Fireball implements CombatAction {
    public name: string = "Fire Breath";
    public reasonCannotUse: string = "You are too tired to breathe fire.";
    public readonly fatigueCost: number =  20;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.FireLord);
    }

    public canUse(character: Character): boolean {
        return character.stats.fatigue + this.fatigueCost <= 100;
    }

    public use(character: Character, monster: Character): NextScreenChoices {
        DisplayText().clear();
        character.stats.fatigue += this.fatigueCost;
        if (monster.statusAffects.has(StatusAffectType.Shell)) {
            DisplayText("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        // Amily!
        if (monster.statusAffects.has(StatusAffectType.Concentration)) {
            DisplayText("Amily easily glides around your attack thanks to her complete concentration on your movements.");
            return;
        }
        if (monster.charType === CharacterType.LivingStatue) {
            DisplayText("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            return;
        }
        // [Failure]
        // (high damage to self, +20 fatigue)
        if (randInt(5) === 0 || character.statusAffects.has(StatusAffectType.WebSilence)) {
            if (character.statusAffects.has(StatusAffectType.WebSilence)) DisplayText("You reach for the terrestrial fire, but as you ready to release a torrent of flame, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n\n");
            else if (character.statusAffects.has(StatusAffectType.GooArmorSilence)) DisplayText("You reach for the terrestrial fire but as you ready the torrent, it erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.  The slime covering your mouth bubbles and pops, boiling away where the escaping flame opens small rents in it.  That wasn't as effective as you'd hoped, but you can at least speak now.");
            else DisplayText("You reach for the terrestrial fire, but as you ready to release a torrent of flame, the fire inside erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.\n\n");
            character.stats.fatigue += 10;
            character.combat.stats.loseHP(10 + randInt(20), character);
            return;
        }
        // Player doesn't gain from this spell so why should the doppleganger gain for the character
        /*if (monster instanceof Doppleganger) {
            <Doppleganger>monster.handleSpellResistance("fireball");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock(character);
            return;
        }*/
        let damage: number;
        damage = Math.floor(character.stats.level * 10 + 45 + randInt(10));
        if (character.statusAffects.has(StatusAffectType.GooArmorSilence)) {
            DisplayText("<b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b> ");
            character.statusAffects.remove(StatusAffectType.GooArmorSilence);
            damage += 25;
        }
        else DisplayText("A growl rumbles deep with your chest as you charge the terrestrial fire.  When you can hold it no longer, you release an ear splitting roar and hurl a giant green conflagration at your enemy. ");

        if (monster.desc.short === "Isabella") {
            // DisplayText("Isabella shoulders her shield into the path of the emerald flames.  They burst over the wall of steel, splitting around the impenetrable obstruction and washing out harmlessly to the sides.\n\n");
            // if (Scenes.isabellaFollowerScene.isabellaAccent()) DisplayText("\"<i>Is zat all you've got?  It'll take more than a flashy magic trick to beat Izabella!</i>\" taunts the cow-girl.\n\n");
            // else DisplayText("\"<i>Is that all you've got?  It'll take more than a flashy magic trick to beat Isabella!</i>\" taunts the cow-girl.\n\n");
            return;
        }
        else if (monster.desc.short === "Vala") {
            DisplayText("Vala beats her wings with surprising strength, blowing the fireball back at you! ");
            if (character.perks.has(PerkType.Evade) && randInt(2) === 0) {
                DisplayText("You dive out of the way and evade it!");
            }
            else if (character.perks.has(PerkType.Flexibility) && randInt(4) === 0) {
                DisplayText("You use your flexibility to barely fold your body out of the way!");
            }
            else {
                DisplayText("Your own fire smacks into your face! (" + damage + ")");
                character.combat.stats.loseHP(damage, character);
            }
            DisplayText("\n\n");
        }
        else {
            // Using fire attacks on the goo]
            if (monster.desc.short === "goo-girl") {
                DisplayText(" Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skin.tone + " skin has lost some of its shimmer. ");
                if (!monster.perks.has(PerkType.Acid))
                    monster.perks.add(PerkType.Acid, 0, 0, 0, 0);
                damage = Math.round(damage * 1.5);
            }
            if (monster.statusAffects.has(StatusAffectType.Sandstorm)) {
                DisplayText("<b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>  ");
                damage = Math.round(0.2 * damage);
            }
            damage = monster.combat.stats.loseHP(damage, character);
            DisplayText("(" + damage + ")\n\n");
            // if (monster.desc.short === "Holli" && !monster.statusAffects.has(StatusAffectType.HolliBurning))
            //     (monster as Holli).lightHolliOnFireMagically();
        }
        return;
    }
}
