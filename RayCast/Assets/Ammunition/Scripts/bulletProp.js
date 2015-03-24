#pragma strict
 
var TheDamage = 100;
var direction : Vector3;
 
 function OnCollisionEnter (info : Collision)
 {	
 	direction = transform.position - info.transform.position;
    info.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
 }