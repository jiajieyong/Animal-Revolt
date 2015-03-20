#pragma strict
var speed = 10;
var removeHorse = 2;
var TheDamage = 10;

 function OnCollisionEnter (info : Collision)
 {	
 	if ((info.transform.tag == "Enemy")){
 		//var xDistance = info.transform.position.x - transform.position.x;
 		//var zDistance = info.transform.position.z - transform.position.z;
 		//Debug.Log(zDistance);
 		//var yRotation = info.transform.eulerAngles.y;
 		//var zRotation = info.transform.eulerAngles.z;
 		
 		//var direction = Quaternion.identity;
 		//direction.eulerAngles = Vector3(0,yRotation, zRotation);
<<<<<<< HEAD
 		//var direction = new Vector3 ( xDistance, 0, zDistance);
=======
 		var direction = new Vector3 ( xDistance, 0, zDistance);
>>>>>>> origin/master
 		info.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
		info.rigidbody.AddForce(transform.forward * speed);
		yield WaitForSeconds(removeHorse);
		Destroy(gameObject);
	}
 }