#pragma strict

var frogSpawnPoints : Transform[];
var ammoInfo : AmmoInfo;
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
  	
  	clone.GetComponent(AnimalSPScript).UpdateAM(gameObject, ammoInfo);
  	
}

function Spawn (info : AmmoInfo)
{
	var t = info.ammoTransform.position;
	var r = info.ammoTransform.rotation;
	var n = info.ammoName;
	
	yield WaitForSeconds(5);
	
    var clone = Instantiate (frog, t, r);
  	clone.name = n;

  	clone.GetComponent(AnimalSPScript).UpdateAM(gameObject, info);
}