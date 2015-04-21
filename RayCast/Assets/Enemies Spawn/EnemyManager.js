#pragma strict

var spawnMode : SpawnType;

var enemyMelee : GameObject;                // The enemy prefab to be spawned.
var enemyShoot : GameObject;
var enemyShootCTF : GameObject;

var spawnTime : float = 5f;            // How long between each spawn.
var totalWaves : float = 3f;
var spawn = true;
var startOfWave = true;
var currentEnemyCount = 0f;
var maxEnemyCount = 20f;

var playerHealth : playerHealth;       // Reference to the player's heatlh.
var style : GUIStyle; 
var player: GameObject;
var payload : GameObject;

var waveSP : Transform[];         // An array of the spawn points this enemy can spawn from.
var ctfSP : Transform[]; 

private var totalEnemies : float = 0f;
private var showLabel = false;
private var numWaves : float = 1f;
private var enemyDeathCount : float = 0f;
private var normalSP : List.< GameObject > = new List.< GameObject >();

function Start ()
{
	var enemyNum : float;
	StartCoroutine("StartSpawn");
	
}

function StartSpawn() {

	while (spawn) {
		switch(spawnMode) {
			case SpawnType.Normal: 	
			
				if (normalSP.Count != 0) {
					NormalSpawn();
				}
			
											
				break;
			
			case SpawnType.Wave:
			
				
				if (numWaves <= totalWaves) {
				
					if(startOfWave) {
						ToggleLable();
						yield WaitForSeconds(3);
						ToggleLable();
						
						startOfWave = false;
					}
					
			
					if (totalEnemies < numWaves*5f && enemyDeathCount <= numWaves*5f) {
						yield WaitForSeconds(spawnTime);
						WaveSpawn();
					}
					
					if (enemyDeathCount >= numWaves*5f) {
						enemyDeathCount = 0f;
						totalEnemies = 0f;
						numWaves++;
						yield WaitForSeconds(5);
						startOfWave = true;
						break;
					}
					
					break;
					
					
				} else {
					spawn = false;
				}
				
				break;
				
			case SpawnType.CTF :
			
				CTFStartSpawn ();
				spawn = false;
			
				break;
			
			
			default:
            	spawn = false;
                break;
		}
		
		yield new WaitForEndOfFrame ();
			
	}
	

}

function AddNormalSP (spawnPoint : GameObject)
{

	var existed = false;
	
    for (var i=0; i<normalSP.Count; i++){
        if(normalSP[i] == spawnPoint) {
        	existed = true;
        	break;
        }  
    }

	if(!existed) {
		normalSP.Add(spawnPoint);
	}
	
}

function RemoveNormalSP (spawnPoint : GameObject)
{
	var index;
	for (var i=0; i<normalSP.Count; i++){
        if(normalSP[i] == spawnPoint) {
        	normalSP.Remove(spawnPoint);
        	break;
        }  
    }
	
	
}

function NormalSpawn () 
{
	if(currentEnemyCount < maxEnemyCount) {

		var index : int = Random.Range (0, normalSP.Count);
		var clone = Instantiate (DecideEnemy(), normalSP[index].transform.position, normalSP[index].transform.rotation);
		
		clone.GetComponent(Enemy).updateEnemy(gameObject, player);
	    var rig : AIRig = clone.GetComponentInChildren(AIRig);	
		rig.AI.WorkingMemory.SetItem("payload", payload);
		rig.AI.WorkingMemory.SetItem("player", player);
		rig.AI.WorkingMemory.SetItem("myself", clone);
		
		
		EnemyCounter(1);
		
		yield WaitForSeconds(spawnTime);
	
	}
	
	
}

function WaveSpawn ()
{
    if(playerHealth.playerHealth <= 0f)
    {
        return;
    }

    var spawnPointIndex : int = Random.Range (0, waveSP.Length);
    var clone = Instantiate (DecideEnemy(), waveSP[spawnPointIndex].position, waveSP[spawnPointIndex].rotation);

    clone.GetComponent(Enemy).updateEnemy(gameObject, player);
    var rig : AIRig = clone.GetComponentInChildren(AIRig);	
	rig.AI.WorkingMemory.SetItem("payload", payload);
	rig.AI.WorkingMemory.SetItem("player", player);
	rig.AI.WorkingMemory.SetItem("myself", clone);
    
    totalEnemies++;
}

function CTFStartSpawn () {
	
	for (var i = 0; i < ctfSP.Length; i++) {
	    var clone = Instantiate (DecideEnemyCTF(), ctfSP[i].position, ctfSP[i].rotation);

	    clone.GetComponent(Enemy).updateEnemy(gameObject, player);
	    var rig : AIRig = clone.GetComponentInChildren(AIRig);	
		rig.AI.WorkingMemory.SetItem("payload", payload);
		rig.AI.WorkingMemory.SetItem("player", player);
		rig.AI.WorkingMemory.SetItem("myself", clone);
	}

}

function CTFSpawn () {
	yield WaitForSeconds(20);
	
	var spawnPointIndex : int = Random.Range (0, ctfSP.Length);
    var clone = Instantiate (DecideEnemyCTF(), ctfSP[spawnPointIndex].position, ctfSP[spawnPointIndex].rotation);

    clone.GetComponent(Enemy).updateEnemy(gameObject, player);
    var rig : AIRig = clone.GetComponentInChildren(AIRig);	
	rig.AI.WorkingMemory.SetItem("payload", payload);
	rig.AI.WorkingMemory.SetItem("player", player);
	rig.AI.WorkingMemory.SetItem("myself", clone);	
}

function ToggleLable() {
	showLabel = !showLabel;
}

function OnGUI () { 

	if (showLabel) {
		GUI.Label(Rect(Screen.width/2 - 50,Screen.height/2 - 25 ,100, 50), "WAVE " + numWaves, style); 
	}

}

// Enemy counter for Wave and CTF mode
function EnemyDeath() {
	
	if (spawnMode==SpawnType.Wave)
		enemyDeathCount++;
		
	if (spawnMode==SpawnType.CTF)
		CTFSpawn();

}

// Enemy counter for Payload mode
function EnemyCounter(increase : float) {

	if(spawnMode == SpawnType.Normal) {
		if (increase) {
			currentEnemyCount++;
		} else {
			currentEnemyCount--;
		}
	}

}

function DestroyEnemy(enemy : GameObject) {

	if(spawnMode == SpawnType.Wave || spawnMode == SpawnType.CTF)
		return;

	currentEnemyCount--;
	DestroyObject(enemy);
}

function DecideEnemy () {
	if (Random.Range (0, 2) == 0) {
		return enemyMelee;
	} else {
		return enemyShoot;
	}
}

function DecideEnemyCTF () {
	if (Random.Range (0, 2) == 0) {
		return enemyMelee;
	} else {
		return enemyShootCTF;
	}
}