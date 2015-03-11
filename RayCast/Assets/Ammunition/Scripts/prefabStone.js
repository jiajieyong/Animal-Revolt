#pragma strict

var theBullet : Rigidbody;
 var Speed = 20;
 
 var radius = 0;
     var power = 10;
     
     var ammo : int;
     var maxAmmo : int;
     var Reloading : boolean;
     private var timer = 0.0;
     var shootSpeed = 0.1;
     var enoughAmmo : boolean;
     var gun : Transform;
     
     function Start () {
     ammo = 12;
     maxAmmo = 60;
     enoughAmmo = true;
         var explosionPos : Vector3 = transform.position;
         var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
         
         for (var hit : Collider in colliders) {
             if (hit && hit.rigidbody)
                 hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 3.0);
         }
     }
 
 function Update () {
     if (Input.GetMouseButtonDown(0) && enoughAmmo == true)
     {
         
         var clone = Instantiate(theBullet, transform.position, transform.rotation);
         clone.velocity = transform.TransformDirection(Vector3(0, 0, Speed));
         ammo -= 1;
         if(ammo <= 0)
         {
             AutoReload();
         }
         Destroy (clone.gameObject, 2);
         
     
     }
     if(Input.GetMouseButtonDown(1) && ammo != 12)
         {
 
         gun.animation.Play("reload");
         
             ammo = 12;
         Reloading = true;
         }
         if(Input.GetMouseButtonUp(1))
         {
         Reloading = false;
         }
      
     if(ammo <= 0 && maxAmmo <= 0){
     enoughAmmo = false;
     }
 }
 function OnGUI()
 {
 GUI.Label(Rect(100,100,100,100), "stoneAmmo: " + ammo);
 GUI.Label(Rect(100,200,100,100), "Max stoneAmmo: " + maxAmmo);
 }
 
 
 function AutoReload(){
 if(maxAmmo - (12 - ammo) >= 0){ ammo=12; maxAmmo-=ammo; }
 else{ ammo = maxAmmo; maxAmmo = 0; }
 }