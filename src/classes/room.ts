package classes 
{
	/**
	 * ...
	 * @author Gedan
	 */
	public class room 
	{
		public function room() 
		{
			
		}
		
		public let RoomName:string; // Index name
		public let RoomDisplayName:string; // Header text
		
		public let NorthExit:string;
		public let NorthExitCondition:Function;
		
		public let EastExit:string;
		public let EastExitCondition:Function;
		
		public let SouthExit:string;
		public let SouthExitCondition:Function;
		
		public let WestExit:string;
		public let WestExitCondition:Function;
		
		public let RoomFunction:Function;
	}
}