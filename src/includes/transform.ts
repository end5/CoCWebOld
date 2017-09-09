//Updates the player's gender
public function genderCheck():void {
	if(player.lowerBody.cockSpot.count() > 0) {
		if(player.lowerBody.vaginaSpot.count() > 0) player.gender = 3;
		else player.gender = 1;
	}
	else if(player.lowerBody.vaginaSpot.count() > 0) player.gender = 2;
	else player.gender = 0;
	//Fertility fixing
	if(player.lowerBody.vaginaSpot.hasVagina() && player.fertility < 1) player.fertility = 1;
}

