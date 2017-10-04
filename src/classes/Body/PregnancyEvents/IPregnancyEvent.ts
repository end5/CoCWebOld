import Player from "../../Player";

export default interface IPregnancyEvent {
    incubationDisplay(player: Player);
    birth(player: Player);
}