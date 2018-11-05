import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Hellfire extends PlayerSpellAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "Hellfire";
    public reasonCannotUse: string = "You are too tired to breathe fire.\n";
    public readonly baseCost: number = 20;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.Hellfire);
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        character.stats.fatigueMagic(this.baseCost);
        let damage: number = (character.stats.level * 8 + randInt(10) + character.stats.cor / 5);
        if (!character.combat.effects.has(CombatEffectType.GooArmorSilence)) CView.text("You take in a deep breath and unleash a wave of corrupt red flames from deep within.");

        if (character.combat.effects.has(CombatEffectType.WebSilence)) {
            CView.text("  <b>The fire burns through the webs blocking your mouth!</b>");
            character.combat.effects.remove(CombatEffectType.WebSilence);
        }
        if (character.combat.effects.has(CombatEffectType.GooArmorSilence)) {
            CView.text("  <b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b>");
            character.combat.effects.remove(CombatEffectType.GooArmorSilence);
            damage += 25;
        }
        if (monster.stats.int < 10) {
            CView.text("  Your foe lets out a shriek as their form is engulfed in the blistering flames.");
            damage = Math.floor(damage);
            damage = monster.combat.stats.loseHP(damage);
            CView.text("(" + damage + ")\n");
        }
        else {
            if (monster.stats.lustVuln > 0) {
                CView.text("  Your foe cries out in surprise and then gives a sensual moan as the flames of your passion surround them and fill their body with unnatural lust.\n");
                monster.stats.lust += monster.stats.lustVuln * damage / 6;
            }
            else {
                CView.text("  The corrupted fire doesn't seem to have affect on " + monster.desc.a + monster.desc.short + "!\n");
            }
        }
        CView.text("\n");
    }
}
