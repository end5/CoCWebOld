package classes.content 
{
	import classes.BaseContent;
	/**
	 * ...
	 * @author Gedan
	 */
	public class TestContent extends BaseContent
	{
		
		public TestContent() 
		{
			
		}
		
		public cheatSheet():void
		{
			clearOutput();
			
			Render.text("<b>Parser Cheet Sheet:</b>\n\n");
			Render.text("Descriptor (descriptor.as) Functions:\n");
			
			Render.text("\nsackDescript " + sackDescript());
			Render.text("\ncockClit " + cockClit);
//			Render.text("\nballs " + balls(0, 0));
			Render.text("\nsheathDesc " + player.sheathDesc());
			Render.text("\nchestDesc " + chestDesc());
			Render.text("\nallChestDesc " + allChestDesc());
			Render.text("\nsMultiCockDesc " + player.sMultiCockDesc());
			Render.text("\nSMultiCockDesc " + player.SMultiCockDesc());
			Render.text("\noMultiCockDesc " + player.oMultiCockDesc());
			Render.text("\nOMultiCockDesc " + player.OMultiCockDesc());
			Render.text("\ntongueDescript " + tongueDescript());
			Render.text("\nballsDescriptLight false " + ballsDescriptLight(false));
			Render.text("\nballsDescriptLight true " + ballsDescriptLight(true));
			Render.text("\nballDescript " + ballDescript());
			Render.text("\nballsDescript " + ballsDescript());
			Render.text("\nsimpleBallsDescript " + simpleBallsDescript());
			Render.text("\nassholeDescript " + assholeDescript());
			Render.text("\nhipDescript " + hipDescript());
			Render.text("\nassDescript " + assDescript());
			Render.text("\nbuttDescript " + buttDescript());
			Render.text("\nnippleDescript " + nippleDescript(0));
			Render.text("\nhairDescript " + hairDescript());
			Render.text("\nhairOrFur " + hairOrFur());
			Render.text("\nclitDescript " + clitDescript());
			Render.text("\nvaginaDescript " + vaginaDescript());
			Render.text("\nallVaginaDescript " + allVaginaDescript());
			Render.text("\nmultiCockDescriptLight " + multiCockDescriptLight());
			Render.text("\ncockAdjective " + player.cockAdjective());
			Render.text("\ncockDescript " + cockDescript(0));
			Render.text("\nbiggestBreastSizeDescript " + biggestBreastSizeDescript());
			Render.text("\nbreaseSize 5" + breastSize(5));
			Render.text("\nbreastDescript " + breastDescript(0));
			Render.text("\ncockHead " + player.cockHead());
			Render.text("\nbreastCup 5 " + breastCup(5));
			
			Render.text("\n\nParser Tags (Single)L\n");
			Render.text("\naagility [agility]");
			Render.text("\narmor [armor]");
			Render.text("\narmorname [armorname]");
			Render.text("\nass [ass]");
			Render.text("\nasshole [asshole]");
			Render.text("\nballs [balls]");
			Render.text("\nboyfriend [boyfriend]");
			Render.text("\nbutt [butt]");
			Render.text("\nbutthole [butthole]");
			Render.text("\nchest [chest]");
			Render.text("\nclit [clit]");
			Render.text("\ncock [cock]");
			Render.text("\ncockhead [cockhead]");
			Render.text("\ncocks [cocks]");
			Render.text("\ncunt [cunt]");
			Render.text("\neachcock [eachCock]");
			Render.text("\nevade [evade]");
			Render.text("\nface [face]");
			Render.text("\nfeet [feet]");
			Render.text("\nfoot [foot]");
			Render.text("\nfullchest [fullchest]");
			Render.text("\nhair [hair]");
			Render.text("\nhairorfur [hairorfur]");
			Render.text("\nhe [he]");
			Render.text("\nhim [him]");
			Render.text("\nhips [hips]");
			Render.text("\nhis [his]");
			Render.text("\nleg [leg]");
			Render.text("\nlegs [legs]");
			Render.text("\nman [man]");
			Render.text("\nmaster [master]");
			Render.text("\nmisdirection [misdirection]");
			Render.text("\nmulticockdescriptlight [multicockdescriptlight]");
			Render.text("\nname [name]");
			Render.text("\nnipple [nipple]");
			Render.text("\nnipples [nipples]");
			Render.text("\nonecock [onecock]");
			Render.text("\npg [pg]");
			Render.text("\npussy [pussy]");
			Render.text("\nsack [sack]");
			Render.text("\nsheath [sheath]");
			Render.text("\nskin [skin]");
			Render.text("\nskinfurscales [skinfurscales]");
			Render.text("\ntongue [tongue]");
			Render.text("\nvag [vag]");
			Render.text("\nvagina [vagina]");
			Render.text("\nvagorass [vagorass]");
			Render.text("\nweapon [weapon]");
			Render.text("\nweaponname [weaponname]");
			
			trace("Spammed!");
			doNext(camp.returnToCampUseOneHour);
		}
		
	}

}