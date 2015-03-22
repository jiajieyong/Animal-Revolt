import RAIN.Action;
import RAIN.Core;

@RAINAction
class AiFiring extends RAIN.Action.RAINAction
{
    var aiShot : enemyFire;
    function Start(ai:RAIN.Core.AI):void
	{
        super.Start(ai);
      	 aiShot = ai.Body.GetComponent("enemyFire");
	}

    function Execute(ai:RAIN.Core.AI):ActionResult
	{	
		//Debug.Log("Close Enough Man");
        aiShot = ai.Body.GetComponent("enemyFire");
        aiShot.Shoot();
        return ActionResult.SUCCESS;
	}

	function Stop(ai:RAIN.Core.AI):void
	{
        super.Stop(ai);
	}
}