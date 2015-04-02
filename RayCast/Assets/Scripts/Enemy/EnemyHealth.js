#pragma strict

var startingHealth : int = 100;           
var currentHealth : int;    
var agent : NavMeshAgent;

private var isDead : boolean; 

function Start () {
	agent = GetComponent(NavMeshAgent);
	currentHealth = startingHealth;
}

function Update () {


}

function ApplyDamage(damage: int){

	currentHealth -= damage;
	agent.Stop(true);
 	rigidbody.isKinematic = false;
 	rigidbody.useGravity = true;
	rigidbody.AddForce(new Vector3(0,5,0), ForceMode.Impulse);
	
    if(currentHealth <= 0)
    {
        Death ();
    }

}

function Death () {
	// The enemy is dead.
    isDead = true;
    
    // Find and disable the Nav Mesh Agent.
    GetComponent (NavMeshAgent).enabled = false;

    // Find the rigidbody component and make it kinematic (since we use Translate to sink the enemy).
    GetComponent (Rigidbody).isKinematic = true;


    // After 2 seconds destory the enemy.
    Destroy (gameObject, 3f);

}

function OnGUI() {
	GUI.Label(Rect(700,100,100,100), "health: " + currentHealth);
}