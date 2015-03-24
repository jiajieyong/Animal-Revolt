#pragma strict

var health = 100;
var speed = 5;

function Update () {
	if (health <= 0)
		DestroyObject(gameObject);
}


function ApplyDamage(damage: int){
	//var step = speed * Time.deltaTime;
	  
	//var newDir = Vector3.RotateTowards(transform.forward, direction, step, 0.0);
    //transform.rotation = Quaternion.LookRotation(newDir);
    health -= damage;
    Debug.Log(health);
}