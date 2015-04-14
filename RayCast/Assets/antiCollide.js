#pragma strict

private var motor : CharacterMotor;

function Start() {
	motor = GameObject.Find("/First Person Controller").GetComponent(CharacterMotor);
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag != "PlayerBullet")
		motor.movement.velocity = Vector3(0,0,0);
}