import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';

export class ImpGang extends Character {
    public get capitalA(): string {
        return "gang of imps";
    }
    public constructor() {
        super(CharacterType.ImpGang)
        this.removeStatuses();
        this.removePerks();
        this.removeCock(0, this.cocks.length);
        this.removeVagina(0, this.vaginas.length);
        this.removeBreastRow(0, this.breastRows.length);
        this.createCock(12, 1.5);
        this.createCock(25, 2.5);
        this.createCock(25, 2.5);
        this.cocks[2].cockType = CockType.DOG;
        this.cocks[2].knotMultiplier = 2;
        this.balls = 2;
        this.ballSize = 3;
        this.a = "a mob of imps";
        this.short = "imp gang";
        this.skin.tone = "imp mob";
    }

}
