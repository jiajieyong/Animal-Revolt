#pragma strict

var enemyManager : GameObject;
var health = 100;
var speed = 5;
var prefab : Transform;
var isDead = false;
var player : GameObject;
var damageDisplay : GameObject;
private var _isBullet = false;

function Start () {
	damageDisplay = GameObject.FindGameObjectsWithTag ("Display")[0];
}

function Update () {
	if (isDead)
		return;

	if (health <= 0) {
	
		dead();
		
		enemyManager.SendMessage("EnemyDeath");
		var animator = GetComponentInChildren(Animator);
		animator.SetTrigger("Die");
		enemyManager.SendMessage("EnemyCounter", 0);
		DestroyObject(gameObject, 4);
	}
	// Kill off enemy if too far away from Player
	if (Vector3.Distance(transform.position, player.transform.position) > 60) {
		enemyManager.SendMessage("EnemyCounter", 0);
		DestroyObject(gameObject);
	}
}

function dead() {
	isDead = true;
	gameObject.rigidbody.useGravity = false;
	gameObject.rigidbody.isKinematic = true;
	gameObject.collider.enabled = false;
	var ai : Behaviour = gameObject.GetComponentInChildren(AIRig);
	ai.enabled = false;
}

function updateEnemy(em:GameObject, p:GameObject) {
	enemyManager = em;
	player = p;
}

function ApplyDamage(damage: int){
    health -= damage;
}

function stun(duration: float){
	rigidbody.AddForce(new Vector3(0,100,0),ForceMode.Impulse);
	var ai : Behaviour = gameObject.GetComponentInChildren(AIRig);
	ai.enabled = false;
	yield WaitForSeconds(duration);
	if (health > 0)
	ai.enabled = true; 
}

function dotDamage (damage: int){
	var containerE = new Container(damage, transform, "enemy", "dots");		
	for (var count = 0 ; count <5; count++){	
		yield WaitForSeconds(1);
		health -= damage; 
		damageDisplay.transform.SendMessage("DisplayDamage", containerE);
	}
}

function setBulletState(isBullet: boolean){
    _isBullet = isBullet;
}

function getBulletState(){
    return _isBullet;
}

function OnCollisionEnter(collision : Collision) {
	if (collision.gameObject.CompareTag("Enemy")) {
		if (collision.relativeVelocity.magnitude > 5) {
			if (collision.gameObject.GetComponent(Enemy).getBulletState()) {
				ApplyDamage(5);
				_isBullet = false;
				collision.gameObject.GetComponent(Enemy).setBulletState(true);
				var containerE = new Container(5, transform, "enemy", "instant");
   				damageDisplay.transform.SendMessage("DisplayDamage", containerE);
   			}
   		} else {
   			_isBullet = false;
   			collision.gameObject.GetComponent(Enemy).setBulletState(false);
   		}
	}
}