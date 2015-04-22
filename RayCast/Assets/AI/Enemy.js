#pragma strict

var enemyManager : GameObject;
var health = 100;
var speed = 5;
var prefab : Transform;
var isDead = false;
var player : GameObject;
var damageDisplay : GameObject;
private var _isBullet = false;
var stunIcon : Texture2D;
var dotsIcon : Texture2D;
var confusedIcon : Texture2D;

private var isDots = false;
private var isStun = false;
private var isConfused = false;

function Start () {
	damageDisplay = GameObject.FindGameObjectsWithTag ("Display")[0];
}

function Update () {
	if (transform.position.y >-5) {
		transform.position.y = -5;
	}

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
	
	// Kill off enemy if too far away from Player only for Payload Mode
	if (Vector3.Distance(transform.position, player.transform.position) > 60) {
		//enemyManager.SendMessage("EnemyCounter", 0);
		enemyManager.SendMessage("DestroyEnemy", gameObject);
		//DestroyObject(gameObject);
	}
	
	if (isConfused) {
		transform.Rotate(Vector3.up, 500 * Time.deltaTime);
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
	isStun = true;
	rigidbody.AddForce(new Vector3(0,100,0),ForceMode.Impulse);
	var ai : Behaviour = gameObject.GetComponentInChildren(AIRig);
	ai.enabled = false;
	yield WaitForSeconds(duration);
	if (health > 0) {
		ai.enabled = true;
		isStun = false; 
	}
}

function dotDamage (damage: int){
	isDots = true;
	var containerE = new Container(damage, transform, "enemy", "dots");		
	for (var count = 0 ; count <7; count++){	
		yield WaitForSeconds(0.5f);
		health -= damage; 
		damageDisplay.transform.SendMessage("DisplayDamage", containerE);
		
		if (count == 4) {
			isDots = false;
		}
	}
}

function confused (arc: int){
		var ai : Behaviour = gameObject.GetComponentInChildren(AIRig);
		ai.enabled = false;
		
		isConfused = true;
	for (var count = 0; count <= arc; count++) { 
		BroadcastMessage("AIShoot", 3, SendMessageOptions.DontRequireReceiver);
		yield WaitForSeconds(0.3);
	}
		isConfused = false;
		if (health > 0)
		ai.enabled = true; 
	
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

function OnGUI() {
	var size = transform.collider.bounds.size;
	var offset = Vector3(0, size.y + 0.5, 0);
	var currentCam = damageDisplay.GetComponent(DDisplay).chooseCamera();
	var screenPos = currentCam.WorldToScreenPoint(transform.position + offset);
	
	if (isDots) {
		GUI.DrawTexture(Rect(screenPos.x, Screen.height - screenPos.y, 40, 40), dotsIcon);
	} else if (isStun) {
		GUI.DrawTexture(Rect(screenPos.x, Screen.height - screenPos.y, 40, 40), stunIcon);
	} else if (isConfused) {
		GUI.DrawTexture(Rect(screenPos.x, Screen.height - screenPos.y, 40, 40), confusedIcon);
	}
}