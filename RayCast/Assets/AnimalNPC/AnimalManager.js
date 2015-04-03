#pragma strict

var frogSpawnPoints : Transform[];
var frog : GameObject;

var startOfGame = true;

function Start () {

	for (var i = 0; i < frogSpawnPoints.Length; i++) {
		StartingSpawn(frogSpawnPoints[i], "frog");
	}

	startOfGame = false;
}

function StartingSpawn(ammoTransform : Transform, ammoName : String) {
	var clone = Instantiate (frog, ammoTransform.position, ammoTransform.rotation);
  	clone.name = ammoName;
  	
}

function Spawn (go : GameObject)
{
	var t = go.transform.position;
	var r = go.transform.rotation;
	var n = go.name;
	
	yield WaitForSeconds(5);
	
    var clone = Instantiate (frog, t, r);
  	clone.name = n;

}

function PickedUp(go : GameObject) {

	Spawn(go);

}