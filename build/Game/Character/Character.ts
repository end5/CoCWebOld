import CharacterDescription from './CharacterDescription';
import { CharacterType } from './CharacterType';
import DisplayText from '../../Engine/display/DisplayText';
import Dictionary from '../../Engine/Utilities/Dictionary';
import ISerializable from '../../Engine/Utilities/ISerializable';
import { rand, randomChoice } from '../../Engine/Utilities/Math';
import { CockType } from '../Body/Cock';
import Creature from '../Body/Creature';
import { LegType } from '../Body/Legs';
import Tail, { TailType } from '../Body/Tail';
import { generateUUID } from '../Utilities/Uuid';

export default abstract class Character extends Creature implements ISerializable<Character> {
    public charType: CharacterType;

    private UUID: string;
    public get uuid(): string {
        return this.UUID;
    }

    protected description: CharacterDescription;
    public get desc(): CharacterDescription {
        return this.description;
    }

    public constructor(type: CharacterType) {
        super();
        this.charType = type;
        this.UUID = generateUUID();
        this.description = new CharacterDescription(this);
        if (type !== CharacterType.Player) {
            this.stats.XP = this.totalXP();
        }
    }

    public serialize(): string {
        return JSON.stringify({
            charType: this.charType,
            UUID: this.UUID,
            desc: this.desc.serialize(),
        });
    }

    public deserialize(saveObject: Character) {
        this.charType = saveObject.charType;
        this.UUID = saveObject.UUID;
        this.desc.deserialize(saveObject.desc);
        super.deserialize(saveObject);
    }

    public update(hours: number) {
        this.pregnancy.update(hours);
        this.regeneration();
    }

    private totalXP(): number {
        const playerLevel = this.stats.level;
        // 1) Nerf xp gains by 20% per level after first two level difference
        // 2) No bonuses for underlevel!
        // 3) Super high level folks (over 10 levels) only get 1 xp!
        let difference: number = playerLevel - this.stats.level;
        if (difference <= 2) difference = 0;
        else difference -= 2;
        if (difference > 4) difference = 4;
        difference = (5 - difference) * 20.0 / 100.0;
        if (playerLevel - this.stats.level > 10) return 1;
        return Math.round(this.stats.additionalXP + (this.baseXP() + this.bonusXP()) * difference);
    }

    private baseXP(): number {
        return [200, 10, 20, 30, 40, 50, 55, 60, 66, 75, // 0-9
            83, 85, 92, 100, 107, 115, 118, 121, 128, 135, // 10-19
            145][Math.round(this.stats.level)] || 200;
    }

    private bonusXP(): number {
        return rand([200, 10, 20, 30, 40, 50, 55, 58, 66, 75,
            83, 85, 85, 86, 92, 94, 96, 98, 99, 101,
            107][Math.round(this.stats.level)] || 130);
    }

    private regeneration() {
        let healingPercent = 0;
        if (healingPercent > 10) healingPercent = 10;
        this.stats.HP += Math.round(this.stats.maxHP() * healingPercent / 100);
    }

    public modCumMultiplier(delta: number): number {
        if (delta === 0) {
            return delta;
        }
        this.cumMultiplier += delta;
        return delta;
    }

    public orgasm(): void {
        this.stats.lustNoResist = 0;
        this.hoursSinceCum = 0;
    }

    // commented out for reminder that isNaga can no longer be checked here
    public hasLongTail(): boolean {
        if (this.torso.hips.legs.type === LegType.NAGA)
            return true;
        return this.torso.tails.filter((tail) => {
            switch (tail.type) {
                case TailType.DOG:
                case TailType.DEMONIC:
                case TailType.COW:
                case TailType.SHARK:
                case TailType.CAT:
                case TailType.LIZARD:
                case TailType.KANGAROO:
                case TailType.FOX:
                case TailType.DRACONIC:
                    return true;
                default:
                    return false;
            }
        }).length > 0;
    }

    public canOvipositSpider(): boolean {
        return this.pregnancy.ovipositor.canOviposit() && this.torso.hips.legs.isDrider() && this.torso.tails.filter(Tail.FilterType(TailType.SPIDER_ABDOMEN)).length > 0;
    }

    public canOvipositBee(): boolean {
        return this.pregnancy.ovipositor.canOviposit() && this.torso.tails.filter(Tail.FilterType(TailType.BEE_ABDOMEN)).length > 0;
    }
}
