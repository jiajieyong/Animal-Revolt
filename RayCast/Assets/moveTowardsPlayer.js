#pragma strict
var speed : float = 20;
var playerObject : GameObject; 

function Start () {
	playerObject = GameObject.Find("Display");
	
}

function Update () {
	var playerTransform = playerObject.transform;
	transform.position = Vector3.MoveTowards(transform.position, playerTransform.position, speed*Time.deltaTime);
}