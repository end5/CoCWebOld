import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class WetCloth extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.text("You take the wet cloth in hand and rub it over your body, smearing the strange slime over your " + player.skinDesc + " slowly.", true);
        //Stat changes
        //libido up to 80
        if (player.stats.lib < 80) {
            dynStats("lib", (.5 + (90 - player.stats.lib) / 10), "lus", player.stats.lib / 2);
            MainScreen.text("\n\nBlushing and feeling horny, you make sure to rub it over your chest and erect nipples, letting the strange slimy fluid soak into you.", false);
        }
        //sensitivity moves towards 50
        if (player.stats.sens < 50) {
            MainScreen.text("\n\nThe slippery slime soaks into your " + player.skinDesc + ", making it tingle with warmth, sensitive to every touch.", false);
            dynStats("sen", 1);
        }
        else if (player.stats.sens > 50) {
            MainScreen.text("\n\nThe slippery slime numbs your " + player.skinDesc + " slightly, leaving behind only gentle warmth.", false);
            dynStats("sen", -1);
        }
        /*Calculate goopiness
         let goopiness:number = 0;
         if(player.skinType == SKIN.GOO) goopiness+=2;
         if(player.hair.indexOf("gooey") != -1) goopiness++;
         if(player.lowerBody.vaginaSpot.hasVagina()) {
         if(player.vaginalCapacity() >= 9000) goopiness++;
         }*/
        //Cosmetic changes based on 'goopyness'
        //Remove wings
        if (player.upperBody.wingType > WING.NONE) {
            if (player.upperBody.wingType == WING.SHARK_FIN) MainScreen.text("\n\nYou sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your fin slowly turn to sludge, dripping to the ground as your body becomes more goo-like.", false);
            else MainScreen.text("\n\nYou sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your wings slowly turn to sludge, dripping to the ground as your body becomes more goo-like.", false);
            player.upperBody.wingType = WING.NONE;
            return;
        }
        //Goopy hair
        if (player.upperBody.head.hairType != 3) {
            player.upperBody.head.hairType = 3;
            //if bald
            if (player.hairLength <= 0) {
                MainScreen.text("\n\nYour head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover you've grown some kind of gooey hair.  From time to time it drips, running down your back to the crack of your " + buttDescript() + ".", false);
                player.hairLength = 5;
            }
            else {
                //if hair isnt rubbery or latexy
                if (player.hairColor.indexOf("rubbery") == -1 && player.hairColor.indexOf("latex-textured") == -1) {
                    MainScreen.text("\n\nYour head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover your hair has become a slippery, gooey mess.  From time to time it drips, running down your back to the crack of your " + buttDescript() + ".", false);
                }
                //Latexy stuff
                else {
                    MainScreen.text("\n\nYour oddly inorganic hair shifts, becoming partly molten as rivulets of liquid material roll down your back.  How strange.", false);
                }
            }
            if (player.hairColor != "green" && player.hairColor != "purple" && player.hairColor != "blue" && player.hairColor != "cerulean" && player.hairColor != "emerald") {
                MainScreen.text("  Stranger still, the hue of your semi-liquid hair changes to ");
                let blah: number = Utils.rand(10);
                if (blah <= 2) player.hairColor = "green";
                else if (blah <= 4) player.hairColor = "purple";
                else if (blah <= 6) player.hairColor = "blue";
                else if (blah <= 8) player.hairColor = "cerulean";
                else player.hairColor = "emerald";
                MainScreen.text(player.hairColor + ".");
            }
            dynStats("lus", 10);
            return;
        }
        //1.Goopy skin
        if (player.upperBody.head.hairType == 3 && (player.skinDesc != "skin" || player.skinAdj != "slimy")) {
            if (player.skinType == SKIN.PLAIN) MainScreen.text("\n\nYou sigh, feeling your " + player.armorName + " sink into you as your skin becomes less solid, gooey even.  You realize your entire body has become semi-solid and partly liquid!", false);
            else if (player.skinType == SKIN.FUR) MainScreen.text("\n\nYou sigh, suddenly feeling your fur become hot and wet.  You look down as your " + player.armorName + " sinks partway into you.  With a start you realize your fur has melted away, melding into the slime-like coating that now serves as your skin.  You've become partly liquid and incredibly gooey!", false);
            else if (player.skinType == SKIN.SCALES) MainScreen.text("\n\nYou sigh, feeling slippery wetness over your scales.  You reach to scratch it and come away with a slippery wet coating.  Your scales have transformed into a slimy goop!  Looking closer, you realize your entire body has become far more liquid in nature, and is semi-solid.  Your " + player.armorName + " has even sunk partway into you.", false);
            else if (player.skinType > SKIN.GOO) MainScreen.text("\n\nYou sigh, feeling your " + player.armorName + " sink into you as your " + player.skinDesc + " becomes less solid, gooey even.  You realize your entire body has become semi-solid and partly liquid!", false);
            player.skinType = SKIN.GOO;
            player.skinDesc = "skin";
            player.skinAdj = "slimy";
            if (player.skinTone != "green" && player.skinTone != "purple" && player.skinTone != "blue" && player.skinTone != "cerulean" && player.skinTone != "emerald") {
                MainScreen.text("  Stranger still, your skintone changes to ");
                let blaht: number = Utils.rand(10);
                if (blaht <= 2) player.skinTone = "green";
                else if (blaht <= 4) player.skinTone = "purple";
                else if (blaht <= 6) player.skinTone = "blue";
                else if (blaht <= 8) player.skinTone = "cerulean";
                else player.skinTone = "emerald";
                MainScreen.text(player.skinTone + "!");
            }
            return;
        }
        ////1a.Make alterations to dick/vaginal/nippular descriptors to match
        //DONE EXCEPT FOR TITS & MULTIDICKS (UNFINISHED KINDA)
        //2.Goo legs
        if (player.skinAdj == "slimy" && player.skinDesc == "skin" && player.lowerBody != LOWER_BODY.GOO) {
            MainScreen.text("\n\nYour viewpoint rapidly drops as everything below your " + buttDescript() + " and groin melts together into an amorphous blob.  Thankfully, you discover you can still roll about on your new slimey undercarriage, but it's still a whole new level of strange.", false);
            player.tallness -= 3 + Utils.rand(2);
            if (player.tallness < 36) {
                player.tallness = 36;
                MainScreen.text("  The goo firms up and you return to your previous height.  It would truly be hard to get any shorter than you already are!", false);
            }
            player.lowerBody = LOWER_BODY.GOO;
            return;
        }
        //3a. Grow vagina if none
        if (!player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("\n\nA wet warmth spreads through your slimey groin as a narrow gash appears on the surface of your groin.  <b>You have grown a vagina.</b>", false);
            player.createVagina();
            player.vaginas[0].vaginalWetness = VAGINA_WETNESS.DROOLING;
            player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.GAPING;
            player.lowerBody.vaginaSpot.list[0].clitLength = .4;
            player.genderCheck();
            return;

        }
        //3b.Infinite Vagina
        if (player.vaginalCapacity() < 9000) {
            if (player.findStatusAffect(StatusAffects.BonusVCapacity) < 0) player.statusAffects.add(new StatusAffect("BonusVCapacity", 9000, 0, 0, 0)));
            else player.statusAffects.get("BonusVCapacity").value1 = 9000;
            MainScreen.text("\n\nYour " + vaginaDescript(0) + "'s internal walls feel a tingly wave of strange tightness.  Experimentally, you slip a few fingers, then your hand, then most of your forearm inside yourself.  <b>It seems you're now able to accommodate just about ANYTHING inside your sex.</b>", false);
            return;
        }
        else if (player.tallness < 100 && Utils.rand(3) <= 1) {
            MainScreen.text("\n\nYour gel-like body swells up from the intake of additional slime.  If you had to guess, you'd bet you were about two inches taller.", false);
            player.tallness += 2;
            dynStats("str", 1, "tou", 1);
        }
        //Big slime girl
        else {
            if (player.findStatusAffect(StatusAffects.SlimeCraving) < 0) {
                MainScreen.text("\n\nYou feel a growing gnawing in your gut.  You feel... hungry, but not for food.  No, you need something wet and goopy pumped into you.  You NEED it.  You can feel it in your bones.  <b>If you don't feed that need... you'll get weaker and maybe die.</b>", false);
                player.statusAffects.add(new StatusAffect("SlimeCraving", 0, 0, 0, 1))); //Value four indicates this tracks strength and speed separately
            }
            else {
                MainScreen.text("\n\nYou feel full for a moment, but you know it's just a temporary respite from your constant need to be 'injected' with fluid.", false);
                player.changeStatusValue(StatusAffects.SlimeCraving, 1, 0);
            }
        }
        if (Utils.rand(2) == 0) MainScreen.text(player.modFem(85, 3), false);
        if (Utils.rand(2) == 0) MainScreen.text(player.modThickness(20, 3), false);
        if (Utils.rand(2) == 0) MainScreen.text(player.modTone(15, 5), false);
    }
}