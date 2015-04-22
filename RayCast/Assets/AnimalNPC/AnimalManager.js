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
var chickenSP : Transform[];
var bullSP : Transform[];

var frog : GameObject;
var cow : GameObject;
var dog : GameObject;
var rat : GameObject;
var horse : GameObject;
var goat : GameObject;
var sheep : GameObject;
var cat : GameObject;
var chicken : GameObject;
var bull : GameObject;

var frogCount : int = 0;
var cowCount : int = 0;
var dogCount : int = 0;
var ratCount : int = 0;
var horseCount : int = 0;
var goatCount : int = 0;
var sheepCount : int = 0;
var catCount : int = 0;
var chickenCount : int = 0;
var bullCount : int = 0;

var startOfGame = true;

var enemyManager : EnemyManager;

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
	
	for (i = 0; i < chickenSP.Length; i++) {
		StartingSpawn(chickenSP[i], "chicken", chicken);
	}
	
	for (i = 0; i < bullSP.Length; i++) {
		StartingSpawn(bullSP[i], "bull", bull);
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
			
		case "chicken" :
			clone = Instantiate (chicken, t, r);
  			clone.name = n;
			break;
			
		case "bull" :
			clone = Instantiate (bull, t, r);
  			clone.name = n;
			break;

			
		default : break;
	
	}
	
	
	
	
    

}

function PickedUp(go : GameObject) {

	var t = go.transform.position;
	var r = go.transform.rotation;
	var n = go.name;

	if (enemyManager.spawnMode != SpawnType.Survival)
		Spawn(t, r, n);
		
	if (enemyManager.spawnMode == SpawnType.Survival) {
		switch(n) {
		
			case "frog" :
				frogCount++;
				break;
				
			case "cow" :
				cowCount++;
				break;
				
			case "dog" :
				dogCount++;
				break;
				
			case "rat" :
				ratCount++;
				break;
				
			case "horse" :
				horseCount++;
				break;
				
			case "goat" :
				goatCount++;
				break;
			
			case "sheep" :
				sheepCount++;
				break;
				
			case "cat" :
				catCount++;
				break;
				
			case "chicken" :
				chickenCount++;
				break;
				
			case "bull" :
				bullCount++;
				break;

				
			default : break;
		
		}
	}

}

function RespawnAnimals() {

	for (var i = 0; i < frogCount; i++) {
		StartingSpawn(frogSP[i], "frog", frog);
	}
	
	for (i = 0; i < cowCount; i++) {
		StartingSpawn(cowSP[i], "cow", cow);
	}
	
	for (i = 0; i < dogCount; i++) {
		StartingSpawn(dogSP[i], "dog", dog);
	}
	
	for (i = 0; i < ratCount; i++) {
		StartingSpawn(ratSP[i], "rat", rat);
	}
	
	for (i = 0; i < horseCount; i++) {
		StartingSpawn(horseSP[i], "horse", horse);
	}
	
	for (i = 0; i < goatCount; i++) {
		StartingSpawn(goatSP[i], "goat", goat);
	}
	
	for (i = 0; i < sheepCount; i++) {
		StartingSpawn(sheepSP[i], "sheep", sheep);
	}
	
	for (i = 0; i < catCount; i++) {
		StartingSpawn(catSP[i], "cat", cat);
	}
	
	for (i = 0; i < chickenCount; i++) {
		StartingSpawn(chickenSP[i], "chicken", chicken);
	}
	
	for (i = 0; i < bullCount; i++) {
		StartingSpawn(bullSP[i], "bull", bull);
	}
	
	frogCount = 0;
	cowCount = 0;
	dogCount = 0;
	ratCount = 0;
	horseCount = 0;
	goatCount = 0;
	sheepCount = 0;
	catCount = 0;
	chickenCount = 0;
	bullCount = 0;

	

}