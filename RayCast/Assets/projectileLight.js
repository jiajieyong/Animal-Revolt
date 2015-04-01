#pragma strict
var projectileCrossHair : GameObject; 
var zMovement = 6.5;
var hasCreated = false;
var hasFound = false;
var hasFire = false;
var speed = 0.002;
var maxDistance = 0f;
private var timer = 0.0;
var cooldown = 0.5; 
var angle : float; 


function Start () {

}

function Update () {
	var clone : GameObject;
	
	if (!changeAmmo.cowMode){
		//Destroy (clone.gameObject);
		if (hasCreated) {
			clone = GameObject.Find("LandingZone(Clone)");
			Destroy(clone);
			hasCreated = false;
			zMovement = 8.5;
		}
	}
	else if (changeAmmo.cowMode){
			if (!hasCreated) {
		   	clone = Instantiate(projectileCrossHair, transform.position + transform.forward * 7 + transform.up*2, transform.rotation);
			clone.transform.Rotate(90,0,0);		
			hasCreated = true;
			}
			else {
				clone = GameObject.Find("LandingZone(Clone)");
				clone.transform.parent = gameObject.transform;
				clone.transform.position.y = 2;								
				
				if (Input.GetAxis("Mouse Y") > 0 && zMovement < 12){
					zMovement += 0.5;
					clone.transform.Translate(0, Time.deltaTime * speed, 0);
				}
				if (Input.GetAxis("Mouse Y") < 0 && zMovement > 5){
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
						
					//transform.Rotate(-angle,0,0);
					timer = Time.time + cooldown;
					hasFire = true;				
				} 
				if (hasFire && timer <= Time.time) {			
					//transform.Rotate(angle,0,0);
					hasFire = false;
				}
				
			}		
	}
}