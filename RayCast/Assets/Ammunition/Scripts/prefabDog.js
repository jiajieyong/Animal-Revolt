#pragma strict

var theBullet : Rigidbody;
var Speed = 20;

var radius = 0;
var power = 10;
var bullet : int = 10;

private var timer = 0.0;
var shootSpeed = 0.1;
var gun : Transform;
var isValidTarget = false;
var showInvalid = false;
var time : float;
var inventory : GameObject;

private var target : GameObject;

function Start () {

}

function Update () {

	if (Input.GetMouseButtonDown(0)) {
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
			var style = new GUIStyle();
			style.richText = true;

			GUI.Label(Rect(200,200,1000,1000), "<size=20><color=red>Invalid Target</color></size>");
		} else {
			time = 0;
			showInvalid = false;
		}
	}
	
	GUI.Label(Rect(600,200,1000,1000), "<size=20><color=red>" + bullet +"</color></size>");
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
