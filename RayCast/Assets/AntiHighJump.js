#pragma strict
var maxYSpeed : float;
var maxKnockBack : float;
private var motor : CharacterMotor;

function Start () {
	motor = gameObject.GetComponent(CharacterMotor);
}

function Update () {
	var v : Vector3 = motor.movement.velocity;
	if (v.y > maxYSpeed) {
		motor.movement.velocity = Vector3(v.x, maxYSpeed, v.z);
	}
	
	var planarSpeed = Vector3(v.x, 0, v.z);
	if (planarSpeed.magnitude > maxKnockBack) {
		planarSpeed = Vector3.Normalize(planarSpeed) * maxKnockBack;
		motor.movement.velocity = Vector3(planarSpeed.x, v.y, planarSpeed.z);
	} 
}