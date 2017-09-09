﻿
package classes.Parser
{
	// import classes.CoC;

	public class Parser
	{
		import showdown.Showdown;

		private let _ownerClass:*;			// main game class. Variables are looked-up in this class.
		private let _settingsClass:*;		// global static class used for shoving conf vars around

		public let sceneParserDebug:boolean = false;

		public let mainParserDebug:boolean = false;
		public let lookupParserDebug:boolean = false;
		public let conditionalDebug:boolean = false;
		public let printCcntentDebug:boolean = false;
		public let printConditionalEvalDebug:boolean = false;
		public let printIntermediateParseStateDebug:boolean = false;
		public let logErrors:boolean = true;


		public function Parser(ownerClass:*, settingsClass:*)
		{
			this._ownerClass = ownerClass;
			this._settingsClass = settingsClass;
		}

		/*
		Parser Syntax:

		// Querying simple PC stat nouns:
			[noun]

		Conditional statements:
		// Simple if statement:
			[if (condition) OUTPUT_IF_TRUE]
		// If-Else statement
			[if (condition) OUTPUT_IF_TRUE | OUTPUT_IF_FALSE]
			// Note - Implicit else indicated by presence of the "|"

		// Object aspect descriptions
			[object aspect]
			// gets the description of aspect "aspect" of object/NPC/PC "object"
			// Eventually, I want this to be able to use introspection to access class attributes directly
			// Maybe even manipulate them, though I haven't thought that out much at the moment.

		// Gender Pronoun Weirdness:
		// PRONOUNS: The parser uses Elverson/Spivak Pronouns specifically to allow characters to be written with non-specific genders.
		// http://en.wikipedia.org/wiki/Spivak_pronoun
		//
		// Cheat Table:
		//           | Subject    | Object       | Possessive Adjective | Possessive Pronoun | Reflexive         |
		// Agendered | ey laughs  | I hugged em  | eir heart warmed     | that is eirs       | ey loves emself   |
		// Masculine | he laughs  | I hugged him | his heart warmed     | that is his        | he loves himself  |
		// Feminine  | she laughs | I hugged her | her heart warmed     | that is hers       | she loves herself |



		[screen (SCREEN_NAME) | screen text]
			// creates a new screen/page.

		[button (SCREEN_NAME)| button_text]
			// Creates a button which jumps to SCREEN_NAME when clicked

		*/


		// this.parserState is used to store the scene-parser state.
		// it is cleared every time recursiveParser is called, and then any scene tags are added
		// as parserState["sceneName"] = "scene content"

		public let parserState:Object = new Object();

		// provides singleArgConverters
		include "./singleArgLookups.as";

		// Does lookup of single argument tags ("[cock]", "[armor]", etc...) in singleArgConverters
		// Supported variables are the options listed in the above
		// singleArgConverters object. If the passed argument is found in the above object,
		// the corresponding anonymous function is called, and it's return-value is returned.
		// If the arg is not present in the singleArgConverters object, an error message is
		// returned.
		// ALWAYS returns a string
		private function convertSingleArg(arg:string):string
		{
			let argResult:string = null;
			let capitalize:boolean = isUpperCase(arg.charAt(0));

			let argLower:string;
			argLower = arg.toLowerCase()
			if (argLower in singleArgConverters)
			{
				//if (logErrors) trace("WARNING: Found corresponding anonymous function");
				argResult = singleArgConverters[argLower](this._ownerClass);

				if (lookupParserDebug) trace("WARNING: Called, return = ", argResult);

				if (capitalize)
					argResult = capitalizeFirstWord(argResult);

				return argResult;
			}
			else
			{

				// ---------------------------------------------------------------------------------
				// TODO: Get rid of this shit.
				// UGLY hack to patch legacy functionality in TiTS
				// This needs to go eventually

				let descriptorArray:Array = arg.split(".");

				obj = this.getObjectFromString(this._ownerClass, descriptorArray[0]);
				if (obj == null)		// Completely bad tag
				{
					if (lookupParserDebug || logErrors) trace("WARNING: Unknown subject in " + arg);
					return "<b>!Unknown subject in \"" + arg + "\"!</b>";
				}
				if (obj.hasOwnProperty("getDescription") && arg.indexOf(".") > 0)
				{
					return obj.getDescription(descriptorArray[1], "");
				}
				// end hack
				// ---------------------------------------------------------------------------------


				if (lookupParserDebug) trace("WARNING: Lookup Arg = ", arg);
				let obj:*;
				obj = this.getObjectFromString(this._ownerClass, arg);
				if (obj != null)
				{
					if (obj is Function)
					{
						if (lookupParserDebug) trace("WARNING: Found corresponding function in owner class");
						return obj();
					}
					else
					{
						if (lookupParserDebug) trace("WARNING: Found corresponding aspect in owner class");
						return String(obj); 	// explicit cast probably not needed
					}
				}
				else
				{
					if (lookupParserDebug || logErrors) trace("WARNING: No lookup found for", arg, " search result is: ", obj);
					return "<b>!Unknown tag \"" + arg + "\"!</b>";
				}
			}

		}


		// provides twoWordNumericTagsLookup and twoWordTagsLookup, which use
		// cockLookups/cockHeadLookups, and rubiLookups/arianLookups respectively
		include "./doubleArgLookups.as";



		private function convertDoubleArg(inputArg:string):string
		{
			let argResult:string = null;

			let thing:*;

			let argTemp:Array = inputArg.split(" ");
			if (argTemp.length != 2)
			{
				if (logErrors) trace("WARNING: Not actually a two word tag! " + inputArg);
				return "<b>!Not actually a two-word tag!\"" + inputArg + "\"!</b>"
			}
			let subject:string = argTemp[0];
			let aspect:* = argTemp[1];
			let subjectLower:string = argTemp[0].toLowerCase();
			let aspectLower:* = argTemp[1].toLowerCase();

			if (lookupParserDebug) trace("WARNING: Doing lookup for subject", subject, " aspect ", aspect);

			// Figure out if we need to capitalize the resulting text
			let capitalize:boolean = isUpperCase(aspect.charAt(0));


			// Only perform lookup in twoWordNumericTagsLookup if aspect can be cast to a valid number

			if ((subjectLower in twoWordNumericTagsLookup) && !isNaN(Number(aspect)))
			{
				aspectLower = Number(aspectLower);

				if (lookupParserDebug) trace("WARNING: Found corresponding anonymous function");
				argResult = twoWordNumericTagsLookup[subjectLower](this._ownerClass, aspectLower);
				if (capitalize)
					argResult = capitalizeFirstWord(argResult);
				if (lookupParserDebug) trace("WARNING: Called two word numeric lookup, return = ", argResult);
				return argResult;
			}

			// aspect isn't a number. Look for subject in the normal twoWordTagsLookup
			if (subjectLower in twoWordTagsLookup)
			{
				if (aspectLower in twoWordTagsLookup[subjectLower])
				{

					if (lookupParserDebug) trace("WARNING: Found corresponding anonymous function");
					argResult = twoWordTagsLookup[subjectLower][aspectLower](this._ownerClass);
					if (capitalize)
						argResult = capitalizeFirstWord(argResult);
					if (lookupParserDebug) trace("WARNING: Called two word lookup, return = ", argResult);
					return argResult;
				}
				else
				{
					if (logErrors) trace("WARNING: Unknown aspect in two-word tag. Arg: " + inputArg + " Aspect: " + aspectLower);
					return "<b>!Unknown aspect in two-word tag \"" + inputArg + "\"! ASCII Aspect = \"" + aspectLower + "\"</b>";
				}

			}



			if (lookupParserDebug) trace("WARNING: trying to look-up two-word tag in parent")

			// ---------------------------------------------------------------------------------
			// TODO: Get rid of this shit.
			// UGLY hack to patch legacy functionality in TiTS
			// This needs to go eventually

			let descriptorArray:Array = subject.split(".");

			thing = this.getObjectFromString(this._ownerClass, descriptorArray[0]);
			if (thing == null)		// Completely bad tag
			{
				if (logErrors) trace("WARNING: Unknown subject in " + inputArg);
				return "<b>!Unknown subject in \"" + inputArg + "\"!</b>";
			}
			if (thing.hasOwnProperty("getDescription") && subject.indexOf(".") > 0)
			{
				if(argTemp.length > 1) {
					return thing.getDescription(descriptorArray[1], aspect);
				}
				else {
					return thing.getDescription(descriptorArray[1], "");
				}
			}
			// end hack
			// ---------------------------------------------------------------------------------

			let aspectLookup:* = this.getObjectFromString(this._ownerClass, aspect);

			if (thing != null)
			{
				if (thing is Function)
				{
					if (lookupParserDebug) trace("WARNING: Found corresponding function in owner class");
					return thing(aspect);
				}
				else if (thing is Array)
				{
					let indice:number = Number(aspectLower);
					if (isNaN(indice))
					{
						if (logErrors) trace("WARNING: Cannot use non-number as indice to Array. Arg " + inputArg + " Subject: " + subject + " Aspect: " + aspect); 
						return "<b>Cannot use non-number as indice to Array \"" + inputArg + "\"! Subject = \"" + subject + ", Aspect = " + aspect + "\</b>";
					}
					else
						return thing[indice]
				}
				else if (thing is Object)
				{

					if (thing.hasOwnProperty(aspectLookup))
						return thing[aspectLookup]

					else if (thing.hasOwnProperty(aspect))
						return thing[aspect]
					else
					{
						if (logErrors) trace("WARNING: Object does not have aspect as a member. Arg: " + inputArg + " Subject: " + subject + " Aspect:" + aspect + " or " + aspectLookup);
						return "<b>Object does not have aspect as a member \"" + inputArg + "\"! Subject = \"" + subject + ", Aspect = " + aspect + " or " + aspectLookup + "\</b>";
					}
				}
				else
				{
					// This will work, but I don't know why you'd want to
					// the aspect is just ignored
					if (lookupParserDebug) trace("WARNING: Found corresponding aspect in owner class");
					return String(thing);
				}
			}




			if (lookupParserDebug || logErrors) trace("WARNING: No lookup found for", inputArg, " search result is: ", thing);
			return "<b>!Unknown subject in two-word tag \"" + inputArg + "\"! Subject = \"" + subject + ", Aspect = " + aspect + "\</b>";
			// return "<b>!Unknown tag \"" + arg + "\"!</b>";

			return argResult;
		}





		// Provides the conditionalOptions object
		include "./conditionalConverters.as";

		// converts a single argument to a conditional to
		// the relevant value, either by simply converting to a Number, or
		// through lookup in the above conditionalOptions oject, and then calling the
		// relevant function
		// Realistally, should only return either boolean or numbers.
		private function convertConditionalArgumentFromStr(arg:string):*
		{
			// convert the string contents of a conditional argument into a meaningful variable.
			let argLower:* = arg.toLowerCase()
			let argResult:* = -1;

			// Note: Case options MUST be ENTIRELY lower case. The comparaison string is converted to
			// lower case before the switch:case section

			// Try to cast to a number. If it fails, go on with the switch/case statement.
			if (!isNaN(Number(arg)))
			{
				if (printConditionalEvalDebug) trace("WARNING: Converted to float. Number = ", Number(arg))
				return Number(arg);
			}
			if (argLower in conditionalOptions)
			{
				if (printConditionalEvalDebug) trace("WARNING: Found corresponding anonymous function");
				argResult = conditionalOptions[argLower](this._ownerClass);
				if (printConditionalEvalDebug) trace("WARNING: Called, return = ", argResult);
				return argResult;
			}


			let obj:* = this.getObjectFromString(this._ownerClass, arg);

			if (printConditionalEvalDebug) trace("WARNING: Looked up ", arg, " in ", this._ownerClass, "Result was:", obj);
			if (obj != null)
			{
				if (printConditionalEvalDebug) trace("WARNING: Found corresponding function for conditional argument lookup.");

				if (obj is Function)
				{
					if (printConditionalEvalDebug) trace("WARNING: Found corresponding function in owner class");
					argResult = Number(obj());
					return argResult;
				}
				else
				{
					if (printConditionalEvalDebug) trace("WARNING: Found corresponding aspect in owner class");
					argResult = Number(obj);
					return argResult;
				}
			}
			else
			{
				if (printConditionalEvalDebug || logErrors) trace("WARNING: No lookups found!");
				return null
			}


			if (printConditionalEvalDebug || LogErrors) trace("WARNING: Could not convert to number. Evaluated ", arg, " as", argResult)
			return argResult;
		}


		// Evaluates the conditional section of an if-statement.
		// Does the proper parsing and look-up of any of the special nouns
		// which can be present in the conditional
		private function evalConditionalStatementStr(textCond:string):boolean
		{
			// Evaluates a conditional statement:
			// (varArg1 [conditional] varArg2)
			// varArg1 & varArg2 can be either numbers, or any of the
			// strings in the "conditionalOptions" object above.
			// numbers (which are in string format) are converted to a Number type
			// prior to comparison.

			// supports multiple comparison operators:
			// "=", "=="  - Both are Equals or equivalent-to operators
			// "<", ">    - Less-Than and Greater-Than
			// "<=", ">=" - Less-than or equal, greater-than or equal
			// "!="       - Not equal

			// proper, nested parsing of statements is a WIP
			// and not supported at this time.


			let isExp:RegExp = /([\w\.]+)\s?(==|=|!=|<|>|<=|>=)\s?([\w\.]+)/;
			let expressionResult:Object = isExp.exec(textCond);
			if (!expressionResult)
			{
				let condArg:* = convertConditionalArgumentFromStr(textCond);
				if (condArg != null)
				{
					if (printConditionalEvalDebug) trace("WARNING: Conditional \"", textCond, "\" Evalueated to: \"", condArg, "\"")
					return condArg
				}
				else
				{
					if (logErrors) trace("WARNING: Invalid conditional! \"(", textCond, ")\" Conditionals must be in format:")
					if (logErrors) trace("WARNING:  \"({statment1} (==|=|!=|<|>|<=|>=) {statement2})\" or \"({valid variable/function name})\". ")
					return false
				}
			}
			if (printConditionalEvalDebug) trace("WARNING: Expression = ", textCond, "Expression result = [", expressionResult, "], length of = ", expressionResult.length);

			let condArgStr1:string    = expressionResult[1];
			let operator:string       = expressionResult[2];
			let condArgStr2:string    = expressionResult[3];

			let retVal:boolean = false;

			let condArg1:* = convertConditionalArgumentFromStr(condArgStr1);
			let condArg2:* = convertConditionalArgumentFromStr(condArgStr2);

			//Perform check
			if(operator == "=")
				retVal = (condArg1 == condArg2);
			else if(operator == ">")
				retVal = (condArg1 > condArg2);
			else if(operator == "==")
				retVal = (condArg1 == condArg2);
			else if(operator == "<")
				retVal = (condArg1 < condArg2);
			else if(operator == ">=")
				retVal = (condArg1 >= condArg2);
			else if(operator == "<=")
				retVal = (condArg1 <= condArg2);
			else if(operator == "!=")
				retVal = (condArg1 != condArg2);
			else
				retVal = (condArg1 != condArg2);


			if (printConditionalEvalDebug) trace("WARNING: Check: " + condArg1 + " " + operator + " " + condArg2 + " result: " + retVal);

			return retVal;
		}

		// Splits the result from an if-statement.
		// ALWAYS returns an array with two strings.
		// if there is no else, the second string is empty.
		private function splitConditionalResult(textCtnt:string): Array
		{
			// Splits the conditional section of an if-statemnt in to two results:
			// [if (condition) OUTPUT_IF_TRUE]
			//                 ^ This Bit   ^
			// [if (condition) OUTPUT_IF_TRUE | OUTPUT_IF_FALSE]
			//                 ^          This Bit            ^
			// If there is no OUTPUT_IF_FALSE, returns an empty string for the second option.
			if (conditionalDebug) trace("WARNING: ------------------4444444444444444444444444444444444444444444444444444444444-----------------------")
			if (conditionalDebug) trace("WARNING: Split Conditional input string: ", textCtnt)
			if (conditionalDebug) trace("WARNING: ------------------4444444444444444444444444444444444444444444444444444444444-----------------------")


			let ret:Array = new Array("", "");


			let i: number;

			let sectionStart: number = 0;
			let section: number = 0;
			let nestLevel: number = 0;

			for (i = 0; i < textCtnt.length; i += 1)
			{
				switch (textCtnt.charAt(i))
				{
					case "[":    //Statement is nested one level deeper
						nestLevel += 1;
						break;

					case "]":    //exited one level of nesting.
						nestLevel -= 1;
						break;

					case "|":                  // At a conditional split
						if (nestLevel == 0)   // conditional split is only valid in this context if we're not in a nested bracket.
						{
							if (section == 1)  // barf if we hit a second "|" that's not in brackets
							{
								if (this._settingsClass.haltOnErrors) throw new Error("Nested IF statements still a WIP")
								ret = ["<b>Error! Too many options in if statement!</b>",
									"<b>Error! Too many options in if statement!</b>"];
							}
							else
							{
								ret[section] = textCtnt.substring(sectionStart, i);
								sectionStart = i + 1
								section += 1
							}
						}
						break;

					default:
						break;
				}

			}
			ret[section] = textCtnt.substring(sectionStart, textCtnt.length);


			if (conditionalDebug) trace("WARNING: ------------------5555555555555555555555555555555555555555555555555555555555-----------------------")
			if (conditionalDebug) trace("WARNING: Outputs: ", ret)
			if (conditionalDebug) trace("WARNING: ------------------5555555555555555555555555555555555555555555555555555555555-----------------------")

			return ret;
		}



		// Called to evaluate a if statment string, and return the evaluated result.
		// Returns an empty string ("") if the conditional rvaluates to false, and there is no else
		// option.
		private function parseConditional(textCtnt:string, depth: number):string
		{
			// NOTE: enclosing brackets are *not* included in the actual textCtnt string passed into this function
			// they're shown in the below examples simply for clarity's sake.
			// And because that's what the if-statements look like in the raw string passed into the parser
			// The brackets are actually removed earlier on by the recParser() step.

			// parseConditional():
			// Takes the contents of an if statement:
			// [if (condition) OUTPUT_IF_TRUE]
			// [if (condition) OUTPUT_IF_TRUE | OUTPUT_IF_FALSE]
			// splits the contents into an array as such:
			// ["condition", "OUTPUT_IF_TRUE"]
			// ["condition", "OUTPUT_IF_TRUE | OUTPUT_IF_FALSE"]
			// Finally, evalConditionalStatementStr() is called on the "condition", the result
			// of which is used to determine which content-section is returned
			//


			// TODO: (NOT YET) Allows nested condition parenthesis, because I'm masochistic


			// POSSIBLE BUG: A actual statement starting with "if" could be misinterpreted as an if-statement
			// It's unlikely, but I *could* see it happening.
			// I need to do some testing
			// ~~~~Fake-Name


			if (conditionalDebug) trace("WARNING: ------------------2222222222222222222222222222222222222222222222222222222222-----------------------")
			if (conditionalDebug) trace("WARNING: If input string: ", textCtnt)
			if (conditionalDebug) trace("WARNING: ------------------2222222222222222222222222222222222222222222222222222222222-----------------------")


			let ret:Array = new Array("", "", "");	// first string is conditional, second string is the output

			let i:number = 0;
			let parenthesisCount:number = 0;

			//let ifText;
			let conditional:*;
			let output:*;

			let condStart:number = textCtnt.indexOf("(");

			if (condStart != -1)		// If we have any open parenthesis
			{
				for (i = condStart; i < textCtnt.length; i += 1)
				{
					if (textCtnt.charAt(i) == "(")
					{
						parenthesisCount += 1;
					}
					else if (textCtnt.charAt(i) == ")")
					{
						parenthesisCount -= 1;
					}
					if (parenthesisCount == 0)	// We've found the matching closing bracket for the opening bracket at textCtnt[condStart]
					{
						// Pull out the conditional, and then evaluate it.
						conditional = textCtnt.substring(condStart+1, i);
						conditional = evalConditionalStatementStr(conditional);

						// Make sure the contents of the if-statement have been evaluated to a plain-text string before trying to
						// split the base-level if-statement on the "|"
						output = textCtnt.substring(i+1, textCtnt.length)

						// And now do the actual splitting.
						output = splitConditionalResult(output);

						// LOTS of debugging
						if (conditionalDebug) trace("WARNING: prefix = '", ret[0], "' conditional = ", conditional, " content = ", output);
						if (conditionalDebug) trace("WARNING: -0--------------------------------------------------");
						if (conditionalDebug) trace("WARNING: Content Item 1 = ", output[0])
						if (conditionalDebug) trace("WARNING: -1--------------------------------------------------");
						if (conditionalDebug) trace("WARNING: Item 2 = ", output[1]);
						if (conditionalDebug) trace("WARNING: -2--------------------------------------------------");

						if (conditional)
							return recParser(output[0], depth);
						else
							return recParser(output[1], depth);

					}
				}
			}
			else
			{
				if (this._settingsClass.haltOnErrors) throw new Error("Invalid if statement!", textCtnt);
				return "<b>Invalid IF Statement<b/>" + textCtnt;
			}
			return "";
		}


		// ---------------------------------------------------------------------------------------------------------------------------------------
		// SCENE PARSING ---------------------------------------------------------------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------------------------------------


		// attempt to return function "inStr" that is a member of "localThis"
		// Properly handles nested classes/objects, e.g. localThis.herp.derp
		// is returned by getFuncFromString(localThis, "herp.derp");
		// returns the relevant function if it exists, null if it does not.
		private function getObjectFromString(localThis:Object, inStr:string):*
		{
			if (inStr in localThis)
			{
				if (lookupParserDebug) trace("WARNING: item: ", inStr, " in: ", localThis);
				return localThis[inStr];
			}

			if (inStr.indexOf('.') > 0) // *should* be > -1, but if the string starts with a dot, it can't be a valid reference to a nested class anyways.
			{
				let localReference:string;
				let itemName:string;
				localReference = inStr.substr(0, inStr.indexOf('.'));
				itemName = inStr.substr(inStr.indexOf('.')+1);

				// Debugging, what debugging?
				if (lookupParserDebug) trace("WARNING: localReference = ", localReference);
				if (lookupParserDebug) trace("WARNING: itemName = ", itemName);
				if (lookupParserDebug) trace("WARNING: localThis = \"", localThis, "\"");
				if (lookupParserDebug) trace("WARNING: dereferenced = ", localThis[localReference]);

				// If we have the localReference as a member of the localThis, call this function again to further for
				// the item itemName in localThis[localReference]
				// This allows arbitrarily-nested data-structures, by recursing over the . structure in inStr
				if (localReference in localThis)
				{
					if (lookupParserDebug) trace("WARNING: have localReference:", localThis[localReference]);
					return getObjectFromString(localThis[localReference], itemName);
				}
				else
				{
					return null;
				}

			}

			if (lookupParserDebug) trace("WARNING: item: ", inStr, " NOT in: ", localThis);

			return null;

		}



		private function getSceneSectionToInsert(inputArg:string):string
		{
			let argResult:string = null;


			let argTemp:Array = inputArg.split(" ");
			if (argTemp.length != 2)
			{
				return "<b>!Not actually a valid insertSection tag:!\"" + inputArg + "\"!</b>";
			}
			let callName:string = argTemp[0];
			let sceneName:* = argTemp[1];
			let callNameLower:string = argTemp[0].toLowerCase();

			if (sceneParserDebug) trace("WARNING: Doing lookup for sceneSection tag:", callName, " scene name: ", sceneName);

			// this should have been checked before calling.
			if (callNameLower != "insertsection")
				throw new Error("Wat?");



			if (sceneName in this.parserState)
			{
				if (sceneParserDebug) trace("WARNING: Have sceneSection \""+sceneName+"\". Parsing and setting up menu");

				buttonNum = 0;		// Clear the button number, so we start adding buttons from button 0

				// Split up into multiple variables for debugging (it was crashing at one point. Separating the calls let me delineate what was crashing)
				let tmp1:string = this.parserState[sceneName];
				let tmp2:string = recParser(tmp1, 0);			// we have to actually parse the scene now
				let tmp3:string = Showdown.makeHtml(tmp2)



				return tmp3;			// and then stick it on the display

				//if (sceneParserDebug) trace("WARNING: Scene contents: \"" + tmp1 + "\" as parsed: \"" + tmp2 + "\"")
			}
			else
			{
				return "Insert sceneSection called with unknown arg \""+sceneName+"\". falling back to the debug pane";

			}
		}





		private let buttonNum:number;


		// TODO: Make failed scene button lookups fail in a debuggable manner!

		// Parser button event handler
		// This is the event bound to all button events, as well as the function called
		// to enter the parser's cached scenes. If you pass recursiveParser a set of scenes including a scene named
		// "startup", the parser will not exit normally, and will instead enter the "startup" scene at the completion of parsing the
		// input string.
		//
		// the passed seneName string is preferentially looked-up in the cached scene array, and if there is not a cached scene of name sceneName
		// in the cache, it is then looked for as a member of _ownerClass.
		// if the function name is not found in either context, an error *should* be thrown, but at the moment,
		// it just returns to the debugPane
		//
		public function enterParserScene(sceneName:string):string
		{

			/*
			if (sceneParserDebug) trace("WARNING: this.parserStateContents:")
			for (let prop in this.parserState)
			{
				if (sceneParserDebug) trace("WARNING: this.parserState."+prop+" = "+this.parserState[prop]);
			}
			*/
			let ret:string = "";

			if (sceneParserDebug) trace("WARNING: Entering parser scene: \""+sceneName+"\"");
			if (sceneParserDebug) trace("WARNING: Do we have the scene name? ", sceneName in this.parserState)
			if (sceneName == "exit")
			{
				if (sceneParserDebug) trace("WARNING: Enter scene called to exit");
				//doNextClear(debugPane);

				// TODO:
				// This needs to change to something else anyways. I need to add the ability to
				// tell the parser where to exit to at some point
				_ownerClass.debugPane();

			}
			else if (sceneName in this.parserState)
			{
				if (sceneParserDebug) trace("WARNING: Have scene \""+sceneName+"\". Parsing and setting up menu");
				_ownerClass.menu();

				buttonNum = 0;		// Clear the button number, so we start adding buttons from button 0

				let tmp1:string = this.parserState[sceneName];
				let tmp2:string = recParser(tmp1, 0);		// we have to actually parse the scene now
				ret             = Showdown.makeHtml(tmp2)



				_ownerClass.rawOutputText(ret, true);			// and then stick it on the display

				//if (sceneParserDebug) trace("WARNING: Scene contents: \"" + tmp1 + "\" as parsed: \"" + tmp2 + "\"")
				if (sceneParserDebug) trace("WARNING: Scene contents after markdown: \"" + ret + "\"");
			}
			else if (this.getObjectFromString(_ownerClass, sceneName) != null)
			{
				if (sceneParserDebug) trace("WARNING: Have function \""+sceneName+"\" in this!. Calling.");
				this.getObjectFromString(_ownerClass, sceneName)();
			}
			else
			{
				trace("WARNING: Enter scene called with unknown arg/function \""+sceneName+"\". falling back to the debug pane");
				_ownerClass.doNext(_ownerClass.debugPane);

			}
			return ret

		}

		// Parses the contents of a scene tag, shoves the unprocessed text in the scene object (this.parserState)
		// under the proper name.
		// Scenes tagged as such:
		//
		// [sceneName | scene contents blaugh]
		//
		// This gets placed in this.parserState so this.parserState["sceneName"] == "scene contents blaugh"
		//
		// Note that parsing of the actual scene contents is deferred untill it's actually called for display.
		private function parseSceneTag(textCtnt:string):void
		{
			let sceneName:string;
			let sceneCont:string;

			sceneName = textCtnt.substring(textCtnt.indexOf(' ') ,textCtnt.indexOf('|'));
			sceneCont = textCtnt.substr(textCtnt.indexOf('|')+1);

			sceneName = stripStr(sceneName);
			if (sceneParserDebug) trace("WARNING: Adding scene with name \"" + sceneName + "\"")

			// Cleanup the scene content from spurious leading and trailing space.
			sceneCont = trimStr(sceneCont, "\n");
			sceneCont = trimStr(sceneCont, "	");


			this.parserState[sceneName] = stripStr(sceneCont);

		}

		// Evaluates the contents of a button tag, and instantiates the relevant button
		// Current syntax:
		//
		// [button function_name | Button Name]
		// where "button" is a constant string, "function_name" is the name of the function pressing the button will call,
		// and "Button Name" is the text that will be shown on the button.
		// Note that the function name cannot contain spaces (actionscript requires this), and is case-sensitive
		// "Button name" can contain arbitrary spaces or characters, excepting "]", "[" and "|"
		private function parseButtonTag(textCtnt:string):void
		{
			// TODO: Allow button positioning!

			let arr:Array = textCtnt.split("|")
			if (arr.len > 2)
			{
				if (this._settingsClass.haltOnErrors) throw new Error("");
				throw new Error("Too many items in button")
			}

			let buttonName:string = stripStr(arr[1]);
			let buttonFunc:string = stripStr(arr[0].substring(arr[0].indexOf(' ')));
			//trace("WARNING: adding a button with name\"" + buttonName + "\" and function \"" + buttonFunc + "\"");
			_ownerClass.addButton(buttonNum, buttonName, this.enterParserScene, buttonFunc);
			buttonNum += 1;
		}

		// pushes the contents of the passed string into the scene list object if it's a scene, or instantiates the named button if it's a button
		// command and returns an empty string.
		// if the contents are not a button or scene contents, returns the contents.
		private function evalForSceneControls(textCtnt:string):string
		{


			if (sceneParserDebug) trace("WARNING: Checking for scene tags.");
			if (textCtnt.toLowerCase().indexOf("screen") == 0)
			{
				if (sceneParserDebug) trace("WARNING: It's a scene");
				parseSceneTag(textCtnt);
				return "";
			}
			else if (textCtnt.toLowerCase().indexOf("button") == 0)
			{
				if (sceneParserDebug) trace("WARNING: It's a button add statement");
				parseButtonTag(textCtnt);
				return "";
			}
			return textCtnt;
		}


		private function isIfStatement(textCtnt:string):boolean
		{
			if (textCtnt.toLowerCase().indexOf("if") == 0)
				return true;
			else
				return false;
		}

		// Called to determine if the contents of a bracket are a parseable statement or not
		// If the contents *are* a parseable, it calls the relevant function to evaluate it
		// if not, it simply returns the contents as passed
		private function parseNonIfStatement(textCtnt:string, depth: number):string
		{

			let retStr:string = "";
			if (printCcntentDebug) trace("WARNING: Parsing content string: ", textCtnt);


			if (mainParserDebug) trace("WARNING: Not an if statement")
				// Match a single word, with no leading or trailing space
			let singleWordTagRegExp:RegExp = /^[\w\.]+$/;
			let doubleWordTagRegExp:RegExp = /^[\w\.]+\s[\w\.]+$/;

			if (mainParserDebug) trace("WARNING: string length = ", textCtnt.length);

			if (textCtnt.toLowerCase().indexOf("insertsection") == 0)
			{
				if (sceneParserDebug) trace("WARNING: It's a scene section insert tag!");
				retStr = this.getSceneSectionToInsert(textCtnt)
			}
			else if (singleWordTagRegExp.exec(textCtnt))
			{
				if (mainParserDebug) trace("WARNING: It's a single word!");
				retStr += convertSingleArg(textCtnt);
			}
			else if (doubleWordTagRegExp.exec(textCtnt))
			{
				if (mainParserDebug) trace("WARNING: Two-word tag!")
				retStr += convertDoubleArg(textCtnt);
			}
			else
			{
				if (mainParserDebug) trace("WARNING: Cannot parse content. What?", textCtnt)
				retStr += "<b>!Unknown multi-word tag \"" + retStr + "\"!</b>";
			}

			return retStr;
		}

		import flash.utils.getQualifiedClassName;


		// Actual internal parser function.
		// textCtnt is the text you want parsed, depth is a number that reflects the current recursion depth
		// You pass in the string you want parsed, and the parsed result is returned as a string.
		private function recParser(textCtnt:string, depth:number):string
		{
			if (mainParserDebug) trace("WARNING: Recursion call", depth, "---------------------------------------------+++++++++++++++++++++")
			if (printIntermediateParseStateDebug) trace("WARNING: Parsing contents = ", textCtnt)
			// Depth tracks our recursion depth
			// Basically, we need to handle things differently on the first execution, so we don't mistake single-word print-statements for
			// a tag. Therefore, every call of recParser increments depth by 1

			depth += 1;
			textCtnt = String(textCtnt);
			if (textCtnt.length == 0)	// Short circuit if we've been passed an empty string
				return "";

			let i:number = 0;

			let bracketCnt:number = 0;

			let lastBracket:number = -1;

			let retStr:string = "";

			do
			{
				lastBracket = textCtnt.indexOf("[", lastBracket+1);
				if (textCtnt.charAt(lastBracket-1) == "\\")
				{
					// trace("WARNING: bracket is escaped 1", lastBracket);
				}
				else if (lastBracket != -1)
				{
					// trace("WARNING: need to parse bracket", lastBracket);
					break;
				}

			} while (lastBracket != -1)


			if (lastBracket != -1)		// If we have any open brackets
			{
				for (i = lastBracket; i < textCtnt.length; i += 1)
				{
					if (textCtnt.charAt(i) == "[")
					{
						if (textCtnt.charAt(i-1) != "\\")
						{
							//trace("WARNING: bracket is not escaped - 2");
							bracketCnt += 1;
						}
					}
					else if (textCtnt.charAt(i) == "]")
					{
						if (textCtnt.charAt(i-1) != "\\")
						{
							//trace("WARNING: bracket is not escaped - 3");
							bracketCnt -= 1;
						}
					}
					if (bracketCnt == 0)	// We've found the matching closing bracket for the opening bracket at textCtnt[lastBracket]
					{
						let prefixTmp:string, postfixTmp:string;

						// Only prepend the prefix if it actually has content.
						prefixTmp = textCtnt.substring(0, lastBracket);
						if (mainParserDebug) trace("WARNING: prefix content = ", prefixTmp);
						if (prefixTmp)
							retStr += prefixTmp
						// We know there aren't any brackets in the section before the first opening bracket.
						// therefore, we just add it to the returned string


						let tmpStr:string = textCtnt.substring(lastBracket+1, i);
						tmpStr = evalForSceneControls(tmpStr);
						// evalForSceneControls swallows scene controls, so they won't get parsed further now.
						// therefore, you could *theoretically* have nested scene pages, though I don't know WHY you'd ever want that.

						if (isIfStatement(tmpStr))
						{
							if (conditionalDebug) trace("WARNING: early eval as if")
							retStr += parseConditional(tmpStr, depth)
							if (conditionalDebug) trace("WARNING: ------------------0000000000000000000000000000000000000000000000000000000000000000-----------------------")
							//trace("WARNING: Parsed Ccnditional - ", retStr)
						}
						else if (tmpStr)
						{

							if (printCcntentDebug) trace("WARNING: Parsing bracket contents = ", tmpStr);
							retStr += parseNonIfStatement(recParser(tmpStr, depth), depth);

						}

						// First parse into the text in the brackets (to resolve any nested brackets)
						// then, eval their contents, in case they're an if-statement or other control-flow thing
						// I haven't implemented yet

						// Only parse the trailing string if it has brackets in it.
						// if not, we need to just return the string as-is.
						// Parsing the trailing string if it doesn't have brackets could lead to it being
						// incorrectly interpreted as a multi-word tag (and shit would asplode and shit)

						postfixTmp = textCtnt.substring(i+1, textCtnt.length);
						if (postfixTmp.indexOf("[") != -1)
						{
							if (printCcntentDebug) trace("WARNING: Need to parse trailing text", postfixTmp)
							retStr += recParser(postfixTmp, depth);	// Parse the trailing text (if any)
							// Note: This leads to LOTS of recursion. Since we basically call recParser once per
							// tag, it means that if a body of text has 30 tags, we'll end up recursing at least
							// 29 times before finishing.
							// Making this tail-call reursive, or just parsing it flatly may be a much better option in
							// the future, if this does become an issue.
						}
						else
						{
							if (printCcntentDebug) trace("WARNING: No brackets in trailing text", postfixTmp)
							retStr += postfixTmp;
						}

						return retStr;
						// and return the parsed string
					}
				}
			}
			else
			{
				// DERP. We should never have brackets around something that ISN'T a tag intended to be parsed. Therefore, we just need
				// to determine what type of parsing should be done do the tag.
				if (printCcntentDebug) trace("WARNING: No brackets present in text passed to recParse", textCtnt);


				retStr += textCtnt;

			}

			return retStr;
		}


		// Main parser function.
		// textCtnt is the text you want parsed, depth is a number, which should be 0
		// or not passed at all.
		// You pass in the string you want parsed, and the parsed result is returned as a string.
		public function recursiveParser(contents:string, parseAsMarkdown:boolean = false, prettyQuotes:boolean=true):string
		{
			if (mainParserDebug) trace("WARNING: ------------------ Parser called on string -----------------------");
			// Eventually, when this goes properly class-based, we'll add a period, and have this.parserState.

			// Reset the parser's internal state, since we're parsing a new string:
			// trace("WARNING: Purging scene parser contents")
			this.parserState = new Object();



			let ret:string = "";
			// Run through the parser
			contents = contents.replace(/\\n/g, "\n")
			ret = recParser(contents, 0);
			if (printIntermediateParseStateDebug) trace("WARNING: Parser intermediate contents = ", ret)
			// Currently, not parsing text as markdown by default because it's fucking with the line-endings.

			if (prettyQuotes)
			{
				// Convert quotes to prettyQuotes
				ret = this.makeQuotesPrettah(ret);
				// Quote conversion has to go before markdown calls
			}

			if (parseAsMarkdown)
			{
				// trace("WARNING: markdownificating");
				ret = Showdown.makeHtml(ret);


				let regexPCloseTag:RegExp = /<\/p>/gi;
				ret = ret.replace(regexPCloseTag,"</p>\n");
				// Finally, add a additional newline after each closing P tag, because flash only
				// outputs one newline per <p></p> tag, apparently flash again feels the need to be a special snowflake
			}

			// cleanup escaped brackets
			ret = ret.replace(/\\\]/g, "]")
			ret = ret.replace(/\\\[/g, "[")

			// And repeated spaces (this has to be done after markdown processing)
			ret = ret.replace(/  +/g, " ");


			/*
			for (let prop in this.parserState)
			{
				trace("WARNING: this.parserState."+prop+" = "+this.parserState[prop]);
			}
			*/

			// Finally, if we have a parser-based scene. enter the "startup" scene.
			if ("startup" in this.parserState)
			{
				ret = enterParserScene("startup");

				// HORRIBLE HACK
				// since we're initially called via a outputText command, the content of the first page's text will be overwritten
				// when we return. Therefore, in a horrible hack, we return the contents of mainTest.htmlText as the ret value, so
				// the outputText call overwrites the window content with the exact same content.

				// trace("WARNING: Returning: ", ret);
				_ownerClass.currentText = ret;


			}
			//trace(ret);
			// trace("WARNING: Maintext content @ recursiveParser = ", mainText.htmlText.length)
			return ret

		}

		// ---------------------------------------------------------------------------------------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------------------------------------

		// Make shit look nice

		private function makeQuotesPrettah(inStr:string):string
		{

			inStr = inStr.replace(/(\w)'(\w)/g,										"$1\u2019$2")	// Apostrophes
			             .replace(/(^|[\r\n 	\.\!\,\?])"([a-zA-Z<>\.\!\,\?])/g,	"$1\u201c$2")	// Opening doubles
			             .replace(/([a-zA-Z<>\.\!\,\?])"([\r\n 	\.\!\,\?]|$)/g,		"$1\u201d$2")	// Closing doubles
			             .replace(/--/g,  											"\u2014");		// em-dashes
			return inStr;
		}


		// ---------------------------------------------------------------------------------------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------------------------------------

		// Stupid string utility functions, because actionscript doesn't have them (WTF?)

		public function stripStr(str:string):string
		{
			return trimStrBack(trimStrFront(str, " "), " ");
			return trimStrBack(trimStrFront(str, "	"), "	");
		}

		public function trimStr(str:string, char:string = " "):string
		{
			return trimStrBack(trimStrFront(str, char), char);
		}

		public function trimStrFront(str:string, char:string = " "):string
		{
			char = stringToCharacter(char);
			if (str.charAt(0) == char) {
				str = trimStrFront(str.substring(1), char);
			}
			return str;
		}

		public function trimStrBack(str:string, char:string = " "):string
		{
			char = stringToCharacter(char);
			if (str.charAt(str.length - 1) == char) {
				str = trimStrBack(str.substring(0, str.length - 1), char);
			}
			return str;
		}
		public function stringToCharacter(str:string):string
		{
			if (str.length == 1)
			{
				return str;
			}
			return str.slice(0, 1);
		}


		public function isUpperCase(char:string):boolean
		{
			if (!isNaN(Number(char)))
			{
				return false;
			}
			else if (char == char.toUpperCase())
			{
				return true;
			}
			return false;
		}

		public function capitalizeFirstWord(str:string):string
		{

			str = str.charAt(0).toUpperCase()+str.slice(1);
			return str;
		}

	}
}