import RAIN.Action;
import RAIN.Core;

@RAINAction
class AiFiring extends RAIN.Action.RAINAction
{
    var aiShot : enemyFire;
    function Start(ai:RAIN.Core.AI):void
	{
        super.Start(ai);
	}

    function Execute(ai:RAIN.Core.AI):ActionResult
	{	
        ai.Body.BroadcastMessage ("AIShoot");
        return ActionResult.SUCCESS;
	}

	function Stop(ai:RAIN.Core.AI):void
	{
        super.Stop(ai);
	}
}