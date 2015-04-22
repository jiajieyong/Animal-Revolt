#pragma strict
var target = 0;
var Speed = 20;
var theBullet : Rigidbody;


function Start () {
}

function Update () {
		var destination : GameObject; 
		
		if (target == 1) {
			destination = GameObject.Find("First Person Controller"); 
		} else if (target == 2){
			destination = GameObject.Find("Payload"); 
		}
		
		
		if ((target == 1 || target == 2) && destination != null) 
		{
		var targetDir = destination.transform.position - transform.position;
		
	    // The step size is equal to speed times frame time.
	    var step = 100 * Time.deltaTime;
	    
	    var newDir = Vector3.RotateTowards(transform.forward, targetDir, step, 0.0);
	    Debug.DrawRay(transform.position, newDir, Color.red);
	    // Move our position a step closer to the target.
	    transform.rotation = Quaternion.LookRotation(newDir);
	    }
	    else 
	    transform.rotation = Quaternion.Euler(Vector3(0,0,0));
}

function AIShoot(targetType: int) {

		target = targetType;
			
		var newBlast = Instantiate(theBullet, transform.position, transform.rotation);
	
		newBlast.GetComponent(stoneBullet).updateOrigin(transform.position);
		
		newBlast.velocity = transform.TransformDirection(Vector3(0, 0, Speed));
		
		Destroy(newBlast.gameObject, 2f);
}