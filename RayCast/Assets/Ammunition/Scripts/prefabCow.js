#pragma strict

var theBullet : Rigidbody;
var Speed = 20f;
 
 	 var radius = 0;
     var power = 10;
     var ammo : int;
     var maxAmmo : int;
     var Reloading : boolean;
     private var timer = 0.0;
     var cooldown = 0.5;
     var enoughAmmo : boolean;
     var gun : Transform;
     
     
     function Start () {
     ammo = 12;
     maxAmmo = 60;
     enoughAmmo = true;
         var explosionPos : Vector3 = transform.position;
         var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
         
         for (var hit : Collider in colliders) {
             if (hit.rigidbody)
                 hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 3.0);
         }
     }
 
 function Update () {
     if (Input.GetMouseButtonDown(0) && enoughAmmo == true && timer <= Time.time)
     {
         var clone = Instantiate(theBullet, transform.position, transform.rotation);
         clone.velocity = transform.TransformDirection(Vector3(0, 0, Speed));
		 audio.Play();	
         timer = Time.time + cooldown;
         ammo -= 1;
         if(ammo <= 0)
         {
             AutoReload();
         }
         Destroy (clone.gameObject, 2);
         
     
     }
 }
 function OnGUI()
 {
 GUI.Label(Rect(100,100,100,100), "CowAmmo: " + ammo);
 GUI.Label(Rect(100,200,100,100), "Max CowAmmo: " + maxAmmo);
 }
 
 
 function AutoReload(){
 if(maxAmmo - (12 - ammo) >= 0){ ammo=12; maxAmmo-=ammo; }
 else{ ammo = maxAmmo; maxAmmo = 0; }
 }
 