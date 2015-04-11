#pragma strict
var payload : GameObject;
var player: GameObject;
var enemy : GameObject; 

function Start () {
	var clone : GameObject = Instantiate(enemy, Vector3(8.22, -5.2, 73.7), transform.rotation);
	var rig : AIRig = clone.GetComponentInChildren(AIRig);	rig.AI.WorkingMemory.SetItem("payload", payload);
	rig.AI.WorkingMemory.SetItem("player", player);
	rig.AI.WorkingMemory.SetItem("myself", clone);
}

function Update () {
	
}