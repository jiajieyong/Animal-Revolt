#pragma strict
private var animator : Animator;
var timer = 0.0;
var cooldown = 2.0f;

function Start () {
	animator = GetComponentInChildren(Animator);
}

function Update () {

}

function attackDamage () {
	
	//yield WaitForSeconds(1);
	var hit : RaycastHit;
	var rayOrigin = new Vector3(transform.position.x, transform.position.y + 1.1f, transform.position.z);
	//Debug.DrawRay (rayOrigin, transform.TransformDirection(Vector3.forward), Color.cyan);
	//Debug.DrawRay (transform.position,  transform.TransformDirection(Vector3.forward), Color.yellow);
	if (Physics.Raycast (rayOrigin, transform.TransformDirection(Vector3.forward), hit, 3) && timer <= Time.time) {		
		animator.SetTrigger("Melee");
		yield WaitForSeconds(0.5f);
		Debug.Log(hit.collider.tag);
		hit.transform.SendMessage("ApplyDamage", 5, SendMessageOptions.DontRequireReceiver);
	}
}