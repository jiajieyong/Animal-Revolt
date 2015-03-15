#pragma strict
var Effect : Transform;
var projectileCrossHair : GameObject; 
var zMovement = 4.5;
var hasCreated = false;
var hasFound = false;
var hasFire = false;
var speed = 0.002;
var maxDistance = 0f;
private var timer = 0.0;
var cooldown = 0.5; 
var angle : float; 

var tpsCamera: Camera;
var fpsCamera: Camera;

private var tpsON = false;

function Update () {

		
	var hit : RaycastHit;
	var hitTarget: RaycastHit;
	var clone : GameObject;
	var ray : Ray = tpsCamera.ScreenPointToRay(Vector3(Screen.width * 0.5, Screen.height * 0.5, 0));
	var FPSray : Ray = fpsCamera.ScreenPointToRay(Vector3(Screen.width * 0.5, Screen.height * 0.5, 0));
	Debug.DrawRay (ray.origin, ray.direction * 10, Color.cyan);
	Debug.DrawRay (FPSray.origin, FPSray.direction * 10, Color.cyan);
	
	if (Input.GetMouseButtonDown(1)){
		tpsON = !tpsON;
	}
	
	if (!changeAmmo.cowMode){
		//Destroy (clone.gameObject);
		if (hasCreated) {
			clone = GameObject.Find("LandingZone(Clone)");
			Destroy(clone);
			hasCreated = false;
			zMovement = 4.5;
		}
		
		if (Input.GetMouseButtonDown(0)){
			if (Physics.Raycast (FPSray, hit) && !tpsON) {
				var hitpoint = hit.point;
				transform.LookAt(hitpoint);
			}
	 		if (Physics.Raycast (ray, hit) && tpsON){
	 			var hitposition = hit.point;
	 		
	 			transform.LookAt(hitposition);			
			}
			if (hit.collider != null && changeAmmo.dogMode) {
	 				var dog = gameObject.transform.FindChild("Scruffy");
	 				dog.gameObject.GetComponent(prefabDog).updateTarget(hit.transform);
	 		}	
			Debug.DrawRay (transform.position, transform.forward * 10, Color.red);
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
				var heading = clone.transform.position - transform.position;
				heading.y = 0; // this is overground heading
				maxDistance = heading.magnitude;
			
				if (Input.GetMouseButtonDown(0) && (!hasFire) && timer <= Time.time){
					var vComponent = Physics.gravity.magnitude * maxDistance / (6.56 * 6.56);
					if (vComponent <= 1) {
						angle = 0.5 *  Mathf.Asin(Physics.gravity.magnitude * maxDistance / (6.56 * 6.56));
						angle = angle * (180/Mathf.PI);
					}
					else
						angle = 45;
						
					transform.Rotate(-angle,0,0);
					timer = Time.time + cooldown;
					hasFire = true;				
				} 
				if (hasFire && timer <= Time.time) {			
					transform.Rotate(angle,0,0);
					hasFire = false;
				}
				
			}		
	}
}