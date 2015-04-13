#pragma strict

var spawnTime : int = 10;

var frogSP : Transform[];
var cowSP : Transform[];
var dogSP : Transform[];
var ratSP : Transform[];
var horseSP : Transform[];
var goatSP : Transform[];
var sheepSP : Transform[];
var catSP : Transform[];

var frog : GameObject;
var cow : GameObject;
var dog : GameObject;
var rat : GameObject;
var horse : GameObject;
var goat : GameObject;
var sheep : GameObject;
var cat : GameObject;


var startOfGame = true;

function Start () {

	for (var i = 0; i < frogSP.Length; i++) {
		StartingSpawn(frogSP[i], "frog", frog);
	}
	
	for (i = 0; i < cowSP.Length; i++) {
		StartingSpawn(cowSP[i], "cow", cow);
	}
	
	for (i = 0; i < dogSP.Length; i++) {
		StartingSpawn(dogSP[i], "dog", dog);
	}
	
	for (i = 0; i < ratSP.Length; i++) {
		StartingSpawn(ratSP[i], "rat", rat);
	}
	
	for (i = 0; i < horseSP.Length; i++) {
		StartingSpawn(horseSP[i], "horse", horse);
	}
	
	for (i = 0; i < goatSP.Length; i++) {
		StartingSpawn(goatSP[i], "goat", goat);
	}
	
	for (i = 0; i < sheepSP.Length; i++) {
		StartingSpawn(sheepSP[i], "sheep", sheep);
	}
	
	for (i = 0; i < catSP.Length; i++) {
		StartingSpawn(catSP[i], "cat", cat);
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
			
		case "dog" :
			clone = Instantiate (dog, t, r);
  			clone.name = n;
			break;
			
		case "rat" :
			clone = Instantiate (rat, t, r);
  			clone.name = n;	
			break;
			
		case "horse" :
			clone = Instantiate (horse, t, r);
  			clone.name = n;
			break;
			
		case "goat" :
			clone = Instantiate (goat, t, r);
  			clone.name = n;
			break;
		
		case "sheep" :
			clone = Instantiate (sheep, t, r);
  			clone.name = n;
			break;
			
		case "cat" :
			clone = Instantiate (cat, t, r);
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