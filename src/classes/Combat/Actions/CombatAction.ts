import Character from '../../Character/Character';

export default interface CombatAction {
    canUse(character: Character, monster: Character): boolean;
    use(character: Character, monster: Character);    
}