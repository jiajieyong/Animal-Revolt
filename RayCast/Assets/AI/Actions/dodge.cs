using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using RAIN.Action;
using RAIN.Core;
using RAIN.Navigation;
using RAIN.Navigation.Graph;

[RAINAction]
public class dodge : RAINAction
{
	public dodge()
	{
		actionName = "dodge";
	}

	public override void Start(RAIN.Core.AI ai)
    {
        base.Start(ai);
    }

    public override ActionResult Execute(RAIN.Core.AI ai)
    {
		Vector3 loc = Vector3.zero;
		List<RAINNavigationGraph> found = new List<RAINNavigationGraph> ();
		
		do {
			loc = new Vector3 (ai.Kinematic.Position.x + Random.Range (-2f, 2f),
			                   ai.Kinematic.Position.y,
			                   ai.Kinematic.Position.z + Random.Range (-2f, 2f));
			found = NavigationManager.Instance.GraphsForPoints (ai.Kinematic.Position,
			                                                    loc, 
			                                                    ai.Motor.StepUpHeight, 
			                                                    NavigationManager.GraphType.Navmesh, 
			                                                    ((BasicNavigator)ai.Navigator).GraphTags);
		} while ((Vector3.Distance(ai.Kinematic.Position,loc) <0.5f) || (found.Count == 0));
		
		ai.WorkingMemory.SetItem<Vector3> ("dodgeTo", loc);

        return ActionResult.SUCCESS;
    }

    public override void Stop(RAIN.Core.AI ai)
    {
        base.Stop(ai);
    }
}