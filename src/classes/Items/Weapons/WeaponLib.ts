import Library from "../Utilities/Library";
import Weapon from "./Weapon";
import Fists from "./Weapons/Fists";
import BeautifulSword from "./Weapons/BeautifulSword";
import LargeClaymore from "./Weapons/LargeClaymore";
import DragonShellShield from "./Weapons/DragonShellShield";
import EldritchStaff from "./Weapons/EldritchStaff";
import JeweledRapier from "./Weapons/JeweledRapier";
import LargeHammer from "./Weapons/LargeHammer";
import RaphaelsRapier from "./Weapons/RaphaelsRapier";
import Spellblade from "./Weapons/Spellblade";
import WizardsStaff from "./Weapons/WizardsStaff";
import HugeWarhammer from "./Weapons/HugeWarhammer";

export default class WeaponLib extends Library<Weapon>
{
    public constructor() {
	//public static const DEFAULT_VALUE:number = 6;

	//public static const FISTS:Fists = new Fists();
        super();
        this.add(new Fists());
		this.add(new BeautifulSword());
		this.add(new LargeClaymore());
		this.add(new DragonShellShield());
		this.add(new EldritchStaff());
		this.add(new Weapon("UrtaHlb","UrtaHlb","halberd","a halberd","slash",11,10,null,"Large"));
		this.add(new Weapon("H.Gaunt","H.Gaunt","hooked gauntlets","a set of hooked gauntlets","clawing punch",8,300,"These metal gauntlets are covered in nasty looking hooks that are sure to tear at your foes flesh and cause them harm."));
		this.add(new JeweledRapier());
		this.add(new Weapon("Katana ","Katana","katana","a katana","keen cut",10,500,"A curved bladed weapon that cuts through flesh with the greatest of ease. (ATK: 10) (Cost: 500)"));
		this.add(new Weapon("L. Axe ","L. Axe ","large axe","an axe large enough for a minotaur","cleave",15,100,"This massive axe once belonged to a minotaur.  It'd be hard for anyone smaller than a giant to wield effectively.  The axe is double-bladed and deadly-looking.  (ATK: +15) (Cost: 100)","Large"));
		this.add(new Weapon("L.Daggr","L.Daggr","lust-enchanted dagger","an aphrodisiac-coated dagger","stab",3,150,"A dagger with a short blade in a wavy pattern.  Its edge seems to have been enchanted to always be covered in a light aphrodisiac to arouse anything cut with it.","Aphrodisiac Weapon"));
		this.add(new LargeHammer());
		this.add(new Weapon("Pipe   ","Pipe   ","pipe","a pipe","smash",5,25,"This is a simple rusted pipe of unknown origins.  It's hefty and could probably be used as an effective bludgeoning tool. (ATK: +5) (Cost: 25)"));
		this.add(new Weapon("RidingC","RidingC","riding crop","a riding crop","whip-crack",5,50,"This riding crop appears to be made of black leather, and could be quite a painful (or exciting) weapon.  (ATK: +5) (Cost: 50)"));
		this.add(new RaphaelsRapier());
		this.add(new Spellblade());
		this.add(new Weapon("S.Gaunt","S.Gauntlet","spiked gauntlet","a spiked gauntlet","spiked punch",5,400,"This single metal gauntlet has the knuckles tipped with metal spikes.  Though it lacks the damaging potential of other weapons, the sheer pain of its wounds has a chance of stunning your opponent. (ATK: 5) (Cost: 400)"));
		this.add(new Weapon("Spear  ","Spear","deadly spear","a deadly spear","piercing stab",8,450,"A staff with a sharp blade at the tip designed to pierce through the toughest armor.  This would ignore most armors.  (ATK: 8) (Cost: 450)"));
		this.add(new Weapon("SucWhip","SucWhip","succubi whip","a succubi whip","sexy whipping",10,400,"This coiled length of midnight-black leather practically exudes lust.  Though it looks like it could do a lot of damage, the feel of that slick leather impacting flesh is sure to inspire lust."));
		this.add(new WizardsStaff());
		this.add(new HugeWarhammer());
		this.add(new Weapon("Whip   ","Whip","coiled whip","a coiled whip","whip-crack",5,500,"A coiled length of leather designed to lash your foes into submission.  There's a chance the bondage inclined might enjoy it! (ATK: 5) (Cost: 500)"));
	}
}
