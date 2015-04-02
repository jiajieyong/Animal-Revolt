#pragma strict
var dispenser : Transform;
var destination: Transform;

function Start () {
}

function Update () {
	if (Vector3.Distance(destination.position, transform.position) <= 15f) {
	dispense(); 
	}
}

function dispense(){
	var clone = Instantiate(dispenser, transform.position, transform.rotation);
}