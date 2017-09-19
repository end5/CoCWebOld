import Flags, { FlagEnum } from "../Game/Flags";
import Body from "./Body";
import { SaveInterface } from "../SaveInterface";

export default class Stats implements SaveInterface {
    private body: Body;
    //Primary stats
    private _str: number;
    private _tou: number;
    private _spe: number;
    private _int: number;
    private _lib: number;
    private _sens: number;
    private _cor: number;
    private _fatigue: number;

    //Special modifiers
    public lustResisted: boolean;
    public bimboIntReduction: boolean;

    //Combat Stats
    private _HP: number;
    private _lust: number;

    //Level Stats
    public XP: number;
    public level: number;
    public gems: number;
    public additionalXP: number;

    public constructor(body: Body) {
        this.body = body;
        this._str = 0;
        this._tou = 0;
        this._spe = 0;
        this._int = 0;
        this._lib = 0;
        this._sens = 0;
        this._cor = 0;
        this._fatigue = 0;

        //Special modifiers
        this.lustResisted = true;
        this.bimboIntReduction = false;

        //Combat Stats
        this._HP = 0;
        this._lust = 0;

        //Level Stats
        this.XP = 0;
        this.level = 0;
        this.gems = 0;
        this.additionalXP = 0;
    }

    public get str(): number {
        return this._str;
    }

    public set str(value: number) {
        if (this.body.perks.has("ChiReflowSpeed")) {
            if (this._str > UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP) {
                this._str = UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP;
            }
        }

        this._str += value;

        if (this.body.perks.has("Strong") && value >= 0)
            this._str += value * this.body.perks.get("Strong").value1;
    }

    public setStr(value: number) {
        this._str = value;
    }

    public get tou(): number {
        return this._tou;
    }

    public set tou(value: number) {

        this._tou += value

        if (this.body.perks.has("Tough") && value >= 0)
            this._tou += value * this.body.perks.get("Tough").value1;
    }

    public setTou(value: number) {
        this._tou = value;
    }

    public get spe(): number {
        return this._spe;
    }

    public set spe(value: number) {
        if (this.body.perks.has("ChiReflowSpeed") && value < 0)
            value *= UmasShop.NEEDLEWORK_SPEED_SPEED_MULTI;
        if (this.body.perks.has("ChiReflowDefense")) {
            if (this._spe > UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP) {
                this._spe = UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP;
            }
        }

        this._spe += value;

        if (this.body.perks.has("Fast") && value >= 0)
            this._spe += value * this.body.perks.get("Fast").value1;
    }

    public setSpe(value: number) {
        this._spe = value;
    }

    public get int(): number {
        return this._int;
    }

    public set int(value: number) {
        if (!this.bimboIntReduction)
            if (this.body.perks.has("FutaFaculties") || this.body.perks.has("BimboBrains") || this.body.perks.has("BroBrains")) {
                if (value > 0)
                    value /= 2;
                if (value < 0)
                    value *= 2;
            }

        this.bimboIntReduction = false;

        this._int += value;

        if (this.body.perks.has("Smart") && value >= 0)
            this._int += value * this.body.perks.get("Smart").value1;
    }

    public setInt(value: number) {
        this._int = value;
    }

    public get lib(): number {
        return this._lib;
    }

    public set lib(value: number) {
        if (!this.bimboIntReduction)
            if (this.body.perks.has("FutaForm") || this.body.perks.has("BimboBody") || this.body.perks.has("BroBody")) {
                if (value > 0)
                    value *= 2;
                if (value < 0)
                    value /= 2;
            }
        if (this.body.perks.has("ChiReflowLust") && value > 0)
            value *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;
        if (value > 0 && this.body.perks.has("PurityBlessing"))
            value *= 0.75;

        this.bimboIntReduction = false;

        this._lib += value;

        if (this.body.perks.has("Lusty") && value >= 0)
            this._lib += value * this.body.perks.get("Lusty").value1;
        if (this._lib < 50 && this.body.perks.has("lusty maiden's armor"))
            this._lib = 50;
        else if (this._lib < 15 && this.body.gender > 0)
            this._lib = 15;
        else if (this._lib < 10 && this.body.gender == 0)
            this._lib = 10;
        if (this._lib < minLust() * 2 / 3)
            this._lib = minLust() * 2 / 3;
    }

    public setLib(value: number) {
        this._lib = value;
    }

    public get sens(): number {
        return this._sens;
    }

    public set sens(value: number) {
        if (this.body.perks.has("ChiReflowLust") && value > 0)
            value *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;

        if (this._sens > 50 && value > 0) value /= 2;
        if (this._sens > 75 && value > 0) value /= 2;
        if (this._sens > 90 && value > 0) value /= 2;
        if (this._sens > 50 && value < 0) value *= 2;
        if (this._sens > 75 && value < 0) value *= 2;
        if (this._sens > 90 && value < 0) value *= 2;

        this._sens += value;

        if (this.body.perks.has("Sensitive") && value >= 0)
            this._sens += value * this.body.perks.get("Sensitive").value1;
    }

    public setSens(value: number) {
        this._sens = value;
    }

    public get cor(): number {
        return this._cor;
    }

    public set cor(value: number) {
        if (value > 0 && this.body.perks.has("PurityBlessing"))
            value *= 0.5;
        if (value > 0 && this.body.perks.has("PureAndLoving"))
            value *= 0.75;

        this._cor += value;
    }

    public setCor(value: number) {
        this._cor = value;
    }

    public get fatigue(): number {
        return this._fatigue;
    }

    public set fatigue(value: number) {

        this._fatigue += value;
    }

    public setFatigue(value: number) {
        this._fatigue = value;
    }

    public get HP(): number {
        return this._HP;
    }

    public set HP(value: number) {

        this._HP += value;


        //Add HP for toughness change.
        HPChange(toug * 2, false);
        //Reduce hp if over max
        if (this._HP > maxHP())
            this._HP = maxHP();
    }

    public setHP(value: number) {
        this._HP = value;
    }

    public get lust(): number {
        return this._lust;
    }

    public set lust(value: number) {
        if (Flags.get(FlagEnum.EASY_MODE_ENABLE_FLAG) == 1 && value > 0 && this.lustResisted)
            value /= 2;
        if (value > 0 && this.lustResisted)
            value *= lustPercent() / 100;

        this.lustResisted = true;

        this._lust += value;

        if (this._lust < 0)
            this._lust = 0;
        if (this._lust > 99)
            this._lust = 100;
        if (this._lust < minLust())
            this._lust = minLust();
        if (this.body.statusAffects.has("Infested"))
            if (this._lust < 50)
                this._lust = 50;
    }

    public setLust(value: number) {
        this._lust = value;
    }

    public minLust(): number {
        let min: number = 0;
        //Bimbo body boosts minimum lust by 40
        if (this.body.statusAffects.has("BimboChampagne") || this.body.perks.has("BimboBody") || this.body.perks.has("BroBody") || this.body.perks.has("FutaForm")) {
            if (min > 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 40;
        }
        //Omnibus' Gift
        if (this.body.perks.has("OmnibusGift")) {
            if (min > 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 35;
        }
        //Nymph perk raises to 30
        if (this.body.perks.has("Nymphomania")) {
            if (min >= 40) min += 10;
            else if (min >= 20) min += 15;
            else min += 30;
        }
        //Oh noes anemone!
        if (this.body.statusAffects.has("AnemoneArousal")) {
            if (min >= 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 30;
        }
        //Hot blooded perk raises min lust!
        if (this.body.perks.has("HotBlooded")) {
            if (min > 0)
                min += this.body.perks.get("HotBlooded").value1 / 2;
            else
                min += this.body.perks.get("HotBlooded").value1;
        }
        if (this.body.perks.has("LuststickAdapted")) {
            if (min < 50) min += 10;
            else min += 5;
        }
        //Add points for Crimstone
        min += this.body.perks.get("PiercedCrimstone").value1;
        min += this.body.perks.get("PentUp").value1;
        //Harpy Lipstick status forces minimum lust to be at least 50.
        if (min < 50 && this.body.statusAffects.has("Luststick")) min = 50;
        //SHOULDRA BOOSTS
        //+20
        if (Flags.get(FlagEnum.SHOULDRA_SLEEP_TIMER) <= -168) {
            min += 20;
            if (Flags.get(FlagEnum.SHOULDRA_SLEEP_TIMER) <= -216)
                min += 30;
        }
        //SPOIDAH BOOSTS
        if (this.body.lowerBody.hasOvipositor() && this.body.lowerBody.ovipositor.eggs >= 20) {
            min += 10;
            if (this.body.lowerBody.ovipositor.eggs >= 40)
                min += 10;
        }
        if (min < 30 && this.body.perks.has("lusty maiden's armor"))
            min = 30;
        return min;
    }

    public maxHP(): number {
        let max: number = 0;
        max += Math.floor(this._tou * 2 + 50);
        if (this.body.perks.has("Tank"))
            max += 50;
        if (this.body.perks.has("Tank2"))
            max += Math.round(this._tou);
        if (this.body.perks.has("ChiReflowDefense"))
            max += UmasShop.NEEDLEWORK_DEFENSE_EXTRA_HP;
        if (this.level <= 20)
            max += this.level * 15;
        else
            max += 20 * 15;
        max = Math.round(max);
        if (max > 999)
            max = 999;
        return max;

    }

    saveKey: string = "Stats";
    save(): object {
        let saveObject: object;
        saveObject["body"] = this.body;
        saveObject["_str"] = this._str;
        saveObject["_tou"] = this._tou;
        saveObject["_spe"] = this._spe;
        saveObject["_int"] = this._int;
        saveObject["_lib"] = this._lib;
        saveObject["_sens"] = this._sens;
        saveObject["_cor"] = this._cor;
        saveObject["_fatigue"] = this._fatigue;
        saveObject["_HP"] = this._HP;
        saveObject["_lust"] = this._lust;
        saveObject["lustResisted"] = this.lustResisted;
        saveObject["XP"] = this.XP;
        saveObject["level"] = this.level;
        saveObject["gems"] = this.gems;
        saveObject["additionalXP"] = this.additionalXP;
        return saveObject;
    }
    load(saveObject: object) {
        this.body = saveObject["body"];
        this._str = saveObject["_str"];
        this._tou = saveObject["_tou"];
        this._spe = saveObject["_spe"];
        this._int = saveObject["_int"];
        this._lib = saveObject["_lib"];
        this._sens = saveObject["_sens"];
        this._cor = saveObject["_cor"];
        this._fatigue = saveObject["_fatigue"];
        this._HP = saveObject["_HP"];
        this._lust = saveObject["_lust"];
        this.lustResisted = saveObject["lustResisted"];
        this.XP = saveObject["XP"];
        this.level = saveObject["level"];
        this.gems = saveObject["gems"];
        this.additionalXP = saveObject["additionalXP"];
    }

}