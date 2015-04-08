#pragma strict
var animator : Animator;
var characterMotor : CharacterMotor;

function Start () {
	animator = GetComponentInChildren(Animator);
	characterMotor = GetComponent(CharacterMotor);
}

function Update () {
	if (animator != null) {
		animator.SetBool ("Grounded", characterMotor.grounded);
		animator.SetFloat ("Forward", Input.GetAxis ("Vertical"));
		animator.SetFloat ("Side", Input.GetAxis ("Horizontal"));
	}
}