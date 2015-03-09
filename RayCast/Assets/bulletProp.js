#pragma strict
 
var TheDamage = 100;
 
 function OnCollisionEnter (info : Collision)
 {
     info.transform.SendMessage("ApplyDammage", TheDamage, SendMessageOptions.DontRequireReceiver);
 }