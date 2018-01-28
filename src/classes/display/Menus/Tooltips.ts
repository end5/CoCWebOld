export default class ToolTips {
    public getButtonToolTipText(buttonText: string): string {
        let toolTipText: string;

        buttonText = buttonText || '';

        // Items
        // if (/^....... x\d+$/.test(buttonText)){
        // 	buttonText = buttonText.substring(0,7);
        // }

        // Fuck your regex
        if (buttonText.indexOf(" x") !== -1) {
            buttonText = buttonText.split(" x")[0];
        }

        let itype: ItemType = ItemType.lookupItem(buttonText);
        if (itype != null) toolTipText = itype.description;
        itype = ItemType.lookupItemByShort(buttonText);
        if (itype != null) toolTipText = itype.description;
        if (buttonText.indexOf("Tail Whip") !== -1) {
            toolTipText = "Whip your foe with your tail to enrage them and lower their defense!";
        }
        if (buttonText.indexOf("Dual Belt") !== -1) {
            toolTipText = "This is a strange masturbation device, meant to work every available avenue of stimulation.";
        }
        if (buttonText.indexOf("C. Pole") !== -1) {
            toolTipText = "This 'centaur pole' as it's called appears to be a sex-toy designed for females of the equine persuasion.  Oddly, it's been sculpted to look like a giant imp, with an even bigger horse-cock.";
        }
        if (buttonText.indexOf("Fake Mare") !== -1) {
            toolTipText = "This fake mare is made of metal and wood, but the anatomically correct vagina looks as soft and wet as any female centaur's.";
        }
        // Combat
        // COMBAT
        // combat
        // wombat
        if (buttonText === "Attack") {
            if (!inCombat) toolTipText = "";
            else toolTipText = "Attempt to attack the enemy with your " + player.weaponName + ".  Damage done is determined by your strength and weapon.";
        }
        if (buttonText === "Kiss") {
            toolTipText = "Attempt to kiss your foe on the lips with drugged lipstick.  It has no effect on those without a penis.";
        }
        if (buttonText === "Tease") {
            if (!inCombat) toolTipText = "";
            else toolTipText = "Attempt to make an enemy more aroused by striking a seductive pose and exposing parts of your body.";
        }
        if (buttonText === "Kick") {
            toolTipText = "Attempt to kick an enemy using your powerful lower body.";
        }
        if (buttonText === "Combo") {
            toolTipText = "Make a three-hit combo.  Each attack has an extra 33% chance to miss, unless the target is blind. (25 Fatigue)";
        }
        if (buttonText === "Vault") {
            toolTipText = "Make a vaulting attack for an extra 25% damage.  Automatically crits stunned foes.  (20 Fatigue)";
        }
        if (buttonText === "Sidewinder") {
            toolTipText = "An attack that hits for reduced damage but has a high chance of stunning. (10 Fatigue)";
        }
        if (buttonText === "Dirt Kick") {
            toolTipText = "Attempt to blind your foe with a spray of kicked dirt. (5 Fatigue)";
        }
        if (buttonText === "Metabolize") {
            toolTipText = "Convert 10% of your maximum HP into fatigue.";
        }
        if (buttonText === "SecondWind") {
            toolTipText = "Regain 50% of your HP, 50 fatigue, and reduce lust by 50 once per fight.";
        }
        if (buttonText.indexOf("AnemoneSting") !== -1) {
            toolTipText = "Attempt to strike an opponent with the stinging tentacles growing from your scalp.  Reduces enemy speed and increases enemy lust.";
        }
        if (buttonText.indexOf("P. Specials") !== -1) {
            toolTipText = "Physical special attack menu.";
        }
        if (buttonText.indexOf("M. Specials") !== -1) {
            toolTipText = "Mental and supernatural special attack menu.";
        }
        if (buttonText === "Berzerk") {
            toolTipText = "Throw yourself into a rage!  Greatly increases the strength of your weapon and increases lust resistance, but your armor defense is reduced to zero!";
        }
        if (buttonText.indexOf("Possess") !== -1) {
            toolTipText = "Attempt to temporarily possess a foe and force them to raise their own lusts.";
        }
        if (buttonText.indexOf("Constrict") !== -1) {
            toolTipText = "Attempt to bind an enemy in your long snake-tail.";
        }
        if (buttonText.indexOf("Gore") !== -1) {
            toolTipText = "Lower your head and charge your opponent, attempting to gore them on your horns.  This attack is stronger and easier to land with large horns.";
        }
        if (buttonText.indexOf("Fantasize") !== -1) {
            toolTipText = "Fantasize about your opponent in a sexual way.  It's probably a pretty bad idea to do this unless you want to end up getting raped.";
        }
        if (buttonText.indexOf("Charge W.") !== -1) {
            toolTipText = "The Charge Weapon spell will surround your weapon in electrical energy, causing it to do even more damage.  The effect lasts for the entire combat.  (Fatigue Cost: " + spellCost(15) + ")";
        }
        if (buttonText.indexOf("Blind") !== -1) {
            toolTipText = "Blind is a fairly self-explanatory spell.  It will create a bright flash just in front of the victim's eyes, blinding them for a time.  However if they blink it will be wasted.  (Fatigue Cost: " + spellCost(20) + ")";
        }
        if (buttonText.indexOf("Whitefire") !== -1) {
            toolTipText = "Whitefire is a potent fire based attack that will burn your foe with flickering white flames, ignoring their physical toughness and most armors.  (Fatigue Cost: " + spellCost(30) + ")";
        }
        if (buttonText.indexOf("Aroused") !== -1) {
        }
        if (buttonText.indexOf("Arouse") !== -1) {
            if (!inCombat) toolTipText = "";
            else toolTipText = "The arouse spell draws on your own inner lust in order to enflame the enemy's passions.  (Fatigue Cost: " + spellCost(15) + ")";
        }
        if (buttonText === "Heal") {
            toolTipText = "Heal will attempt to use black magic to close your wounds and restore your body, however like all black magic used on yourself, it has a chance of backfiring and greatly arousing you.  (Fatigue Cost: " + spellCost(20) + ")";
        }
        if (buttonText.indexOf("Might") !== -1) {
            toolTipText = "The Might spell draws upon your lust and uses it to fuel a temporary increase in muscle size and power.  It does carry the risk of backfiring and raising lust, like all black magic used on oneself.  (Fatigue Cost: " + spellCost(25) + ")";
        }
        // Wait
        if (buttonText.indexOf("Wait") !== -1 && inCombat) {
            toolTipText = "Take no action for this round.  Why would you do this?  This is a terrible idea.";
        }
        // Sting
        if (buttonText.length === 5 && buttonText.indexOf("Sting") !== -1) {
            toolTipText = "Attempt to use your venomous bee stinger on an enemy.  Be aware it takes quite a while for your venom to build up, so depending on your abdomen's refractory period, you may have to wait quite a while between stings.  Venom: " + Math.floor(player.torso.tailVenom) + "/100";
        }
        // Web
        if (buttonText.indexOf("Web") !== -1) {
            toolTipText = "Attempt to use your abdomen to spray sticky webs at an enemy and greatly slow them down.  Be aware it takes a while for your webbing to build up.  Web Amount: " + Math.floor(player.torso.tailVenom) + "/100";
        }
        if (buttonText.indexOf("Infest") !== -1) {
            toolTipText = "The infest attack allows you to cum at will, launching a stream of semen and worms at your opponent in order to infest them.  Unless your foe is very aroused they are likely to simply avoid it.  Only works on males or herms.";
        }
        if (buttonText.indexOf("Spells") !== -1) {
            toolTipText = "Opens your spells menu, where you can cast any spells you have learned.  Beware, casting spells increases your fatigue, and if you become exhausted you will be easier to defeat.";
        }
        if (buttonText.indexOf("Defend") !== -1) {
            toolTipText = "Selecting defend will reduce the damage you take by 66 percent, but will not affect any lust incurred by your enemy's actions.";
        }
        if (buttonText === "Run") {
            toolTipText = "Choosing to run will let you try to escape from your enemy. However, it will be hard to escape enemies that are faster than you and if you fail, your enemy will get a free attack.";
        }
        if (buttonText.indexOf("Inventory") !== -1) {
            toolTipText = "The inventory allows you to use an item.  Be careful as this leaves you open to a counterattack when in combat.";
        }
        if (buttonText.indexOf("AutoSav") !== -1) {
            toolTipText = "When autosave is on the game will automatically save your character each night at midnight to the last slot it was saved in.";
            if (buttonText.indexOf("ON") !== -1) toolTipText += " Autosave is currently enabled.  Your game will be saved at midnight.";
            if (buttonText.indexOf("OFF") !== -1) toolTipText += " Autosave is currently off.  Your game will NOT be saved.";
        }
        if (buttonText.indexOf("Retrieve") !== -1) {
            toolTipText = "Retrieve allows you to take an item from one of the reserve stacks in your camp's additional storage.";
        }
        if (buttonText.indexOf("Storage") !== -1) {
            toolTipText = "Storage will allow you to dump a stack of items from your inventory into your storage chest.";
        }
        if (buttonText.indexOf("Sand Facial") !== -1) {
            toolTipText = "The goblins promise this facial will give you a rough, handsome look thanks to their special, timeless sands.";
        }
        if (buttonText.indexOf("Mud Facial") !== -1) {
            toolTipText = "This facial is supposed to enhance the softness of your face and enhance its femininity greatly.";
        }
        // Masturbation Toys
        if (buttonText === "Masturbate") {
            toolTipText = "Selecting this option will make you attempt to manually masturbate in order to relieve your lust buildup.";
        }
        if (buttonText === "Meditate") {
            toolTipText = "Selecting this option will make you attempt to meditate in order to reduce lust and corruption.";
        }
        if (buttonText.indexOf("AN Stim-Belt") !== -1) {
            toolTipText = "This is an all-natural self-stimulation belt.  The methods used to create such a pleasure device are unknown.  It seems to be organic in nature.";
        }
        if (buttonText.indexOf("Stim-Belt") !== -1) {
            toolTipText = "This is a self-stimulation belt.  Commonly referred to as stim-belts, these are clockwork devices designed to pleasure the female anatomy.";
        }
        if (buttonText.indexOf("AN Onahole") !== -1) {
            toolTipText = "An all-natural onahole, this device looks more like a bulbous creature than a sex-toy.  Nevertheless, the slick orifice it presents looks very inviting.";
        }
        if (buttonText.indexOf("D Onahole") !== -1) {
            toolTipText = "This is a deluxe onahole, made of exceptional materials and with the finest craftsmanship in order to bring its user to the height of pleasure.";
        }
        if (buttonText.indexOf("Onahole") !== -1) {
            toolTipText = "This is what is called an 'onahole'.  This device is a simple textured sleeve designed to fit around the male anatomy in a pleasurable way.";
        }
        if (buttonText === "Jojo") {
            if (monk >= 5) toolTipText = "Call your corrupted pet into camp in order to relieve your desires in a variety of sexual positions?  He's ever so willing after your last encounter with him.";
            else toolTipText = "Go find Jojo around the edges of your camp and meditate with him or talk about watch duty.";
        }
        if (buttonText === "Marble") {
            toolTipText = "Go to Marble the cowgirl for talk and companionship.";
        }
        // Books
        if (buttonText.indexOf("Dangerous Plants") !== -1) {
            toolTipText = "This is a book titled 'Dangerous Plants'.  As explained by the title, this tome is filled with information on all manner of dangerous plants from this realm.";
        }
        if (buttonText.indexOf("Traveler's Guide") !== -1) {
            toolTipText = "This traveler's guide is more of a pamphlet than an actual book, but it still contains some useful information on avoiding local pitfalls.";
        }
        if (buttonText.indexOf("Yoga Guide") !== -1) {
            toolTipText = "This leather-bound book is titled 'Yoga for Non-Humanoids.' It contains numerous illustrations of centaurs, nagas and various other oddly-shaped beings in a variety of poses.";
        }
        if (buttonText.indexOf("Hentai Comic") !== -1) {
            toolTipText = "This oddly drawn comic book is filled with images of fornication, sex, and overly large eyeballs.";
        }
        // CAMP STUFF
        if (buttonText.indexOf("Followers") !== -1) {
            toolTipText = "Check up on any followers or companions who are joining you in or around your camp.  You'll probably just end up sleeping with them.";
        }
        // Marble
        if (buttonText.indexOf("Marble (Sex)") !== -1) {
            toolTipText = "Get with Marble for a quick cuddle and some sex.";
        }
        // Rathazul
        if (buttonText.indexOf("Rathazul") !== -1) {
            toolTipText = "Visit with Rathazul to see what alchemical supplies and services he has available at the moment.";
        }
        // Title screen
        if (buttonText.indexOf("Toggle Debug") !== -1) {
            toolTipText = "Turn on debug mode.  Debug mode is intended for testing purposes but can be thought of as a cheat mode.  Items are infinite and combat is easy to escape from.  Weirdness and bugs are to be expected.";
        }
        if (buttonText.indexOf("Credits") !== -1) {
            toolTipText = "See a list of all the cool people who have contributed to content for this game!";
        }
        if (buttonText.indexOf("Instructions") !== -1) {
            toolTipText = "How to play.  Starting tips.  And hotkeys for easy left-handed play...";
        }
        if (buttonText.indexOf("Settings") !== -1) {
            toolTipText = "Configure game settings and enable cheats.";
        }
        if (buttonText.indexOf("ASPLODE") !== -1) {
            toolTipText = "MAKE SHIT ASPLODE";
        }
        return toolTipText;
    }

}
