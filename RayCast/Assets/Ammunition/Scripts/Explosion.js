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
             	 hit.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
                 hit.rigidbody.AddExplosionForce(power, explosionPos, radius, lift);
                 
                 Destroy(gameObject);
         	}	
         }
 }
