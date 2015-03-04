#pragma strict
var Effect : Transform;

function Update () {
	var hit : RaycastHit;
	var hitTarget: RaycastHit;
	var ray : Ray = Camera.main.ScreenPointToRay(Vector3(Screen.width * 0.5, Screen.height * 0.5, 0));
	Debug.DrawRay (ray.origin, ray.direction * 10, Color.cyan);
	
	if (Input.GetMouseButtonDown(0)){
	 	if (Physics.Raycast (ray, hit)){
	 		var hitposition = hit.point;
	 		
	 		transform.LookAt(hitposition);
	 		Debug.DrawRay (transform.position, transform.forward * 10, Color.red);
	 		if(Physics.Raycast(transform.position, transform.forward, hitTarget)){
	 		hitTarget.transform.SendMessage("ApplyDamage", 100, SendMessageOptions.DontRequireReceiver);
	 		}
		}
	}
}