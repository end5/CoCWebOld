/**
 * Created by aimozg on 06.01.14.
 */
	export class AbstractLakeContent extends BaseContent
	{
		protected function get lake():Lake{
			return kGAMECLASS.lake;
		}
		public AbstractLakeContent()
		{
		}
	}
}
