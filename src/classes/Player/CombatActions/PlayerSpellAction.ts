import PlayerCombatAction from './PlayerCombatAction';
import Character from '../../Character/Character';
import SpellAction from '../../Combat/Actions/SpellAction';
import { PerkType } from '../../Effects/PerkType';
import Player from '../Player';

export default abstract class PlayerSpellAction implements PlayerCombatAction, SpellAction {
    abstract isPossible(player: Player): boolean;
    public canUse(player: Player, monster?: Character): boolean {
        if (player.perks.has(PerkType.BloodMage) || player.stats.fatigue + this.spellCost(player) <= 100) {
            this.reason = "You are too tired to cast this spell.";
            return false;
        }
        return true;
    }
    
    protected reason: string;
    public reasonCannotUse(): string {
        return this.reason;
    }

    abstract use(player: Player, monster: Character);
    
    abstract readonly baseCost: number;
    
    public spellCost(player: Player): number {
        //Addiditive mods
        let mod: number = this.baseCost;
        let costPercent: number = 100;
        if (player.perks.has(PerkType.SpellcastingAffinity))
            costPercent -= player.perks.get(PerkType.SpellcastingAffinity).value1;
        if (player.perks.has(PerkType.WizardsEndurance))
            costPercent -= player.perks.get(PerkType.WizardsEndurance).value1;
    
        //Limiting it and multiplicative mods
        if (player.perks.has(PerkType.BloodMage) && costPercent < 50) costPercent = 50;
    
        mod *= costPercent / 100;
    
        if (player.perks.has(PerkType.HistoryScholar) && mod > 2)
            mod *= .8;
        if (player.perks.has(PerkType.BloodMage) && mod < 5)
            mod = 5;
        else if (mod < 2)
            mod = 2;
    
        mod = Math.round(mod * 100) / 100;
        return mod;
    }
}
