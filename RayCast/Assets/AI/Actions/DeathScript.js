import RAIN.Action;
import RAIN.Core;


@RAINDecision
class DeathScript extends RAIN.Action.RAINDecision
{
    private var _lastRunning:int = 0;

    function Start(ai:RAIN.Core.AI):void
	{
	    super.Start(ai);

        _lastRunning = 0;
    }

    function Execute(ai:RAIN.Core.AI):ActionResult
    {
        var tResult:ActionResult = ActionResult.SUCCESS;
				  
        var death = ai.Body.GetComponent("Enemy");
		if (death.health <= 0){
		ai.WorkingMemory.SetItem<bool> ("Dead", true);
		Debug.Log("this is dying now");
		}
		
        return tResult;
    }

    function Stop(ai:RAIN.Core.AI):void
    {
        super.Stop(ai);
    }
}