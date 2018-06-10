import BreastRow, { BreastCup } from '../../Body/BreastRow';
import { ButtLooseness, ButtRating, ButtWetness } from '../../Body/Butt';
import Cock, { CockType } from '../../Body/Cock';
import { HairType } from '../../Body/Hair';
import { HipRating } from '../../Body/Hips';
import Vagina, { VaginaLooseness, VaginaType, VaginaWetness } from '../../Body/Vagina';
import Character from '../../Character/Character';
import Description from '../../Character/CharacterDescription';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Armor from '../../Items/Armors/Armor';
import ArmorName from '../../Items/Armors/ArmorName';
import Weapon from '../../Items/Weapons/Weapon';
import WeaponName from '../../Items/Weapons/WeaponName';
import { Utils } from '../../Utilities/Utils';

export class Anemone extends Character {
    public eAttack(): void {
        DisplayText("Giggling playfully, the anemone launches several tentacles at you.  Most are aimed for your crotch, but a few attempt to caress your chest and face.\n");
        super.eAttack();
    }

    public eOneAttack(): number {
        applyVenom(randInt(4 + player.stats.sens / 20) + 1);
        return 1;
    }

    //Apply the effects of AnemoneVenom()
    public applyVenom(str: number = 1): void {
        //First application
        if (!player.statusAffects.has(StatusAffectType.AnemoneVenom)) player.statusAffects.add(StatusAffectType.AnemoneVenom, 0, 0, 0, 0);
        //Gain some lust
        game.dynStats("lus", (2 * str));

        //Loop through applying 1 point of venom at a time.
        while (str > 0) {
            str--;
            //Str bottommed out, convert to lust
            if (player.stats.str < 2) game.player.stats.lust += 2;
            //Lose a point of str.
            else {
                showStatDown("str");
                // strDown.visible = true;
                // strUp.visible = false;
                player.stats.str--;
                player.statusAffects.get(StatusAffectType.AnemoneVenom).value1 = 1;
            }
            //Spe bottomed out, convert to lust
            if (player.stats.spe < 2) game.player.stats.lust += 2;
            //Lose a point of spe.
            else {
                showStatDown("spe");
                // speDown.visible = true;
                // speUp.visible = false;
                player.stats.spe--;
                player.statusAffects.get(StatusAffectType.AnemoneVenom).value2 = 1;
            }
        }
        game.statScreenRefresh();
    }


    public defeated(hpVictory: boolean): void {
        game.anemoneScene.defeatAnemone();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            DisplayText("\n\nYour foe doesn't seem to mind at all...");
            return { next: game.endLustLoss };
        } else {
            game.anemoneScene.loseToAnemone();
        }
    }

    public outputAttack(damage: number): void {
        DisplayText("You jink and dodge valiantly but the tentacles are too numerous and coming from too many directions.  A few get past your guard and caress your skin, leaving a tingling, warm sensation that arouses you further.");
    }

    public constructor() {
        super(CharacterType.Anemone);
        this.description = new Description(this, "anemone", "The anemone is a blue androgyne humanoid of medium height and slender build, with colorful tentacles sprouting on her head where hair would otherwise be.  Her feminine face contains two eyes of solid color, lighter than her skin.  Two feathery gills sprout from the middle of her chest, along the line of her spine and below her collarbone, and drape over her pair of small B-cup breasts.  Though you wouldn't describe her curves as generous, she sways her girly hips back and forth in a way that contrasts them to her slim waist quite attractively.  Protruding from her groin is a blue shaft with its head flanged by diminutive tentacles, and below that is a dark-blue pussy ringed by small feelers.  Further down are a pair of legs ending in flat sticky feet; proof of her aquatic heritage.  She smiles broadly and innocently as she regards you from her deep eyes.", false, "the ");
        this.torso.cocks.add(new Cock(CockType.ANEMONE, 7, 1));
        this.torso.vaginas.add(new Vagina(VaginaType.HUMAN, VaginaWetness.SLICK, VaginaLooseness.LOOSE, false));
        this.statusAffects.add(StatusAffectType.BonusVCapacity, 5, 0, 0, 0);
        this.torso.chest.add(new BreastRow(BreastCup.B));
        this.torso.butt.looseness = ButtLooseness.NORMAL;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 10, 0, 0, 0);
        this.tallness = 5 * 12 + 5;
        this.torso.hips.rating = HipRating.CURVY;
        this.torso.butt.rating = ButtRating.NOTICEABLE;
        this.skin.tone = "purple";
        this.torso.neck.head.hair.color = "purplish-black";
        this.torso.neck.head.hair.length = 20;
        this.torso.neck.head.hair.type = HairType.ANEMONE;
        this.baseStats.str = 40;
        this.baseStats.tou = 20;
        this.baseStats.spe = 40;
        this.baseStats.int = 50;
        this.baseStats.lib = 55;
        this.baseStats.sens = 35;
        this.baseStats.cor = 50;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("tendrils" as WeaponName, undefined, "tendrils", "tentacle", 5, 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("clammy skin" as ArmorName, undefined, "clammy skin", 0, 0));
        this.baseStats.bonusHP = 120;
        this.baseStats.lust = 30;
        this.baseStats.lustVuln = .9;
        this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
        this.baseStats.level = 4;
        this.inventory.gems = randInt(5) + 1;
        this.combat.rewards.drop = new WeightedDrop(consumables.DRYTENT, 1);
    }
}
