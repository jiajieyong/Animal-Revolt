#pragma strict

private var player : Transform;               // Reference to the player's position.
private var enemyHealth : EnemyHealth;        // Reference to this enemy's health.
private var nav : NavMeshAgent;               // Reference to the nav mesh agent.

var startingHealth : int = 100;           
var currentHealth : int;    
var timeSinceShot :float;

function Awake ()
{
    // Set up the references.
    player = GameObject.FindGameObjectWithTag ("Player").transform;
    enemyHealth = GetComponent (EnemyHealth);
    nav = GetComponent (NavMeshAgent);
    currentHealth = startingHealth;
}


function Update ()
{


	if (timeSinceShot > 0) 
	{
	
	
		timeSinceShot += Time.deltaTime;
		
		if (timeSinceShot > 1) 
		{

			if (rigidbody.velocity.y == 0) 
			{
				nav.Resume();
				Debug.Log("somethng");
 				rigidbody.isKinematic = true;
 				rigidbody.useGravity = false;
 				timeSinceShot = 0;
 			}
		}
	} 
	else 
	{
	
	    // If the enemy and the player have health left...
	    if(currentHealth > 0)
	    {
	        nav.SetDestination (player.position);
	    }
	    else
	    {
	        nav.enabled = false;
	    }
    }
}

function ApplyDamage(damage: int){

	
	nav.Stop(true);
 	rigidbody.isKinematic = false;
 	rigidbody.useGravity = true;
	timeSinceShot = Time.deltaTime;
	
	currentHealth -= damage;
	
    if(currentHealth <= 0)
    {
        Death ();
    }

}

function Death () {
    
    // Find and disable the Nav Mesh Agent.
    GetComponent (NavMeshAgent).enabled = false;

    // Find the rigidbody component and make it kinematic (since we use Translate to sink the enemy).
    GetComponent (Rigidbody).isKinematic = true;


    // After 2 seconds destory the enemy.
    Destroy (gameObject, 0f);

}

function OnGUI() {
	GUI.Label(Rect(700,100,100,100), "health: " + currentHealth);
}