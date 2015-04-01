#pragma strict

var playerHealth : playerHealth;       // Reference to the player's heatlh.
var enemy : GameObject;                // The enemy prefab to be spawned.
var spawnTime : float = 3f;            // How long between each spawn.
var spawnPoints : Transform[];         // An array of the spawn points this enemy can spawn from.

var spawnMode : SpawnType;
var totalWaves : float = 3f;
var numWaves : float = 0f;
public static var enemyDeathCount : float = 0f;
var spawn = true;


function Start ()
{
	var enemyNum : float;
	StartCoroutine("StartSpawn");
	
	
}

function StartSpawn() {


		
	while (spawn) {
		switch(spawnMode) {
			case SpawnType.Normal: 
				InvokeRepeating ("Spawn", spawnTime, spawnTime);
			
			case SpawnType.Wave:
				if (numWaves <= totalWaves) {
					yield WaitForSeconds(spawnTime);
					Spawn();
				}
			
			
			default:
            	spawn = false;
                break;
		}
			
	}
	

}


function Spawn ()
{
    // If the player has no health left...
    if(playerHealth.playerHealth <= 0f)
    {
        // ... exit the function.
        return;
    }

    // Find a random index between zero and one less than the number of spawn points.
    var spawnPointIndex : int = Random.Range (0, spawnPoints.Length);
    // Create an instance of the enemy prefab at the randomly selected spawn point's position and rotation.
    Instantiate (enemy, spawnPoints[spawnPointIndex].position, spawnPoints[spawnPointIndex].rotation);
}