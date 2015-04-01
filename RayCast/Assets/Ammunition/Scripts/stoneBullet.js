#pragma strict
 
var TheDamage = 100;
var direction : Vector3;
var damageDisplay : GameObject;

function Start () {
	rigidbody.AddTorque(Vector3(10.0, 0, 10.0));
	damageDisplay = GameObject.FindGameObjectsWithTag ("Display")[0];
}
 
 function OnCollisionEnter (info : Collision)
 {	
 	if (info.gameObject.tag == "Player" && this.gameObject.tag == "EnemyBullet") {
 		//damageDisplay.transform.SendMessage("DisplayDamage", TheDamage, "instant");
    	info.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
    	Destroy(this.gameObject);
    }
   else if (info.gameObject.tag == "Enemy" && this.gameObject.tag == "PlayerBullet") {
   		var container = new Container(TheDamage, info.collider.transform, "instant");
   		damageDisplay.transform.SendMessage("DisplayDamage", container);
    	info.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
    	Destroy(this.gameObject);
    }
 }
 