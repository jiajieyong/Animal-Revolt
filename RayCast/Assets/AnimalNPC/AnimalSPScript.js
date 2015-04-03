#pragma strict

var animalManager : GameObject;
var info : AmmoInfo;


function UpdateAM(am : GameObject, ai : AmmoInfo) {
	animalManager = am;
	info = ai;
}

function PickedUp(go : GameObject) {
	
	info.ammoTransform = go.transform;
	info.ammoName = go.name;
	
	animalManager.SendMessage("Spawn", info);

}
