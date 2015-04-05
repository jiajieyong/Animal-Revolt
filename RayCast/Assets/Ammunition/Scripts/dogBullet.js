
#pragma strict
var target : GameObject;
var speed : float = 0.5;
var maxSpeed : float = 3;
var damageDisplay : GameObject;
var origin : Vector3;
var TheDamage : int;
private var isNotYetUpdated = false;
private var updated = false;
function Start () {
	damageDisplay = GameObject.FindGameObjectsWithTag ("Display")[0];
}

function Update () {
	if (isNotYetUpdated) {
		GetComponentInChildren(AIRig).AI.WorkingMemory.SetItem("target", target, GameObject);
		isNotYetUpdated = false;
	}
}

function OnCollisionEnter (info : Collision) {
	if (info.collider.CompareTag("Enemy")) {	
 		var containerE = new Container(TheDamage, info.collider.transform, "enemy", "instant");
		damageDisplay.transform.SendMessage("DisplayDamage", containerE);
		info.transform.SendMessage("ApplyDamage", 10, SendMessageOptions.DontRequireReceiver);
		Destroy(gameObject);
	}
 }

 function updateTarget(target : GameObject) {
 	this.target = target;
 	isNotYetUpdated = true;
 }