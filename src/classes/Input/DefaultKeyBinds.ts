import BindableActions from './BindableActions';
import KeyCombination from './KeyCombination';
import KeyPair from './KeyPair';

/**
 * List of known bound keyboard methods
 * 
 * Some of the methods use an undefined "Event" parameter to pass into the actual UI components...
 * ... strip this out and instead modify the handlers on the execution end to have a default null parameter?
 * 
 * ** Bypass handler if mainView.eventTestInput.x == 270.5
 * ** Bypass handler if mainView.nameBox.visible && stage.focus == mainView.nameBox
 * 
 * 38	-- UpArrow			-- Cheat code for Humus stage 1
 * 40	-- DownArrow		-- Cheat code for Humus stage 2
 * 37 	-- LeftArrow		-- Cheat code for Humus stage 3
 * 39	-- RightArrow		-- Cheat code for Humus stage 4 IF str > 0, not gameover, give humus
 * 
 * 83	-- s				-- Display stats if main menu button displayed
 * 76	-- l				-- Level up if level up button displayed
 * 112	-- F1				-- Quicksave to slot 1 if menu_data displayed
 * 113	-- F2				-- Quicksave slot 2
 * 114	-- F3				-- Quicksave slot 3
 * 115	-- F4				-- Quicksave slot 4
 * 116	-- F5				-- Quicksave slot 5
 * 
 * 117	-- F6				-- Quickload slot 1
 * 118	-- F7				-- Quickload slot 2
 * 119	-- F8				-- Quickload slot 3
 * 120	-- F9				-- Quickload slot 4
 * 121	-- F10				-- Quickload slot 5
 * 
 * 8	-- Backspace		-- Go to "Main" menu if in game
 * 68	-- d				-- Open saveload if in game
 * 65	-- a				-- Open apperance if in game
 * 78	-- n				-- "no" if button index 1 displays no		<--
 * 89	-- y				-- "yes" if button index 0 displays yes		<-- These two seem akward
 * 80	-- p				-- display perks if in game
 * 
 * 13/32 -- Enter/Space		-- if button index 0,4,5 or 9 has text of (nevermind, abandon, next, return, back, leave, resume) execute it
 * 
 * 36	-- Home				-- Cycle the background of the maintext area
 * 
 * 49	-- 1				-- Execute button index 0 if visisble
 * 50	-- 2				-- ^ index 1
 * 51	-- 3				-- ^ index 2
 * 52	-- 4				-- ^ index 3
 * 53	-- 5				-- ^ index 4
 * 54/81-- 6/q				-- ^ index 5
 * 55/87-- 7/w				-- ^ index 6
 * 56/69-- 8/e				-- ^ index 7
 * 57/82-- 9/r				-- ^ index 8
 * 48/84-- 0/t				-- ^ index 9
 * 
 * 68	-- ???				-- ??? Unknown, theres a conditional check for the button, but no code is ever executed
 */

const DefaultKeyBinds = [];
DefaultKeyBinds[BindableActions.Stats] = new KeyPair(BindableActions.Stats, new KeyCombination(83));
DefaultKeyBinds[BindableActions.LevelUp] = new KeyPair(BindableActions.LevelUp, new KeyCombination(76));
DefaultKeyBinds[BindableActions.Quicksave1] = new KeyPair(BindableActions.Quicksave1, new KeyCombination(112));
DefaultKeyBinds[BindableActions.Quicksave2] = new KeyPair(BindableActions.Quicksave2, new KeyCombination(113));
DefaultKeyBinds[BindableActions.Quicksave3] = new KeyPair(BindableActions.Quicksave3, new KeyCombination(114));
DefaultKeyBinds[BindableActions.Quicksave4] = new KeyPair(BindableActions.Quicksave4, new KeyCombination(115));
DefaultKeyBinds[BindableActions.Quicksave5] = new KeyPair(BindableActions.Quicksave5, new KeyCombination(116));
DefaultKeyBinds[BindableActions.Quickload1] = new KeyPair(BindableActions.Quickload1, new KeyCombination(117));
DefaultKeyBinds[BindableActions.Quickload2] = new KeyPair(BindableActions.Quickload2, new KeyCombination(118));
DefaultKeyBinds[BindableActions.Quickload3] = new KeyPair(BindableActions.Quickload3, new KeyCombination(119));
DefaultKeyBinds[BindableActions.Quickload4] = new KeyPair(BindableActions.Quickload4, new KeyCombination(120));
DefaultKeyBinds[BindableActions.Quickload5] = new KeyPair(BindableActions.Quickload5, new KeyCombination(121));
DefaultKeyBinds[BindableActions.MainMenu] = new KeyPair(BindableActions.MainMenu, new KeyCombination(8));
DefaultKeyBinds[BindableActions.SaveLoad] = new KeyPair(BindableActions.SaveLoad, new KeyCombination(68));
DefaultKeyBinds[BindableActions.Appearance] = new KeyPair(BindableActions.Appearance, new KeyCombination(65));
DefaultKeyBinds[BindableActions.No] = new KeyPair(BindableActions.No, new KeyCombination(78));
DefaultKeyBinds[BindableActions.Yes] = new KeyPair(BindableActions.Yes, new KeyCombination(89));
DefaultKeyBinds[BindableActions.Perks] = new KeyPair(BindableActions.Perks, new KeyCombination(80));
DefaultKeyBinds[BindableActions.Back] = new KeyPair(BindableActions.Back, new KeyCombination(13), new KeyCombination(32));
DefaultKeyBinds[BindableActions.CycleBackground] = new KeyPair(BindableActions.CycleBackground, new KeyCombination(36));
DefaultKeyBinds[BindableActions.Button0] = new KeyPair(BindableActions.Button0, new KeyCombination(49));
DefaultKeyBinds[BindableActions.Button1] = new KeyPair(BindableActions.Button1, new KeyCombination(50));
DefaultKeyBinds[BindableActions.Button2] = new KeyPair(BindableActions.Button2, new KeyCombination(51));
DefaultKeyBinds[BindableActions.Button3] = new KeyPair(BindableActions.Button3, new KeyCombination(52));
DefaultKeyBinds[BindableActions.Button4] = new KeyPair(BindableActions.Button4, new KeyCombination(53));
DefaultKeyBinds[BindableActions.Button5] = new KeyPair(BindableActions.Button5, new KeyCombination(54), new KeyCombination(81));
DefaultKeyBinds[BindableActions.Button6] = new KeyPair(BindableActions.Button6, new KeyCombination(55), new KeyCombination(87));
DefaultKeyBinds[BindableActions.Button7] = new KeyPair(BindableActions.Button7, new KeyCombination(56), new KeyCombination(69));
DefaultKeyBinds[BindableActions.Button8] = new KeyPair(BindableActions.Button8, new KeyCombination(57), new KeyCombination(82));
DefaultKeyBinds[BindableActions.Button9] = new KeyPair(BindableActions.Button9, new KeyCombination(48), new KeyCombination(84));
export default DefaultKeyBinds;