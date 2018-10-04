import { Body } from '../Body';

export interface IPregnancyEvent {
    incubationDisplay(body: Body, incubationTime: number);
    canBirth(body: Body, incubationTime: number);
    birthScene(body: Body);
}
