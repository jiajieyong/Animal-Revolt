#pragma strict
var destination : GameObject;
var base : Transform;
var speed = 20; 
function Start () {

}

function Update () {
		
		if (destination != null) { 
		var targetDir = destination.transform.position - transform.position;
		
	    // The step size is equal to speed times frame time.
	    var step = speed * Time.deltaTime;
	    
	    var newDir = Vector3.RotateTowards(transform.forward, targetDir, step, 0.0);
	    Debug.DrawRay(transform.position, newDir, Color.red);
	    // Move our position a step closer to the target.
	    transform.rotation = Quaternion.LookRotation(newDir);
	    }
	    else {
	    targetDir = base.transform.position - transform.position;
		
	    // The step size is equal to speed times frame time.
	    step = speed * Time.deltaTime;
	    
	    newDir = Vector3.RotateTowards(transform.forward, targetDir, step, 0.0);
	    Debug.DrawRay(transform.position, newDir, Color.red);
	    // Move our position a step closer to the target.
	    transform.rotation = Quaternion.LookRotation(newDir);
	    }
}