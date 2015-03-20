#pragma strict
var radius = 0.0;
var power = 10.0;
var TheDamage = 10.0;
var lift = 5;
var delay = 2f;
var explosionPrefab : GameObject; 
  
function OnCollisionEnter (info: Collision){
 		 if ((info.transform.tag == "Enemy")){
		  	 explode();
  			 Debug.Log("Got hit leh");
  		}
  		yield WaitForSeconds(delay);
  		explode();
 }
 
 function explode(){
 		 var explosionPos : Vector3 = transform.position;
         var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
		 Instantiate(explosionPrefab, transform.position, transform.rotation);
         for (var hit : Collider in colliders) {
             if (hit.rigidbody) {
<<<<<<< HEAD
             	
                 hit.rigidbody.AddExplosionForce(power, explosionPos, radius, lift);
<<<<<<< HEAD
=======
             	 hit.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
                 hit.rigidbody.AddExplosionForce(power, explosionPos, radius, lift);
                 
>>>>>>> origin/master
=======
                 hit.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
>>>>>>> parent of 9d72593... Some updates done for the demo
                 Destroy(gameObject);
         	}	
         }
 }
