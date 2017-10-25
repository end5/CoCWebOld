import SpecialAction from './SpecialAction';
import Character from '../../Character/Character';
import Player from '../../Player';

export default abstract class SpellAction implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.perks.has("BloodMage") || player.stats.fatigue + this.spellCost(player) <= 100;
    }
    
    public reasonCannotUse(): string {
        return "You are too tired to cast this spell.";
    }

    abstract use(player: Player, monster: Character);
    
    abstract readonly baseCost: number;
    
    public spellCost(player: Player): number {
        //Addiditive mods
        let mod: number = this.baseCost;
        let costPercent: number = 100;
        if (player.perks.has("SpellcastingAffinity"))
            costPercent -= player.perks.get("SpellcastingAffinity").value1;
        if (player.perks.has("WizardsEndurance"))
            costPercent -= player.perks.get("WizardsEndurance").value1;
    
        //Limiting it and multiplicative mods
        if (player.perks.has("BloodMage") && costPercent < 50) costPercent = 50;
    
        mod *= costPercent / 100;
    
        if (player.perks.has("HistoryScholar") && mod > 2)
            mod *= .8;
        if (player.perks.has("BloodMage") && mod < 5)
            mod = 5;
        else if (mod < 2)
            mod = 2;
    
        mod = Math.round(mod * 100) / 100;
        return mod;
    }
}
