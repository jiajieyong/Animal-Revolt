#pragma strict
var ammo: GameObject[];
static var cowMode = false;
static var dogMode = false;

function Start () {
	SelectAmmo(0);
}

function Update () {
	//default ammunition - stones
	if (Input.GetKeyDown("1")){
		cowMode = false;
		dogMode = false;
		SelectAmmo(0);
	}
	//cow is the current ammunition
	if (Input.GetKeyDown("2")){
		cowMode = true;
		dogMode = false;
		SelectAmmo(1);
	}
	if (Input.GetKeyDown("3")){
		cowMode = false;
		dogMode = false;
		SelectAmmo(2);
	}
	if (Input.GetKeyDown("4")){
		cowMode = false;
		dogMode = false;
		SelectAmmo(3);
	}
	if (Input.GetKeyDown("5")){
		cowMode = false;
		dogMode = true;
		SelectAmmo(4);
	}
}

function SelectAmmo (index : int) { 
	for (var obj: GameObject in ammo)
		obj.SetActive(false);
		
	ammo[index].SetActive(true);
}