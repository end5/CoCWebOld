import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import { Vagina, VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import { Character } from '../../Character/Character';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { Mod } from '../../Modifiers/Modifiers';
import { ItemDesc } from '../ItemDesc';
import { describeButt } from '../../Descriptors/ButtDescriptor';
import { describeVagina } from '../../Descriptors/VaginaDescriptor';

export class WetCloth extends Consumable {
    public constructor() {
        super(ConsumableName.WetCloth, new ItemDesc("WetClth", "a wet cloth dripping with slippery slime", "Dripping with a viscous slime, you've no doubt rubbing this cloth on your body would have some kind of strange effect."));
    }

    public use(character: Character) {
        DisplayText().clear();
        DisplayText("You take the wet cloth in hand and rub it over your body, smearing the strange slime over your " + character.body.skin.desc + " slowly.");
        // Stat changes
        // libido up to 80
        if (character.stats.lib < 80) {
            character.stats.lib += .5 + (90 - character.stats.lib) / 10;
            character.stats.lust += character.stats.lib / 2;
            DisplayText("\n\nBlushing and feeling horny, you make sure to rub it over your chest and erect nipples, letting the strange slimy fluid soak into you.");
        }
        // sensitivity moves towards 50
        if (character.stats.sens < 50) {
            DisplayText("\n\nThe slippery slime soaks into your " + character.body.skin.desc + ", making it tingle with warmth, sensitive to every touch.");
            character.stats.sens += 1;
        }
        else if (character.stats.sens > 50) {
            DisplayText("\n\nThe slippery slime numbs your " + character.body.skin.desc + " slightly, leaving behind only gentle warmth.");
            character.stats.sens += -1;
        }
        /*Calculate goopiness
         let goopiness:number = 0;
         if(character.body.skin.type == SkinType.GOO) goopiness+=2;
         if(character.hair.indexOf("gooey") != -1) goopiness++;
         if(character.torso.vaginaSpot.count > 0) {
         if(character.vaginalCapacity() >= 9000) goopiness++;
         }*/
        // Cosmetic changes based on 'goopyness'
        // Remove wings
        if (character.body.wings.type > WingType.NONE) {
            if (character.body.wings.type === WingType.SHARK_FIN) DisplayText("\n\nYou sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your fin slowly turn to sludge, dripping to the ground as your body becomes more goo-like.");
            else DisplayText("\n\nYou sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your wings slowly turn to sludge, dripping to the ground as your body becomes more goo-like.");
            character.body.wings.type = WingType.NONE;
            return;
        }
        // Goopy hair
        if (character.body.hair.type !== 3) {
            character.body.hair.type = 3;
            // if bald
            if (character.body.hair.length <= 0) {
                DisplayText("\n\nYour head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover you've grown some kind of gooey hair.  From time to time it drips, running down your back to the crack of your " + describeButt(character) + ".");
                character.body.hair.length = 5;
            }
            else {
                // if hair isnt rubbery or latexy
                if (character.body.hair.color.indexOf("rubbery") === -1 && character.body.hair.color.indexOf("latex-textured") === -1) {
                    DisplayText("\n\nYour head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover your hair has become a slippery, gooey mess.  From time to time it drips, running down your back to the crack of your " + describeButt(character) + ".");
                }
                // Latexy stuff
                else {
                    DisplayText("\n\nYour oddly inorganic hair shifts, becoming partly molten as rivulets of liquid material roll down your back.  How strange.");
                }
            }
            if (character.body.hair.color !== "green" && character.body.hair.color !== "purple" && character.body.hair.color !== "blue" && character.body.hair.color !== "cerulean" && character.body.hair.color !== "emerald") {
                DisplayText("  Stranger still, the hue of your semi-liquid hair changes to ");
                const blah: number = randInt(10);
                if (blah <= 2) character.body.hair.color = "green";
                else if (blah <= 4) character.body.hair.color = "purple";
                else if (blah <= 6) character.body.hair.color = "blue";
                else if (blah <= 8) character.body.hair.color = "cerulean";
                else character.body.hair.color = "emerald";
                DisplayText(character.body.hair.color + ".");
            }
            character.stats.lust += 10;
            return;
        }
        // 1.Goopy skin
        if (character.body.hair.type === 3 && (character.body.skin.desc !== "skin" || character.body.skin.adj !== "slimy")) {
            if (character.body.skin.type === SkinType.PLAIN) DisplayText("\n\nYou sigh, feeling your " + character.inventory.equipment.armor.displayName + " sink into you as your skin becomes less solid, gooey even.  You realize your entire body has become semi-solid and partly liquid!");
            else if (character.body.skin.type === SkinType.FUR) DisplayText("\n\nYou sigh, suddenly feeling your fur become hot and wet.  You look down as your " + character.inventory.equipment.armor.displayName + " sinks partway into you.  With a start you realize your fur has melted away, melding into the slime-like coating that now serves as your skin.  You've become partly liquid and incredibly gooey!");
            else if (character.body.skin.type === SkinType.SCALES) DisplayText("\n\nYou sigh, feeling slippery wetness over your scales.  You reach to scratch it and come away with a slippery wet coating.  Your scales have transformed into a slimy goop!  Looking closer, you realize your entire body has become far more liquid in nature, and is semi-solid.  Your " + character.inventory.equipment.armor.displayName + " has even sunk partway into you.");
            else if (character.body.skin.type > SkinType.GOO) DisplayText("\n\nYou sigh, feeling your " + character.inventory.equipment.armor.displayName + " sink into you as your " + character.body.skin.desc + " becomes less solid, gooey even.  You realize your entire body has become semi-solid and partly liquid!");
            character.body.skin.type = SkinType.GOO;
            character.body.skin.desc = "skin";
            character.body.skin.adj = "slimy";
            if (character.body.skin.tone !== "green" && character.body.skin.tone !== "purple" && character.body.skin.tone !== "blue" && character.body.skin.tone !== "cerulean" && character.body.skin.tone !== "emerald") {
                DisplayText("  Stranger still, your skintone changes to ");
                const blaht: number = randInt(10);
                if (blaht <= 2) character.body.skin.tone = "green";
                else if (blaht <= 4) character.body.skin.tone = "purple";
                else if (blaht <= 6) character.body.skin.tone = "blue";
                else if (blaht <= 8) character.body.skin.tone = "cerulean";
                else character.body.skin.tone = "emerald";
                DisplayText(character.body.skin.tone + "!");
            }
            return;
        }
        //// 1a.Make alterations to dick/vaginal/nippular descriptors to match
        // DONE EXCEPT FOR TITS & MULTIDICKS (UNFINISHED KINDA)
        // 2.Goo legs
        if (character.body.skin.adj === "slimy" && character.body.skin.desc === "skin" && character.body.legs.type !== LegType.GOO) {
            DisplayText("\n\nYour viewpoint rapidly drops as everything below your " + describeButt(character) + " and groin melts together into an amorphous blob.  Thankfully, you discover you can still roll about on your new slimey undercarriage, but it's still a whole new level of strange.");
            character.body.tallness -= 3 + randInt(2);
            if (character.body.tallness < 36) {
                character.body.tallness = 36;
                DisplayText("  The goo firms up and you return to your previous height.  It would truly be hard to get any shorter than you already are!");
            }
            character.body.legs.type = LegType.GOO;
            return;
        }
        // 3a. Grow vagina if none
        if (character.body.vaginas.count <= 0) {
            DisplayText("\n\nA wet warmth spreads through your slimey groin as a narrow gash appears on the surface of your groin.  <b>You have grown a vagina.</b>");
            const newVagina: Vagina = new Vagina();
            newVagina.wetness = VaginaWetness.DROOLING;
            newVagina.looseness = VaginaLooseness.GAPING;
            character.body.clit.length = .4;
            character.body.vaginas.add(newVagina);
            character.updateGender();
            return;

        }
        // 3b.Infinite Vagina
        if (character.vaginalCapacity() < 9000) {
            if (!character.statusAffects.has(StatusEffectType.BonusVCapacity))
                character.statusAffects.add(StatusEffectType.BonusVCapacity, 9000, 0, 0, 0);
            else character.statusAffects.get(StatusEffectType.BonusVCapacity).value1 = 9000;
            DisplayText("\n\nYour " + describeVagina(character, character.body.vaginas.get(0)) + "'s internal walls feel a tingly wave of strange tightness.  Experimentally, you slip a few fingers, then your hand, then most of your forearm inside yourself.  <b>It seems you're now able to accommodate just about ANYTHING inside your sex.</b>");
            return;
        }
        else if (character.body.tallness < 100 && randInt(3) <= 1) {
            DisplayText("\n\nYour gel-like body swells up from the intake of additional slime.  If you had to guess, you'd bet you were about two inches taller.");
            character.body.tallness += 2;
            character.stats.str += 1;
            character.stats.tou += 1;
        }
        // Big slime girl
        else {
            if (!character.statusAffects.has(StatusEffectType.SlimeCraving)) {
                DisplayText("\n\nYou feel a growing gnawing in your gut.  You feel... hungry, but not for food.  No, you need something wet and goopy pumped into you.  You NEED it.  You can feel it in your bones.  <b>If you don't feed that need... you'll get weaker and maybe die.</b>");
                character.statusAffects.add(StatusEffectType.SlimeCraving, 0, 0, 0, 1); // Value four indicates this tracks strength and speed separately
            }
            else {
                DisplayText("\n\nYou feel full for a moment, but you know it's just a temporary respite from your constant need to be 'injected' with fluid.");
                character.statusAffects.get(StatusEffectType.SlimeCraving).value1 = 0;
            }
        }
        if (randInt(2) === 0) DisplayText(Mod.Body.displayModFem(character, 85, 3));
        if (randInt(2) === 0) DisplayText(Mod.Body.displayModThickness(character, 20, 3));
        if (randInt(2) === 0) DisplayText(Mod.Body.displayModTone(character, 15, 5));
    }
}
