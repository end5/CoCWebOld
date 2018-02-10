import { Gender } from './Body/GenderIdentity';

export default interface SaveFile {
    name: string;
    days: number;
    gender: Gender;
    notes: string;
    game: object;
}
