import { Hiker } from './hiker';

export class Game{
    id: number;
    code: number;
    started: boolean;
    ended: boolean;
    hikers: Hiker[];
    length: number;
}