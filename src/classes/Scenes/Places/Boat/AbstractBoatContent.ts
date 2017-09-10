/**
 * Created by aimozg on 06.01.14.
 */
package classes.Scenes.Places.Boat
{
	import classes.*;
	import classes.GlobalFlags.kGAMECLASS;
	import classes.Scenes.Places.Boat;

	public class AbstractBoatContent extends BaseContent
	{
		protected get boat():Boat {
			return kGAMECLASS.boat;
		}
		public AbstractBoatContent()
		{
		}
	}
}
