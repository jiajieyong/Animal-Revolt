#pragma strict
var speed = 10;
var removeHorse = 2;
var TheDamage = 10;
var damageDisplay : GameObject;
private var distToGround: float;

function Start() {
	damageDisplay = GameObject.FindGameObjectsWithTag ("Display")[0];
	distToGround = collider.bounds.extents.y;
}

function Update() {
	if (IsGrounded()) {
		var forward = transform.forward;
		var newForward = Vector3(forward.x, 0, forward.z);
		transform.forward = newForward;
		rigidbody.velocity = transform.forward * 20;
	}
}

 function OnCollisionEnter (info : Collision)
 {	
 	if (info.transform.CompareTag("Enemy")){
 		info.gameObject.GetComponent(Enemy).setBulletState(true);
 		var containerE = new Container(TheDamage, info.collider.transform, "enemy", "instant");
   		damageDisplay.transform.SendMessage("DisplayDamage", containerE);
 		var force : Vector3 = transform.forward * 80000;
		info.rigidbody.AddForce(force);
		Destroy(gameObject);
	}
 }
 
  function IsGrounded(): boolean {
   return Physics.Raycast(transform.position, -Vector3.up, distToGround + 0.1);
 }