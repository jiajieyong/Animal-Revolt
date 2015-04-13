import RAIN.Action;
import RAIN.Core;

@RAINAction
class attackanimation extends RAIN.Action.RAINAction
{
    function Start(ai:RAIN.Core.AI):void
	{
        super.Start(ai);
	}

    function Execute(ai:RAIN.Core.AI):ActionResult
	{
		ai.Body.BroadcastMessage("attackDamage");
        return ActionResult.SUCCESS;
	}

	function Stop(ai:RAIN.Core.AI):void
	{
        super.Stop(ai);
	}
}