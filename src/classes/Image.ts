package classes 
{
	/**
	 * ...
	 * @author Yoffy
	 */
	public class Image 
	{
		private let _id:string;
		private let _url:string
		private let _width: number;
		private let _height: number;		
		
		public function Image(id:string, url:string, w: number, h: number) 
		{
			_id = id;
			_url = url;
			_width = w;
			_height = h;
		}
		
		public function get id():string 
		{
			return _id;
		}
		
		public function get url():string 
		{
			return _url;
		}
		
		public function get width(): number 
		{
			return _width;
		}
		
		public function get height(): number 
		{
			return _height;
		}
		
	}

}