import Armor, { GenericArmor } from './Armor';
import { GenericArmorWithPerk } from './ArmorWithPerk';
import ComfortableClothes from './ComfortableClothes';
import GooArmor from './GooArmor';
import InquisitorsCorset from './InquisitorsCorset';
import InquisitorsRobes from './InquisitorsRobes';
import LeatherArmorSegments from './LeatherArmorSegments';
import LustyMaidensArmor from './LustyMaidensArmor';
import SeductiveArmor from './SeductiveArmor';
import SluttySwimwear from './SluttySwimwear';
import Perk from '../../Effects/Perk';
import KeyedLibrary from '../../Utilities/Library';
import ItemDesc from '../ItemDesc';

// key: string, shortName: string, displayname: string, longName: string, defense: number, value: number = 0, description: string = null, armorClass: ArmorClass = "Light", supportsBulge: boolean = false
export default class ArmorLib extends KeyedLibrary<Armor> {
    public constructor() {
        super();
        this.add(new GenericArmor("c.under", new ItemDesc("c.under", "comfortable underclothes", "comfortable underclothes"), "comfortable underclothes", 0, 0, ""));

        this.add(new GenericArmor(
            "AdvClth",
            new ItemDesc("G. Clothes", "a green adventurer's outfit, complete with pointed cap", "A set of comfortable green adventurer's clothes.  It even comes complete with a pointy hat!"),
            "green adventurer's clothes", 2, 200, "Light", true
        ));
        this.add(new GenericArmor(
            "B.Dress",
            new ItemDesc("Long Dress", "a ballroom dress patterned with sequins", "A long ballroom dress patterned with sequins.  Perfect for important occassions."),
            "long ballroom dress patterned with sequins", 0, 1200, "Medium"
        ));
        this.add(new GenericArmor(
            "BeeArmr",
            new ItemDesc("BeeArmr", "a set of chitinous armor", "A suit of armor cleverly fashioned from giant bee chitin."),
            "sexy black chitin armor-plating", 18, 200, "", true
        ));
        this.add(new GenericArmorWithPerk(
            "BimboSk",
            new ItemDesc("BimboSk", "a skirt that looks like it belongs on a bimbo", "A tight, cleavage-inducing halter top and an extremely short miniskirt.  The sexual allure of this item is undoubtable."),
            "bimbo skirt", 1, 50, "Light",
            new Perk("SluttySeduction", 10, 0, 0, 0), "Your delightfully slutty yet upbeat garb helps you seduce your foes!"
        ));
        this.add(new GenericArmorWithPerk(
            "BonStrp",
            new ItemDesc("BonStrp", "a set of bondage straps", "These leather straps and well-placed hooks are actually designed in such a way as to be worn as clothing.  While they technically would cover your naughty bits, virtually every other inch of your body would be exposed."),
            "barely-decent bondage straps", 0, 600, "Light",
            new Perk("SluttySeduction", 10, 0, 0, 0), "Your fetishy bondage outfit allows you access to an improved form of 'Tease'."
        ));
        this.add(new ComfortableClothes());
        this.add(new GenericArmorWithPerk(
            "ChBikni",
            new ItemDesc("Chn Bikini", "a chainmail bikini", "A revealing chainmail bikini that barely covers anything.  The bottom half is little more than a triangle of metal and a leather thong."),
            "revealing chainmail bikini", 2, 700, "Light",
            new Perk("SluttySeduction", 5, 0, 0, 0), "Your revealing chain bikini allows you access to 'Seduce', an improved form of 'Tease'.", true
        ));
        this.add(new GenericArmor(
            "ClssyCl",
            new ItemDesc("Suitclothes", "a set of classy suit-clothes", "A set of classy suitclothes."),
            "classy suitclothes", 1, 400, "Light"
        ));
        this.add(new GenericArmor(
            "FullChn",
            new ItemDesc("Full Chain", "a full suit of chainmail armor", "This full suit of chainmail armor covers its wearer from head to toe in protective steel rings."), "full-body chainmail", 8, 150, "Medium", true
        ));
        this.add(new GenericArmor(
            "FullPlt",
            new ItemDesc("Full Plate", "a suit of full-plate armor", "A highly protective suit of steel platemail.  It would be hard to find better physical protection than this."),
            "full platemail", 21, 250, "", true
        ));
        //Not used in game:		this.add(new FurLoincloth());
        this.add(new GenericArmor(
            "GelArmr",
            new ItemDesc("GelArmr", "a suit of gel armor", "This suit of interlocking plates is made from a strange green material.  It feels spongy to the touch but is amazingly resiliant.  (DEF: +10) (Cost: 150)"),
            "glistening gel-armor plates", 10, 150, "", true
        ));
        this.add(new GooArmor());
        this.add(new InquisitorsCorset());
        this.add(new InquisitorsRobes());
        this.add(new GenericArmorWithPerk(
            "IndecSt",
            new ItemDesc("Indec StAr", "a suit of practically indecent steel armor", "This suit of steel 'armor' has two round disks that barely cover the nipples, a tight chainmail bikini, and circular butt-plates."),
            "practically indecent steel armor", 5, 800, "Medium",
            new Perk("SluttySeduction", 6, 0, 0, 0), "Your incredibly revealing steel armor allows you access to 'Seduce', an improved form of 'Tease'.", true
        ));
        this.add(new GenericArmor(
            "LeathrA",
            new ItemDesc("LeathrA", "a set of leather armor", "This is a suit of well-made leather armor.  It looks fairly rugged. (+5 Defense)"),
            "leather armor segments", 5, 76, "Light"
        ));
        this.add(new LeatherArmorSegments());
        this.add(new LustyMaidensArmor());
        this.add(new GenericArmor(
            "LthrPnt",
            new ItemDesc("T.Lthr Pants", "a pair of leather pants and a white silk shirt", "A flowing silk shirt and tight black leather pants.  Suave!"),
            "white silk shirt and tight leather pants", 0, 450, "Light"
        ));
        this.add(new GenericArmor(
            "LthrRob",
            new ItemDesc("Lthr Robes", "a suit of black leather armor with voluminous robes", "This is a suit of flexible leather armor with a voluminous set of concealing black robes."),
            "black leather armor surrounded by voluminous robes", 6, 100, "Light", true
        ));
        this.add(new GenericArmor(
            "M.Robes",
            new ItemDesc("Robes", "a set of modest robes", "A set of modest robes, not dissimilar from what the monks back home would wear."),
            "modest robes", 0, 120, "Light"
        ));
        this.add(new GenericArmorWithPerk(
            "NurseCl",
            new ItemDesc(
                "NurseCl", "a nurse's outfit", "This borderline obscene nurse's outfit would barely cover your hips and crotch.  The midriff is totally exposed, and the white top leaves plenty of room for cleavage.  A tiny white hat tops off the whole ensemble."),
            "skimpy nurse's outfit", 0, 800, "Light",
            new Perk("SluttySeduction", 8, 0, 0, 0), "Your fetishy nurse outfit allows you access to an improved form of 'Tease'."
        ));
        this.add(new GenericArmor(
            "Overall",
            new ItemDesc("Overalls", "a white shirt and overalls", "A simple white shirt and overalls."),
            "white shirt and overalls", 0, 60, "Light", true
        ));
        this.add(new GenericArmor(
            "R.BdySt",
            new ItemDesc("R.BdySt", "a red bodysuit for high society", "A high society bodysuit. It is as easy to mistake it for ballroom apparel as it is for boudoir lingerie. The thin transparent fabric is so light and airy that it makes avoiding blows a second nature."),
            "red, high-society bodysuit", 1, 1200, "Light", true
        ));
        this.add(new GenericArmorWithPerk(
            "RbbrClt",
            new ItemDesc("Rbbr Fetish", "a set of revealing rubber fetish clothes", "A revealing set of fetish-wear.  Upgrades your tease attack with the \"Slutty Seduction\" perk."),
            "rubber fetish clothes", 3, 1000, "Light",
            new Perk("SluttySeduction", 8, 0, 0, 0), "Your fetishy rubberwear allows you access to 'Seduce', an improved form of 'Tease'.", true
        ));
        this.add(new SluttySwimwear());
        this.add(new GenericArmor(
            "ScaleMl",
            new ItemDesc("Scale Mail", "a set of scale-mail armor", "This suit of scale-mail covers the entire body with layered steel scales, providing flexibility and protection."),
            "scale-mail armor", 12, 170, "", true
        ));
        this.add(new SeductiveArmor());
        this.add(new GenericArmorWithPerk(
            "SS.Robe",
            new ItemDesc("SS.Robe", "a spider-silk robes", "This robe looks incredibly comfortable.  It's made from alchemically enhanced spider-silk, and embroidered with what looks like magical glyphs around the sleeves and hood."),
            "spider-silk robes", 6, 950, "Light",
            new Perk("WizardsEndurance", 30, 0, 0, 0)
        ));
        this.add(new GenericArmor(
            "SSArmor",
            new ItemDesc("SSArmor", "a suit of spider-silk armor", "This armor is as white as the driven snow.  It's crafted out of thousands of strands of spider-silk into an impenetrable protective suit.  The surface is slightly spongy, but so tough you wager most blows would bounce right off."),
            "spider-silk armor", 25, 950, "", true
        ));
        this.add(new GenericArmorWithPerk(
            "T.BSuit",
            new ItemDesc("Bodysuit", "a semi-transparent, curve-hugging bodysuit", "A semi-transparent bodysuit."),
            "semi-transparent bodysuit", 0, 1300, "Light",
            new Perk("SluttySeduction", 7, 0, 0, 0), "Your clingy transparent bodysuit allows you access to 'Seduce', an improved form of 'Tease'."
        ));
        this.add(new GenericArmor(
            "TubeTop",
            new ItemDesc("Tube Top", "a snug tube top and VERY short shorts", "A clingy tube top and VERY short shorts."),
            "tube top and short shorts", 0, 80, "Light"
        ));
        this.add(new GenericArmorWithPerk(
            "W.Robes",
            new ItemDesc("W.Robes", "a wizard's robes", "These robes appear to have once belonged to a female wizard.  They're long with a slit up the side and full billowing sleeves.  The top is surprisingly low cut.  Somehow you know wearing it would aid your spellcasting."),
            "wizard's robes", 1, 50, "Light",
            new Perk("WizardsEndurance", 25, 0, 0, 0)
        ));
    }
}

