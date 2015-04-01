#pragma strict

var EnemyManager : EnemyManager;
var health = 100;
var speed = 5;
var prefab : Transform;


function Update () {
	if (health <= 0) {
		var animator = GetComponentInChildren(Animator);
		animator.SetTrigger("Die");
		EnemyManager.enemyDeathCount++;
		DestroyObject(gameObject, 3);
	}
}


function ApplyDamage(damage: int){
	//var step = speed * Time.deltaTime;
	  
	//var newDir = Vector3.RotateTowards(transform.forward, direction, step, 0.0);
    //transform.rotation = Quaternion.LookRotation(newDir);
    health -= damage;
    Debug.Log(health);
}