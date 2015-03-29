#pragma strict
var animator : Animator;
var characterMotor : CharacterMotor;
var originaly = 0;

function Start () {
	animator = GetComponentInChildren(Animator);
}

function Update () {
	var velocity = rigidbody.velocity.normalized;
 	var localVel = transform.InverseTransformDirection(velocity);
 	var AIgrounded;

	if (localVel.y > 0.2)
		AIgrounded = false;
	else 
		AIgrounded = true;
	
	var turnAngle = rigidbody.rotation.y - originaly;
	turnAngle = turnAngle/45; // normalize
	
	animator.SetBool ("Grounded", AIgrounded);
	animator.SetFloat ("Forward", localVel.z);
	animator.SetFloat ("Side", Mathf.Max(turnAngle, localVel.x));
}