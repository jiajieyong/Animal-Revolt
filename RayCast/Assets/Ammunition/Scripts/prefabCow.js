#pragma strict

var theBullet : Rigidbody;
var Speed = 20f;
 
 	 var radius = 0;
     var power = 10;
     var Reloading : boolean;
     private var timer = 0.0;
     var cooldown = 0.5;
     var enoughAmmo : boolean;
     var gun : Transform;
     
     
     function Start () {
     enoughAmmo = true;
         var explosionPos : Vector3 = transform.position;
         var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
         
         for (var hit : Collider in colliders) {
             if (hit.rigidbody)
                 hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 3.0);
         }
     }
 
 function Update () {
     if (Input.GetMouseButtonDown(0) && timer <= Time.time && GameObject.Find("Canvas").GetComponent(LoadOnClickPause).pauseGame == false)
     {
         var clone = Instantiate(theBullet, transform.position, transform.rotation);
         clone.velocity = transform.TransformDirection(Vector3(0, 0, Speed));
		 audio.Play();	
         timer = Time.time + cooldown;

         Destroy (clone.gameObject, 2);
         
     
     }
 }
 