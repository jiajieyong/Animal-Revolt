#pragma strict

 var theBullet : Rigidbody;
 var Speed = 20;
 
 var radius = 0;
 var power = 10;
 
 var Reloading : boolean;
 var shootSpeed = 0.1;
 var enoughAmmo : boolean;
 var gun : Transform;
     
 function Start () {
   	enoughAmmo = true;
    var explosionPos : Vector3 = transform.position;
    var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
         
    for (var hit : Collider in colliders) {
 		if (hit && hit.rigidbody)
    		hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 3.0);
        }
     }
 
 function Update () {
     if (Input.GetMouseButtonDown(0))
     {
         
         var clone = Instantiate(theBullet, transform.position, transform.rotation);
         clone.velocity = transform.TransformDirection(Vector3(0, 0, Speed));

         Destroy (clone.gameObject, 2);
     
     }
 }
 