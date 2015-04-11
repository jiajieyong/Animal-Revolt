#pragma strict

var theBullet : Rigidbody;
var Speed = 20;

var radius = 0;
var power = 10;
var bullet : int = 10;
var style : GUIStyle;

private var timer = 0.0;
var shootSpeed = 0.1;
var gun : Transform;
private var isValidTarget = false;
private var showInvalid = false;
private var time : float;
var inventory : GameObject;

private var target : GameObject;

function Start () {

}

function Update () {

	if (Input.GetMouseButtonDown(0) && GameObject.Find("Canvas").GetComponent(LoadOnClickPause).pauseGame == false) {
		if (isValidTarget) {
			var clone = Instantiate(theBullet, transform.position, transform.rotation);
			clone.GetComponent(dogBullet).updateTarget(target.gameObject);
			clone.velocity = transform.TransformDirection(Vector3(0, 0, Speed));
			isValidTarget = false;
			inventory.GetComponent(Inventory).decrementBullet();
		}
	}
}

function OnGUI() {
	if (showInvalid) {
		time += Time.deltaTime;

		if (time < 5) {
			GUI.Label(Rect(Screen.width * 0.5 - 90, Screen.height * 0.5 - 50, 100, 100), "Invalid Target", style);
		} else {
			time = 0;
			showInvalid = false;
		}
	}
}

function updateTarget(target1 : Transform) {
	if (target1.gameObject.tag == "Enemy") {
		if (target1.GetComponent(Enemy).health > 0) {
			isValidTarget = true;
			target = target1.gameObject;
		}
	} else {
		showInvalid = true;
	}
}
