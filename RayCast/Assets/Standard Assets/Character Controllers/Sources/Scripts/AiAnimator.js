#pragma strict
var animator : Animator;
var characterMotor : CharacterMotor;
var AIGrounded = false;

function Start () {
	animator = GetComponentInChildren(Animator);
	characterMotor = GetComponent(CharacterMotor);
}

function Update () {
	
	if (rigidbody.velocity.y != 0)
		AIGrounded = true;
	else 
		AIGrounded = false;
	
	animator.SetBool ("Grounded", AIGrounded);
	animator.SetFloat ("Forward", Input.GetAxis ("Vertical"));
	animator.SetFloat ("Side", Input.GetAxis ("Horizontal"));
}