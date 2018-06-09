/**
 * Created by aimozg on 06.01.14.
 */
	export class AbstractBoatContent extends BaseContent
	{
		protected function get boat():Boat {
			return kGAMECLASS.boat;
		}
		public AbstractBoatContent()
		{
		}
	}
}
