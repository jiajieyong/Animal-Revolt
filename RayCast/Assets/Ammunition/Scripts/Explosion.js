#pragma strict
var radius = 0.0;
var power = 10.0;
var TheDamage = 10.0;
var lift = 5;
var delay = 2f;
var explosionPrefab : GameObject;
var damageDisplay : GameObject; 
var origin : Vector3;

function Start () {
	damageDisplay = GameObject.FindGameObjectsWithTag ("Display")[0];
}
  
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
		 
		 var hitABoss = false;
		 
         for (var hit : Collider in colliders) {
             if (hit.rigidbody) {
             	if (!hit.CompareTag("ammo")) {
             		var containerE = new Container(TheDamage, hit.collider.transform, "enemy", "instant");
             	 	damageDisplay.transform.SendMessage("DisplayDamage", containerE);
             	 	hit.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
                 	hit.rigidbody.AddExplosionForce(power, explosionPos, radius, lift);
                 }
         	} else if (hit.CompareTag("Enemy")) {
         		var possibleBoss : Transform = hit.gameObject.transform;
				var recurse : Transform = hit.gameObject.transform;
					
				while (recurse != null) {
					possibleBoss = recurse;
					recurse = possibleBoss.parent;
				}
					
				if (possibleBoss.name == "Bossman" && !hitABoss) {
					var containerEE = new Container(TheDamage, hit.collider.transform, "enemy", "instant");
             	 	damageDisplay.transform.SendMessage("DisplayDamage", containerEE);
             	 	hit.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
					hitABoss = true;
				}
         	}	
         }
         
         Destroy(gameObject);
 }

 function updateOrigin(o : Vector3) {
 	origin = o;
 }