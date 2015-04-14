#pragma strict
private var time : float = 0;
var laser : GameObject;

function Start () {
	
}

function Update () {
	gameObject.transform.forward = Vector3(0, 0, 1);
	
	time += Time.deltaTime;
	
	if (time > 5) {
		laser.GetComponent(laserCharging).enabled = true;
	}
}