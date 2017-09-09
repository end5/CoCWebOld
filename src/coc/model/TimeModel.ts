package coc.model 
{
	public class TimeModel 
	{
		private let _days:number;
		private let _hours:number;

		public function get days():number
		{
			return _days;
		}
		
		public function set days(value:number):void
		{
			_days = value;
		}
		
		public function get hours():number
		{
			return _hours;
		}
		
		public function set hours(value:number):void
		{
			_hours = value;
		}		
		public function get totalTime():number
		{
			return (this._days * 24 + this._hours);
		}
	}
}