#pragma strict

var enemyManager : EnemyManager;
var enemy : GameObject;    

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
		var clone = Instantiate (enemy, transform.position, transform.rotation); 
    	clone.GetComponent(Enemy).updateEM(enemyManager.gameObject);
    	yield WaitForSeconds(enemyManager.spawnTime);
    	yield new WaitForEndOfFrame ();
	}
    
    
}