import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Fireball implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "Fire Breath";
    public reasonCannotUse: string = "You are too tired to breathe fire.";
    public readonly fatigueCost: number = 20;
    public subActions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.FireLord);
    }

    public canUse(character: Character, monster: Character): boolean {
        return character.stats.fatigue + this.fatigueCost <= 100;
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        character.stats.fatigue += this.fatigueCost;
        if (monster.combat.effects.has(CombatEffectType.Shell)) {
            CView.text("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        // [Failure]
        // (high damage to self, +20 fatigue)
        if (randInt(5) === 0 || character.combat.effects.has(CombatEffectType.WebSilence)) {
            if (character.combat.effects.has(CombatEffectType.WebSilence)) CView.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n\n");
            else if (character.combat.effects.has(CombatEffectType.GooArmorSilence)) CView.text("You reach for the terrestrial fire but as you ready the torrent, it erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.  The slime covering your mouth bubbles and pops, boiling away where the escaping flame opens small rents in it.  That wasn't as effective as you'd hoped, but you can at least speak now.");
            else CView.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, the fire inside erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.\n\n");
            character.stats.fatigue += 10;
            character.combat.stats.loseHP(10 + randInt(20));
            return;
        }
        let damage: number;
        damage = Math.floor(character.stats.level * 10 + 45 + randInt(10));
        if (character.combat.effects.has(CombatEffectType.GooArmorSilence)) {
            CView.text("<b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b> ");
            character.combat.effects.remove(CombatEffectType.GooArmorSilence);
            damage += 25;
        }
        else CView.text("A growl rumbles deep with your chest as you charge the terrestrial fire.  When you can hold it no longer, you release an ear splitting roar and hurl a giant green conflagration at your enemy. ");

        damage = monster.combat.stats.loseHP(damage);
        CView.text("(" + damage + ")\n\n");
    }
}
