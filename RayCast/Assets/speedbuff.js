#pragma strict
var speedBuff: GameObject;
var speedCooldown = 11;
var inventory : GameObject;
private var timer = 0.0;

function Start () {
	speedBuff = GameObject.Find("First Person Controller");
}

function Update () {
	if (Input.GetMouseButtonDown(0) && GameObject.Find("Canvas").GetComponent(LoadOnClickPause).pauseGame == false && timer <= Time.time) {
		speedBuff.transform.BroadcastMessage ("hax");	
		timer = Time.time + speedCooldown;
		inventory.GetComponent(Inventory).decrementBullet();
	}
}