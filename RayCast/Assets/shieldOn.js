#pragma strict
var guardOn : GameObject;
var shieldCooldown = 10;
private var timer = 0.0;

function Start () {
	guardOn = GameObject.Find("First Person Controller");
}

function Update () {
	if (Input.GetMouseButtonDown(0) && GameObject.Find("Canvas").GetComponent(LoadOnClickPause).pauseGame == false && timer <= Time.time ) {
		guardOn.transform.BroadcastMessage ("cottonGuard");		
		timer = Time.time + shieldCooldown;
	}
}