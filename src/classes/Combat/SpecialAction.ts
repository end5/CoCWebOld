import Player from '../Player';
import Monster from '../Monster';

export default interface SpecialAction {
    canUse(player: Player): boolean;
    reasonCannotUse(): string;
    use(player: Player, monster: Monster);
}