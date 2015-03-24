#pragma strict

var health = 100;
var agent : NavMeshAgent;
var speed = 0.4;
var targetPos : Vector3;
var isGrounded = false;
var timeSinceShot :float;

function Start() {
	agent = GetComponent(NavMeshAgent);
	agent.speed = this.speed;
	
	targetPos = Vector3(-4, gameObject.transform.position.y, gameObject.transform.position.z);
	agent.SetDestination(targetPos);
}

function Update () {
	
	if (timeSinceShot > 0) {
		timeSinceShot += Time.deltaTime;
		
		if (timeSinceShot > 1) {
			if (rigidbody.velocity.y == 0) {
				agent.Resume();
 				rigidbody.isKinematic = true;
 				rigidbody.useGravity = false;
 				timeSinceShot = 0;
 			}
		}
	}
	//movement script
	if (gameObject.transform.position.x <= -4) {
		targetPos = Vector3(4, gameObject.transform.position.y, gameObject.transform.position.z);
		agent.SetDestination(targetPos);
	} else if (gameObject.transform.position.x >= 4) {
		targetPos = Vector3(-4, gameObject.transform.position.y, gameObject.transform.position.z);
		agent.SetDestination(targetPos);
	}
}


function ApplyDamage(damage: int){
	//agent.Stop(true);
 	//rigidbody.isKinematic = false;
 	//rigidbody.useGravity = true;
	//rigidbody.AddForce(new Vector3(0,5,0),ForceMode.Impulse);
    health -= damage;
    timeSinceShot = Time.deltaTime;
}

function OnGUI() {
	GUI.Label(Rect(700,100,100,100), "health: " + health);
}

