#pragma strict

var enemyManager : EnemyManager;
var enemy : GameObject;  
var player : GameObject;
//private var triggered = false; 
 

function OnTriggerEnter (col : Collider) {
	
	if ((col.tag == "Player") && (enemyManager.spawnMode == SpawnType.Normal)) {
		StartCoroutine("Spawn");
	}
	

}

function OnTriggerExit (col : Collider) {
	
	if ((col.tag == "Player") && (enemyManager.spawnMode == SpawnType.Normal)) {
		StopCoroutine("Spawn");
	}
}

function Spawn ()
{
	while(true) {
		if(enemyManager.currentEnemyCount < enemyManager.maxEnemyCount) {
			var clone = Instantiate (enemy, transform.position, transform.rotation); 
	    	clone.GetComponent(Enemy).updateEnemy(enemyManager.gameObject, player.gameObject);
	    	enemyManager.SendMessage("EnemyCounter", 1);
	    	yield WaitForSeconds(enemyManager.spawnTime);
	    }
	    
	    yield new WaitForEndOfFrame ();
	}
    
    
}