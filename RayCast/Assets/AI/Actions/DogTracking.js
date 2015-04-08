import RAIN.Action;
import RAIN.Core;

@RAINAction
class DogTracking extends RAIN.Action.RAINAction
{
    function Start(ai:RAIN.Core.AI):void
	{
        super.Start(ai);
	}

    function Execute(ai:RAIN.Core.AI):ActionResult
	{
		var ob : GameObject = ai.WorkingMemory.GetItem("target");
		
		var loc : Vector3 = ob.transform.position;
		Debug.Log(loc);
		
		
		ai.Motor.AllowOffGraphMovement = true;
		
		ai.WorkingMemory.SetItem.<Vector3> ("varMoveTo", loc);
        return ActionResult.SUCCESS;
	}

	function Stop(ai:RAIN.Core.AI):void
	{
        super.Stop(ai);
	}
}