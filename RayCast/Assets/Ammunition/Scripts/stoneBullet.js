#pragma strict
 
var TheDamage = 100;
var direction : Vector3;

function Start () {
	rigidbody.AddTorque(Vector3(10.0, 0, 10.0));
}
 
 function OnCollisionEnter (info : Collision)
 {	
 	if (info.gameObject.tag == "Player" && this.gameObject.tag == "EnemyBullet") {
    	info.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
    	Destroy(this.gameObject);
    }
   else if (info.gameObject.tag == "Enemy" && this.gameObject.tag == "PlayerBullet") {
    	info.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
    	Destroy(this.gameObject);
    }
 }