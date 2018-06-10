/**
 * Created by aimozg on 08.01.14.
 */
	export class AbstractFarmContent extends BaseContent
	{
		public AbstractFarmContent()
		{
		}
		protected function get farm():Farm {
			return kGAMECLASS.farm;
		}

	}
}
