#pragma strict
var ammo: GameObject[];
static var cowMode = false;

function Start () {
	SelectAmmo(0);
}

function Update () {
	//default ammunition - stones
	if (Input.GetKeyDown("1")){
		cowMode = false;
		SelectAmmo(0);
	}
	//cow is the current ammunition
	if (Input.GetKeyDown("2")){
		cowMode = true;
		SelectAmmo(1);
	}
}

function SelectAmmo (index : int) { 
	for (var obj: GameObject in ammo)
		obj.SetActive(false);
		
	ammo[index].SetActive(true);
}