
#pragma strict

var target : Transform;
var agent : NavMeshAgent;
var speed = 0.5;
var maxSpeed = 3;

function Start () {
	agent = GetComponent(NavMeshAgent);
	agent.speed = this.speed;
	
	var targetPos = target.transform.position;
	agent.SetDestination(targetPos);
}

function Update () {
	if (agent.speed < 3) {
		speed = Mathf.Pow(speed, 1.3);
		agent.speed += speed;
	}
	var targetPos = target.transform.position;
	Debug.Log(target.name);
	agent.SetDestination(targetPos);
}

function OnCollisionEnter (info : Collision)
 {	
     info.transform.SendMessage("ApplyDamage", 10, SendMessageOptions.DontRequireReceiver);
     Destroy(gameObject);
 }

 function updateTarget(target : Transform) {
 	this.target = target;
 }