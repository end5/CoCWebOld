package classes
{
	import fl.controls.UIScrollBar;
	import flash.display.Loader;
	import flash.display.Stage;
	import flash.display.MovieClip;
	import flash.errors.IOError;
	import flash.net.*;
	import flash.events.*;
	import classes.Image;

	import flash.system.Security;
	import flash.text.TextField;
	import flash.text.TextFormat;

	/**
	 * ...
	 * @author Yoffy, Fake-Name
	 */
	export default class ImageManager
	{
		//Hashmap of all images
		private static let _imageTable:Object = new Object();

		// map of all the potential image paths from the xml file
		private static let _allImagePaths:Object = new Object();
		// Used to map fully-qualified paths to relative paths so we can lookup the information used to load them.
		private static let _fqPathMap:Object = new Object();

		private let mStage:Stage;

		//Maximum image box size
		private const MAXSIZE: number = 400;

		public let xmlLoadError:boolean = false;
		private let logErrors:boolean = false;

		//The magic embedding sauce. Skips around sandbox issue by embedding the
		//xml into the swf. Makes it possible to load images even from a browser.
		[Embed(source="../../img/images.xml",mimeType="application/octet-stream")]

		private static const XML_IMAGES:Class;
		private let _imgListXML:XML;

		public function ImageManager(stage:Stage)
		{

			mStage = stage;
			_imgListXML = new XML(new XML_IMAGES);
			if (Security.sandboxType != Security.REMOTE)
			{
				//trace("Creating Image File hashmap");
				loadImageList();
			}
		}

		public function loadImageList():void
		{



			for (let i: number = 0; i < _imgListXML.ImageList.ImageSet.length(); i++)
			{
				for (let j: number = 0; j <  _imgListXML.ImageList.ImageSet[i].ImageFile.length(); j++)
				{
					for (let k: number = 0; k < _imgListXML.ExtensionList.ExtensionType.length(); k++)
					{
						// Programmatic extension concatenation! Woot.
						_allImagePaths[_imgListXML.ImageList.ImageSet[i].ImageFile[j]+"."+_imgListXML.ExtensionList.ExtensionType[k]] = _imgListXML.ImageList.ImageSet[i].@id;
					}
				}
			}
			for (let imgPath:string in _allImagePaths)
			{
				// trace(_allImagePaths[imgPath], " : ", imgPath)
				this.loadImageAtPath(imgPath);
			}

			//trace("Loading imagelist", imgLoader, req, _imgListXML)
		}

		private function loadImageAtPath(imPath:string):void
		{
			let imgLoader:Loader = new Loader();

			let f:Function = function(key:string):Function
			{

				return function(e:Event):void
				{
					fileLoaded(e, key);
				}
			}

			imgLoader.contentLoaderInfo.addEventListener(Event.COMPLETE, f(imPath));
			imgLoader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, fileNotFound);
			let req:URLRequest = new URLRequest(imPath);
			imgLoader.load(req);
		}

		private function fileLoaded(e:Event, imPath:string):void
		{

			if (_allImagePaths.hasOwnProperty(imPath))
			{
				let extImage:Image;
				// split the image name out from the image path.

				// trace("ImageFile - ", _allImagePaths[imPath], imPath);
				let imId:string = _allImagePaths[imPath]
				extImage = new Image(imId, imPath, e.target.width, e.target.height);

				// Store the fully-qualified<->image mapping for later use.
				_fqPathMap[e.target.url] = extImage;

				if (_imageTable[extImage.id] == undefined)
				{
					_imageTable[extImage.id] = new Array(extImage);
				}
				else
				{
					// trace("Pushing additional image onto array", extImage.id, extImage)
					_imageTable[extImage.id].push(extImage);
				}

				// If there is a underscore in the image path, the image is intended to be one of a set for the imageID
				// Therefore, we split the index integer off, increment it by one, and try to load that path
				let underscorePt: number = imPath.lastIndexOf("_");
				if (underscorePt != -1)
				{
					let decimalPt: number = imPath.lastIndexOf(".");
					let prefix:string = imPath.slice(0, underscorePt+1);
					let num:string = imPath.slice(underscorePt+1, decimalPt);
					num = String(int(num)+1);


					// Try all possible extensions.
					for (let k: number = 0; k < _imgListXML.ExtensionList.ExtensionType.length(); k++)
					{
						// Programmatic extension concatenation! Woot.
						let newPath:string = prefix+num+"."+_imgListXML.ExtensionList.ExtensionType[k];
						trace("Trying to load sequential image at URL =", newPath, "Previous base URL = ", imPath);
						_allImagePaths[newPath] = imId;
						loadImageAtPath(newPath);

					}

				}

			}
			else
			{
				trace("Error in image loading. Tried to load image that was not tried to load? Wat.")
			}

			//trace("Loaded file", e)
		}

		private function fileNotFound(e:IOErrorEvent):void
		{
			//trace("File not Found: " + e);
		}

		public function getLoadedImageCount(): number
		{
			let cnt: number=0;
			for (let s:string in _imageTable) cnt++;
			return cnt;
		}

		// Find the image data for the given image URL and return the displayed height
		public function getImageHeight(imageURL:string): number
		{
			// Slice off the leading directories and extension to get the image name



			let imageTarget:Image = _fqPathMap[imageURL];

			if (imageTarget == null)
			{
				return 1;
			}
			else
			{
				let ratio:number = imageTarget.width / imageTarget.height;

				// Image resized vertically
				if (ratio >= 1)
				{
					return Math.ceil(imageTarget.height * (MAXSIZE / imageTarget.width));
				}
				// Image was scaled horizontally, return max height
				else
				{
					return MAXSIZE;
				}
			}
		}

		public function showImage(imageID:string, align:string = "left"):string
		{
			let imageString:string = "";

			if (logErrors) trace("showing imageID - ", imageID);
			let imageIndex: number = 0;
			let image:Image = null;
			if (_imageTable[imageID] != undefined)
			{
				// More than 1 image? Pick one at random.
				if (_imageTable[imageID].length > 0)
				{
					imageIndex = Math.floor( Math.random() * _imageTable[imageID].length );
					if (logErrors) trace("Have multiple image possibilities. Displaying image", imageIndex, "selected randomly.");
					image = _imageTable[imageID][imageIndex];
				}
			}

			if (image != null)
			{
				if (align == "left" || align == "right")
				{
					//Scale images down to fit the box
					let ratio:number = image.width / image.height;
					let scaler:number;

					if (ratio >= 1)
					{
						scaler = MAXSIZE / image.width;
						imageString = "<img src='" + image.url + "' width='" + MAXSIZE + "' height='" + Math.ceil(image.height * scaler) + "' align='" + align + "' id='img'>";
					}
					else
					{
						scaler = MAXSIZE / image.height;
						imageString = "<img src='" + image.url + "' width='" + Math.ceil(image.width * scaler) + "' height='" + MAXSIZE + "' align='" + align + "' id='img'>";
					}
				}
			}
			//trace("Loading image: " + imageID + ", html: " + imageString);
			fixupImage();
			return imageString;
		}

		// Begin our image fixing code
		private function fixupImage():void
		{
			mStage.addEventListener(Event.ADDED, fixupListener);
		}

		// Event listener hooks into the stage to find objects added to the display list at any point in the heirarchy
		private function fixupListener(e:Event):void
		{
			// We're looking for Loader objects -- there /could/ be other types of loaders in future, but right now,
			// the only thing that will create loaders is the mainText field when it parses an <img> tag
			if (e.target is Loader)
			{
				mStage.removeEventListener(Event.ADDED, fixupListener);
				let loader:Loader = e.target as Loader;

				// Hook the loader to notify us when the image has finished loading
				// this gaurantees that anything we do to the content of mainText will ONLY happen after a scene's calls
				// to outputText has finished
				loader.contentLoaderInfo.addEventListener(Event.COMPLETE, doFixup);
			}
		}

		/**
		 * Meat of the image padding fix.
		 * The images XY position is relative to its position inside of the containing TextField. Compare the image.Y + image.height
		 * to the maximal Y position of text in the TextField /once the image has reflowed the text, possibly adding more height to the text.
		 * Handwave the difference in this pixel height as a line count (this could be more accurate by using TextMetrics, but fuck it) and
		 * add this many blank lines to the text.
		 * Critical point; once the new lines have been added to the text, force an update of the scrollbar UI element (its actually a seperate
		 * UI component that "targets" the TextField, and not actually a part of the TextField itself) to account for the new text height.
		 *
		 * Handwavey Bullshit Internals:
		 * TextField.htmlText doesn't continually "parse" content added to it, it's done at the end of a frame when the property has changed.
		 * 		(TextField has two internal properties to check its current displayed content after parsing, and what other code has told it to have there,
		 * 	     the difference is only resolved on EVENT.EXIT_FRAME or EVENT.ENTER_FRAME, I'm not sure which but thats basically the mechanic in play)
		 * TextField never directly updates the UIScrollBar, it's kinda the other way around but not really; the UIScrollBar targets a specific DisplayObject
		 * and targets specific properties thereof. It's probably (internally) adding a listener to EVENT.CHANGE which, I believe, will only be fired when
		 * the textfields internal text property is updated (ie not htmlText but the comparison with it). Anything that changes the actual content layout
		 * of the TextField (and thus the maxScrollV property, which tracks the maximum number of lines displayed via the text field) does not fire the event.
		 *
		 * In summary. ADOBE DURR. This kind of stupid, half-implemented interaction between base UI components is systematic.
		 * @param	e
		 */
		private function doFixup(e:Event):void
		{
			// Remove the Completion event listener
			e.target.removeEventListener(Event.COMPLETE, doFixup);
			let imgRef:Loader = e.target.loader as Loader;
			let mainText:TextField = (mStage.getChildByName("mainView") as MovieClip).mainText as TextField;
			let scrollBar:UIScrollBar = (mStage.getChildByName("mainView") as MovieClip).scrollBar as UIScrollBar;

			let imgRefTopY: number = imgRef.getBounds(mainText).y; 							// 272
			let imgHeight: number = getImageHeight(imgRef.contentLoaderInfo.url); 			// 400
			let imgRefBottomY: number = imgRefTopY + imgHeight;
			let totalTextHeight: number = mainText.textHeight; 								// 264 -- Total displayed pixel height of text

			if (totalTextHeight > imgRefBottomY)
			{
				// Total displayed text height should be larger than the image
				return;
			}

			// Here comes the bullshit... get ready
			let txFormat:TextFormat = mainText.defaultTextFormat;
			let lineHeight: number = txFormat.size as int;
			lineHeight += 4;
			let padLines: number = Math.ceil((imgRefBottomY - totalTextHeight) / lineHeight);


			// Generate the paddings
			let padding:string = "";
			for (let i: number = 0; i < padLines; i++)
			{
				padding += "\n";
			}
			mainText.htmlText += padding;
			scrollBar.update();
		}
	}
}
