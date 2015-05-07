#pragma strict

var enemyManager : EnemyManager;
var enemy : GameObject;  
var player : GameObject;
var payload : GameObject;
var survivalPlayerCheck : SurvivalPlayerCheck;
private var calledOnce = false; 
private var spawning = false; 
 
function Start() {

	if(enemyManager.spawnMode == SpawnType.Survival) {
		SurvivalSpawn();
	}
	
}
function Update () {


	if(enemyManager.spawnMode != SpawnType.Normal) 
		return;
	
	var dis = Vector3.Distance(gameObject.transform.position, player.transform.position);
	
	if (dis < 60 && dis > 40) {
	
		enemyManager.SendMessage("AddNormalSP", gameObject);
	
		/**
		StartCoroutine("Spawn");
		calledOnce = true;
		spawning = true;
		**/
	} else if (spawning){
	
		enemyManager.SendMessage("RemoveNormalSP", gameObject);
		
		/**
		StopCoroutine("Spawn");
		calledOnce = false;
		spawning = false;
		**/
	} else {
		return;
	}
	

}

function Spawn ()
{
	if(calledOnce)
		return;
		
	while(true) {
		if(enemyManager.currentEnemyCount < enemyManager.maxEnemyCount) {
			var clone = Instantiate (enemy, transform.position, transform.rotation); 
	    	clone.GetComponent(Enemy).updateEnemy(enemyManager.gameObject, player.gameObject, survivalPlayerCheck);
	    	enemyManager.SendMessage("EnemyCounter", 1);
	    	
	    	var rig : AIRig = clone.GetComponentInChildren(AIRig);	
			rig.AI.WorkingMemory.SetItem("payload", payload);
			rig.AI.WorkingMemory.SetItem("player", player);
			rig.AI.WorkingMemory.SetItem("myself", clone);
	
	    	yield WaitForSeconds(enemyManager.spawnTime);
	    }
	    
	    yield new WaitForEndOfFrame ();
	}  
}

function SurvivalSpawn () {

	    var clone = Instantiate (enemyManager.DecideEnemy(), transform.position, transform.rotation);
	    
	    clone.GetComponent(Enemy).updateEnemy(enemyManager.gameObject, player.gameObject, survivalPlayerCheck);
		
	    var rig : AIRig = clone.GetComponentInChildren(AIRig);	
		rig.AI.WorkingMemory.SetItem("payload", payload);
		rig.AI.WorkingMemory.SetItem("player", player);
		rig.AI.WorkingMemory.SetItem("myself", clone);
	

}