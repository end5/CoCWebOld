import { Gender } from '../../Game/Body/GenderIdentity';

export interface SaveFile {
    name: string;
    days: number;
    gender: Gender;
    notes: string;
    game: object;
}
