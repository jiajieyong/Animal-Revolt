#pragma strict
var Effect : Transform;
var projectileCrossHair : GameObject; 
var zMovement = 4.5;
var hasCreated = false;
var hasFound = false;
var speed = 0.002;

function Update () {

	var hit : RaycastHit;
	var hitTarget: RaycastHit;
	var clone : GameObject;
	var ray : Ray = Camera.main.ScreenPointToRay(Vector3(Screen.width * 0.5, Screen.height * 0.5, 0));
	Debug.DrawRay (ray.origin, ray.direction * 10, Color.cyan);
	
	if (!changeAmmo.cowMode){
		//Destroy (clone.gameObject);
		if (hasCreated) {
			clone = GameObject.Find("LandingZone(Clone)");
			Destroy(clone);
			hasCreated = false;
		}
		
		if (Input.GetMouseButtonDown(0)){
	 	if (Physics.Raycast (ray, hit)){
	 		var hitposition = hit.point;
	 		
	 		if (hit.collider != null) {
	 			var dog = gameObject.transform.FindChild("dogs");
	 			dog.gameObject.GetComponent(prefabDog).updateTarget(hit.transform);
	 		}
	 		
	 		transform.LookAt(hitposition);
	 
	 			Debug.DrawRay (transform.position, transform.forward * 10, Color.red);
		}
		}
	}
	else if (changeAmmo.cowMode){
			if (!hasCreated) {
		   	clone = Instantiate(projectileCrossHair, transform.position + transform.forward * 3.5 + transform.up*2, transform.rotation);
			clone.transform.Rotate(90,0,0);		
			hasCreated = true;
			}
			else {
				clone = GameObject.Find("LandingZone(Clone)");
				clone.transform.parent = gameObject.transform;
				clone.transform.position.y = 2;
				
				if (Input.GetAxis("Mouse Y") > 0 && zMovement < 7){
					zMovement += 0.5;
					clone.transform.Translate(0, Time.deltaTime * speed, 0);
				}
				if (Input.GetAxis("Mouse Y") < 0 && zMovement > 2){
					zMovement -= 0.5;
					clone.transform.Translate(0, -Time.deltaTime * speed, 0);
				}
			
			}		
	}
}