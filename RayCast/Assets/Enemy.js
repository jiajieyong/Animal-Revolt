#pragma strict

var health = 100;

function Update () {
}


function ApplyDamage(damage: int){
    health -= damage;
    Debug.Log(health);
}