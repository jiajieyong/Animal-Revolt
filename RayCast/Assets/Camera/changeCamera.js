#pragma strict
#pragma strict
var crossHairMode: GameObject[];
var defaultCH : int = 0; 
var projectileCH : int = 1;
static var defaultCrossHair;
static var projectileCrossHair;

function Start () {
	SelectCrossHair(defaultCH);
}

function Update () {
	//default crossHair when not in cowMode
	if (!changeAmmo.cowMode){
		SelectCrossHair(defaultCH);
	}
	else {
		SelectCrossHair(projectileCH);
	}
}

function SelectCrossHair (index : int) { 
	if (index == defaultCH){
		defaultCrossHair = true;
		projectileCrossHair = false;
	}
	else if (index == projectileCH){
		defaultCrossHair = false;
		projectileCrossHair = true;
	}
}