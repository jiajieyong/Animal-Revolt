#pragma strict
private var animator : Animator;
private var originalPos : Vector2;
private var originalMag : float;

function Start () {
	animator = GetComponentInChildren(Animator);
	originalPos = Vector2(rigidbody.transform.position.x, rigidbody.transform.position.z) ;
	originalMag = 0;
}

function Update () {
	var pos = Vector2(rigidbody.transform.position.x, rigidbody.transform.position.z) ;

 	var movement = (pos - originalPos) * 10;
 	var magnitude = movement.magnitude;
 	
 	if (originalMag >= magnitude){
 		originalMag -= 0.2;
 		originalMag = Mathf.Max(0.1,originalMag);
 	}else if (originalMag < magnitude){
		originalMag += 0.2;
		originalMag = Mathf.Min(2,originalMag);
	}
 	
	animator.SetFloat ("Forward", originalMag);
	originalPos = pos;
	
	if (Physics.Raycast(transform.position, -Vector3.up, 0.3)) {
		animator.SetBool ("Grounded", true);
	} else {
		animator.SetBool ("Grounded", false);
	}
	
}