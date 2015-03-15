#pragma strict
 
var TheDamage = 100;
 
 function OnCollisionEnter (info : Collision)
 {	
 	Debug.Log("hit");
    info.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
 }