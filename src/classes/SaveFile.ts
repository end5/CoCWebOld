import { Gender } from './Body/Creature';

export default interface SaveFile {
    name: string;
    days: number;
    gender: Gender;
    notes: string;
    game: object;
}
