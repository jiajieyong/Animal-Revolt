#pragma strict

var frogSP : Transform[];
var cowSP : Transform[];
var spawnTime : int = 10;
var frog : GameObject;
var cow : GameObject;

var startOfGame = true;

function Start () {

	for (var i = 0; i < frogSP.Length; i++) {
		StartingSpawn(frogSP[i], "frog", frog);
	}
	
	for (i = 0; i < cowSP.Length; i++) {
		StartingSpawn(cowSP[i], "cow", cow);
	}

	startOfGame = false;
}

function StartingSpawn(ammoTransform : Transform, ammoName : String, npc : GameObject) {
	var clone = Instantiate (npc, ammoTransform.position, ammoTransform.rotation);
  	clone.name = ammoName;
  	
}

function Spawn (t : Vector3, r : Quaternion, n : String)
{
	yield WaitForSeconds(spawnTime);
	var clone : GameObject;
	switch(n) {
	
		case "frog" :
			clone = Instantiate (frog, t, r);
  			clone.name = n;
	
			break;
			
		case "cow" :
			clone = Instantiate (cow, t, r);
  			clone.name = n;
			
			break;
			
		default : break;
	
	}
	
	
	
	
    

}

function PickedUp(go : GameObject) {

	var t = go.transform.position;
	var r = go.transform.rotation;
	var n = go.name;

	Spawn(t, r, n);

}