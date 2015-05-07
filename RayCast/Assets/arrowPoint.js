#pragma strict
var destination : GameObject;
var wp1 : GameObject;
var goToNext : GameObject;
var base : Transform;
var speed = 20; 
function Start () {
	if (wp1 != null) {
		goToNext = wp1;
	} else {
		goToNext = destination;
	}
}

function Update () {
		
		if (wp1 == null) {
			if (destination != null) {
				goToNext = destination;
			}
		} else {
			if (Vector3.Distance(wp1.transform.position, transform.position) < 5) {
				wp1 = null;
			}
		}
		
		if (goToNext != null) { 
		var targetDir = goToNext.transform.position - transform.position;
		
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