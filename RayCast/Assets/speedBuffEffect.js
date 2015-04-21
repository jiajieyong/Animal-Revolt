#pragma strict
var controller: GameObject;
var buff = false;

var speed : Texture2D;
function Start () {

}

function Update () {
	if (buff == true) {
		controller.GetComponent(CharacterMotor).movement.maxForwardSpeed = 50;
		controller.GetComponent(CharacterMotor).movement.maxSidewaysSpeed = 50;
		controller.GetComponent(CharacterMotor).movement.maxBackwardsSpeed = 50;
		controller.GetComponent(CharacterMotor).movement.maxGroundAcceleration = 200;
	} else {
		controller.GetComponent(CharacterMotor).movement.maxForwardSpeed = 5;
		controller.GetComponent(CharacterMotor).movement.maxSidewaysSpeed = 5;
		controller.GetComponent(CharacterMotor).movement.maxBackwardsSpeed = 5;
		controller.GetComponent(CharacterMotor).movement.maxGroundAcceleration = 20;
	}
}

function hax() {
	if (buff == false) {
		buff = true;
		yield WaitForSeconds (10);
		buff = false;
	}
}

function OnGUI () {
	if (buff == true) {
        GUI.DrawTexture(Rect(Screen.width * 0.5 - 380,Screen.height - 90 ,64,64), speed);
	}
}