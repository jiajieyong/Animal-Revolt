#pragma strict

var playerHealth : playerHealth;       // Reference to the player's heatlh.
var enemy : GameObject;                // The enemy prefab to be spawned.
var spawnTime : float = 5f;            // How long between each spawn.
var spawnPoints : Transform[];         // An array of the spawn points this enemy can spawn from.
var style : GUIStyle; 
var player: GameObject;
var spawnMode : SpawnType;
var totalWaves : float = 3f;
var spawn = true;
var startOfWave = true;
var currentEnemyCount = 0f;
var maxEnemyCount = 20f;

private var totalEnemies : float = 0f;
private var showLabel = false;
private var numWaves : float = 1f;
private var enemyDeathCount : float = 0f;

function Start ()
{
	var enemyNum : float;
	StartCoroutine("StartSpawn");
	
}

function StartSpawn() {


		
	while (spawn) {
		switch(spawnMode) {
			case SpawnType.Normal: 
			/**
				yield WaitForSeconds(spawnTime);
				Spawn();
				
				if (playerHealth.playerHealth <= 0f) 
					spawn = false;
			**/
					
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
						Spawn();
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
			
			
			default:
            	spawn = false;
                break;
		}
		
		yield new WaitForEndOfFrame ();
			
	}
	

}

function Spawn ()
{
    if(playerHealth.playerHealth <= 0f)
    {
        return;
    }

    var spawnPointIndex : int = Random.Range (0, spawnPoints.Length);
    var clone = Instantiate (enemy, spawnPoints[spawnPointIndex].position, spawnPoints[spawnPointIndex].rotation);
    
    clone.GetComponent(Enemy).updateEnemy(gameObject, player);
    
    totalEnemies++;
}

function ToggleLable() {
	showLabel = !showLabel;
}

function OnGUI () { 

	if (showLabel) {
		GUI.Label(Rect(Screen.width/2 - 50,Screen.height/2 - 25 ,100, 50), "WAVE " + numWaves, style); 
	}

}

// for wave
function EnemyDeath() {
	
	if (spawnMode==SpawnType.Wave)
		enemyDeathCount++;

}

// for normal
function EnemyCounter(increase : float) {

	if(spawnMode == SpawnType.Normal) {
		if (increase) {
			currentEnemyCount++;
		} else {
			currentEnemyCount--;
		}
	}
	


}