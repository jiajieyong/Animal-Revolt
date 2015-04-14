#pragma strict
var ammo: GameObject[];
var ammoMap: String[];
static var cowMode = false;
static var dogMode = false;

private var prevIndex = 0;

function Start () {

}

function Update () {

}

function ActivateAmmo (index : int) { 
	if (index != prevIndex) {
		ammo[prevIndex].SetActive(false);
		ammo[index].SetActive(true);
		prevIndex = index;
	}	
}

function animalToIndex(name : String) {
	var animalIndex = 0;
	for (var i = 0; i < ammoMap.length; i++) {
		if (ammoMap[i] == name) {
			animalIndex = i;
			break;
		}
	}
	
	return animalIndex;
}

function SelectAmmo (name : String) {
	var animalIndex = animalToIndex(name);
	
	switch ((animalIndex)) {
		case 1:
			cowMode = false;
			dogMode = false;
			ActivateAmmo(1);
			break;
		case 2:
			cowMode = false;
			dogMode = false;
			ActivateAmmo(2);
			break;
		case 3:
			cowMode = false;
			dogMode = false;
			ActivateAmmo(3);
			break;
		case 4:
			cowMode = false;
			dogMode = true;
			ActivateAmmo(4);
			break;
		case 5:
			cowMode = false;
			dogMode = false;
			ActivateAmmo(5);
			break;
		case 6:
			cowMode = false;
			dogMode = false;
			ActivateAmmo(6);
			break;
		case 7:
			cowMode = true;
			dogMode = false;
			ActivateAmmo(7);
			break;
		case 8:
			cowMode = false;
			dogMode = false;
			ActivateAmmo(8);
			break;
		case 9: 
			cowMode = false;
			dogMode = false;
			ActivateAmmo(9);
			break;
		case 10: 
			cowMode = false;
			dogMode = false;
			ActivateAmmo(10);
			break;	
		case 11:
			cowMode = false;
			dogMode = false;
			ActivateAmmo(11);
			break;
		default:
			cowMode = false;
			dogMode = false;
			ActivateAmmo(0);
	}
}