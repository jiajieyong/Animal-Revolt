#pragma strict

var playerObject : GameObject;
 var canClimb = false;
 var speed : float = 5;
 
 function Start () {
     playerObject = gameObject.Find("Player");
 }
 
 function OnTriggerEnter (coll : Collider){
     if(coll.gameObject.name == "Player"){
         canClimb = true;
         var motor = playerObject.GetComponent(CharacterMotor);
         motor.movement.gravity = 0;
     }
 }
 
 function OnTriggerExit (coll2 : Collider){
     if(coll2.gameObject.name == "Player"){
         canClimb = false;
         var motor = playerObject.GetComponent(CharacterMotor);
         motor.movement.gravity = 20;
     }
 }
 function Update () {
     if(canClimb){
     	var motor = playerObject.GetComponent(CharacterMotor);
 		motor.SetVelocity(Vector3(0,0,0) * Time.deltaTime*speed);
         if(Input.GetKey(KeyCode.W)){
         	motor = playerObject.GetComponent(CharacterMotor);
    		motor.SetVelocity(Vector3(0,30,0) * Time.deltaTime*speed);
         }
         if(Input.GetKey(KeyCode.S)){
         	motor = playerObject.GetComponent(CharacterMotor);
            motor.SetVelocity(Vector3(0,-30,0) * Time.deltaTime*speed);
         }
     }
 }