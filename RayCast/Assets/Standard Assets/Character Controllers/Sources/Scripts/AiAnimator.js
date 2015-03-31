#pragma strict
var animator : Animator;
var characterMotor : CharacterMotor;
var originaly = 0;

function Start () {
	animator = GetComponentInChildren(Animator);
}

function Update () {
	var velocity = rigidbody.velocity;
 	var localVel = transform.InverseTransformDirection(velocity).normalized;
 	var AIgrounded = true;
 	var side = 0;
 	
	/*
	if (localVel.y > 0.2)
		AIgrounded = false;
	else 
		AIgrounded = true;
	
	var turnAngle = rigidbody.rotation.y - originaly;
	turnAngle = turnAngle/90; // normalize
	
	if (Mathf.Abs(turnAngle*100) > Mathf.Abs(localVel.x))
		side = turnAngle*100;
	else
		side = localVel.x;
	*/
	
	if (localVel.x != 0 || localVel.z != 0){
		animator.SetFloat ("Forward", 1);
		}
	//Debug.Log(localVel);
	
	animator.SetBool ("Grounded", AIgrounded);
	
	//animator.SetFloat ("Side", side);
}