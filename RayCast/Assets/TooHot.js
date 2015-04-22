#pragma strict
var style : GUIStyle;
private var displayWarning = false;
private var time: float = 0;

function Start () {
	
}

function Update () {
	if (displayWarning) {
		time += Time.deltaTime;
		if (time > 4) {
			displayWarning = false;
			time = 0;
		}
	}
}

function OnTriggerEnter (other : Collider) {
	if (other.CompareTag("Player")){
		var controller : CharacterController = other.GetComponent.<CharacterController>();
		var horizontalVelocity : Vector3 = controller.velocity;
		horizontalVelocity = Vector3(controller.velocity.x, 0, controller.velocity.z);
		var motor = other.GetComponent(CharacterMotor);
		motor.SetVelocity(-horizontalVelocity*1.2);
		displayWarning = true;
	}
}

function OnGUI() {
	if (displayWarning) {
		GUI.Label(Rect(Screen.width * 0.5 - 150, Screen.height * 0.5 - 50, 100, 100), "The fire is too hot", style);
	}
}