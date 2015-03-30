 #pragma strict
 
 var radius = 0.051;
 
     function Update () {
       if (!collider.enabled && !Physics.CheckSphere(transform.position, radius)) {
         collider.enabled = true;
         }
     }