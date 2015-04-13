#pragma strict

private var motor : CharacterMotor;

function Start() {
	motor = GameObject.Find("/First Person Controller").GetComponent(CharacterMotor);
}

function OnCollisionEnter(collision : Collision) {
	motor.movement.velocity = Vector3(0,0,0);
}