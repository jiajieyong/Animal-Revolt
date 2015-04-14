#pragma strict
 
var TheDamage = 100;
var CatDot = 3;
var stunDuration = 1.5;
var direction : Vector3;
var damageDisplay : GameObject;
var origin : Vector3;

function Start () {
	rigidbody.AddTorque(Vector3(10.0, 0, 10.0));
	damageDisplay = GameObject.FindGameObjectsWithTag ("Display")[0];
}
 
 function OnCollisionEnter (info : Collision)
 {	
 	if ((info.gameObject.tag == "Player" || info.gameObject.tag == "Payload") && this.gameObject.tag == "EnemyBullet") {
 		var containerP = new ImpactContainer(origin);
 		
 		if(info.gameObject.tag == "Player")
 			damageDisplay.transform.SendMessage("DisplayImpact", containerP);
 			
    	info.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
    	Destroy(this.gameObject);
    }
   else if (info.gameObject.tag == "Enemy" && this.gameObject.tag == "PlayerBullet") {
   		var containerE = new Container(TheDamage, info.collider.transform, "enemy", "instant");
   		damageDisplay.transform.SendMessage("DisplayDamage", containerE);
    	info.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
    	
    	if (this.gameObject.name == "Catbullet(Clone)") {
    		info.transform.SendMessage("dotDamage",CatDot, SendMessageOptions.DontRequireReceiver);
    	}
    	else if (this.gameObject.name == "goatBullet(Clone)") {
    		info.transform.SendMessage("stun",stunDuration, SendMessageOptions.DontRequireReceiver);
    	}
    	Destroy(this.gameObject);
    }
 }
 
 function updateOrigin(o : Vector3) {
 	origin = o;
 }
 