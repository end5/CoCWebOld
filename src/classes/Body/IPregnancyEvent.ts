import Creature from "../Body/Creature";

export default interface IPregnancyEvent {
    incubationDisplay(creature: Creature, incubationTime: number);
    canBirth(creature: Creature, incubationTime: number);
    birth(creature: Creature);
}