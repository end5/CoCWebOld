import { FlagType } from "../FlagType";
import { Flags } from "../Flags";
import { Character } from "../Character/Character";
import { NextScreenChoices } from "../ScreenDisplay";
import { CView } from "../../Page/ContentView";
import { townSquare } from "./TownSquare";
import { Time } from "../Utilities/Time";

export const DojoFlags = {
    DayUse: -1, // Used to store the day of the payment
    LifetimePass: false,
};

Flags.set(FlagType.Dojo, DojoFlags);

export function dojoEntry(player: Character): NextScreenChoices {
    if (DojoFlags.DayUse || DojoFlags.LifetimePass)
        return dojoMenu(player);

    CView.clear();
    CView.text("The entrance of the dojo.");
    return {
        choices: [
            ["Day Use", payForDayOption],
            ["Lifetime Access", payLifetimeOption],
            ["Leave", townSquare]
        ]
    };
}

function payForDayOption(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("Pay 50 gold to use the dojo?");
    return { yes: payForDay, no: dojoEntry };
}

function payForDay(player: Character): NextScreenChoices {
    player.inventory.gems -= 50;
    DojoFlags.DayUse = Time.day;
    return dojoMenu(player);
}

function payLifetimeOption(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("Pay 1000 gold to use the dojo forever?");
    return { yes: payLifetime, no: dojoEntry };
}

function payLifetime(player: Character): NextScreenChoices {
    player.inventory.gems -= 1000;
    DojoFlags.LifetimePass = true;
    return dojoMenu(player);
}

function dojoMenu(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("This is the training room.");
    return {
        choices: [
            ["Train Strength", trainStrength],
            ["Train Toughness", trainToughness],
            ["Train Speed", trainSpeed],
            ["Leave", townSquare]
        ]
    };
}

function trainStrength(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You train your Strength.");
    player.stats.str++;
    player.stats.fatigue += 30;
    return { next: dojoEntry };
}

function trainToughness(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You train your Toughness.");
    player.stats.tou++;
    player.stats.fatigue += 30;
    return { next: dojoEntry };
}

function trainSpeed(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You train your Speed.");
    player.stats.spe++;
    player.stats.fatigue += 30;
    return { next: dojoEntry };
}
