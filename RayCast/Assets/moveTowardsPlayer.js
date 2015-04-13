#pragma strict
var speed : float = 20;
var target : Vector3; 

function Start () {
	
}

function Update () {
	if (transform.position == target) {
		Destroy(gameObject);
	} else {
		transform.position = Vector3.MoveTowards(transform.position, target, speed*Time.deltaTime);
	}
}