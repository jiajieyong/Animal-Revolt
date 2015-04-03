#pragma strict

var enemyManager : EnemyManager;
var enemy : GameObject;  
var player : GameObject;
//private var triggered = false; 
 

function OnTriggerEnter (col : Collider) {
	
//	if(triggered)
//		return;
		
//	triggered = true;
	
	if ((col.tag == "Player") && (enemyManager.spawnMode == SpawnType.Normal)) {
		StartCoroutine("Spawn");
	}
	

}

function OnTriggerExit (col : Collider) {

//	if(!triggered)
//		return;
		
//	triggered = false;
	
	if ((col.tag == "Player") && (enemyManager.spawnMode == SpawnType.Normal)) {
		StopCoroutine("Spawn");
	}
}

function Spawn ()
{
	while(true) {
		var clone = Instantiate (enemy, transform.position, transform.rotation); 
    	clone.GetComponent(Enemy).updateEnemy(enemyManager.gameObject, player.gameObject);
    	yield WaitForSeconds(enemyManager.spawnTime);
    	yield new WaitForEndOfFrame ();
	}
    
    
}