var camera1;
var camera2;
var camera3;
var scene;
var canvas;
var engine;
var activeCamera;
var boxMaterial=[];
var stairMesh;
var fan1Mesh
var fan2Mesh;
var fan3Mesh;
var OriginalStairMaterial;
var ToStairPos;
var Toggle1=true
var Toggle2=true

class A 
{

blink(){};
stopBlink(){};

}
class B extends A 
{
	constructor(oldMaterial)
	{
       super();
       this.oldMaterial=oldMaterial;
       this.interval=5;

	}

    blink(obj,delay,box,duration)
		{

    		var changeMaterial= function(obj,newMaterial)
				{
					{

						obj.material=newMaterial;

					}

				}

			//var oldMaterial=obj.material;


   		 	var interval=(function()
				{
 
					var Toggle=true
						return setInterval(function()
							{

								if(Toggle)
									changeMaterial(obj,box);
								else
									{
										changeMaterial(obj,OriginalStairMaterial);
									}

								Toggle=!Toggle;
							}

						, delay);

					})();

				setTimeout(function()
						{
							obj.material=oldMaterial;

									clearInterval(interval);
				


						},duration);
	}

	//stopBlink(obj,duration)
	//	{
	   	

	//	}	


}


$(document).ready(function() 
   {

    $("#btn1").click(function()
        {
        	oldMaterial=stairMesh.material;
        	var a = new B(oldMaterial);
        	if(Toggle1)
        	{
    			ToStairPos = new BABYLON.Vector3(-2.65258,2,-0.331641);
       			 UseCamera2();
       			 camera2.target= new BABYLON.Vector3(-4.29174, 1.10086, -0.313598); 
        		 var MyCurve= MyPath(camera1.position,ToStairPos);
        		 MoveCameraThrough(scene, camera2, MyCurve);
     //   stairMesh.material=boxMaterial[0];

     
                 a.blink(stairMesh,100,boxMaterial[0],2000);
       			// blink(stairMesh,100,boxMaterial[0]);
    }
    else 
    {

    	a.stopBlink(stairMesh,500);
    }
    Toggle1=!Toggle1;

         
    }
    );
    

    $("#btn2").click(function()


        {
        	if(Toggle2)
    	{
    	ToFan1 = new BABYLON.Vector3(-5.3,1.3,0.19);
        UseCamera2();
        camera2.target= new BABYLON.Vector3(-4.90454,0.973809,0.19355); 
        var MyCurve= MyPath(camera1.position,ToFan1);
        MoveCameraThrough(scene, camera2, MyCurve);
        blink(fan1Mesh,100,boxMaterial[1]);
    }
    else 
    {
    	    	stopBlink(fan1Mesh,500);


    }
    Toggle2=!Toggle2;

         }); 
    
    $("#btn3").click(function()
       {
    	ToFan2 = new BABYLON.Vector3(-6.3,1.20,-0.8);
        UseCamera2();
        camera2.target= new BABYLON.Vector3(-6.2,0.861,-1.136); 
        var MyCurve= MyPath(camera1.position,ToFan2);
        MoveCameraThrough(scene, camera2, MyCurve);
        fan2Mesh.material=boxMaterial[1];
  
         }); 
   
    $("#btn4").click(function()
       {
    	ToFan3 = new BABYLON.Vector3(6.6,1.5,0.07);
        UseCamera2();
        camera2.target= new BABYLON.Vector3(5.3,1.03,0.08); 
        var MyCurve= MyPath(camera1.position,ToFan3);
        MoveCameraThrough(scene, camera2, MyCurve);
        fan3Mesh.material=boxMaterial[1];
         }); 




     $("#btn0").click(function(){
      // UseCamera1();
     UseCamera1();

    }); 

});

/*
function blink (obj,delay,box)
{
	var changeMaterial= function(obj,newMaterial)
		{
			{

				obj.material=newMaterial;

			}

		}

	oldMaterial=obj.material;


    interval=(function()
	{
 
		var Toggle=true
		return setInterval(function()
		{

			if(Toggle)
			changeMaterial(obj,box);
			else
			{
				changeMaterial(obj,OriginalStairMaterial);
			}

			Toggle=!Toggle;
		}

	, delay);

	})();

}
*/
	
function stopBlink(obj,duration)
{
	   	setTimeout(function()
	{
		obj.material=oldMaterial;
		clearInterval(interval);
	},duration);

}	


//initialiser les caméras
var InitCamera= function(){
 camera1 =  new BABYLON.ArcRotateCamera("Camera",0, 0, 10, new BABYLON.Vector3.Zero(), scene);
 camera2 =  new BABYLON.ArcRotateCamera("Camera",0, 0, 10, new BABYLON.Vector3.Zero(), scene);
 camera2.minZ=.01;

 activeCamera="StandardCamera";
 scene.activeCamera=camera1;
 camera1.attachControl(canvas,false);
}


var UseCamera1=function(){

    if(activeCamera==="SecondCamera"){
        scene.beginAnimation(camera2, 200, 0, false);
        activeCamera="StandardCamera";
        camera2.detachControl(canvas);
    }
    scene.activeCamera=camera1;
    camera1.attachControl(canvas, false);
   // stairMesh.material=OriginalStairMaterial;
    fan1Mesh.material=OriginalFanMaterial;
    fan2Mesh.material=OriginalFanMaterial;


    }



var UseCamera2=function(){

    if(activeCamera==="StandardCamera"){
    activeCamera="SecondCamera";
    camera1.detachControl(canvas);
    }
    scene.activeCamera=camera2;
    //camera2.target= new BABYLON.Vector3();
    camera2.attachControl(canvas, false);
    

    }







//---------------------------------------------------------------------------------------------------------------------------------------------------------//

var CreateScene=function(){
        canvas = document.getElementById("renderCanvas"); // Get the canvas element 
        engine = new BABYLON.Engine(canvas, true); 
        scene= new BABYLON.Scene(engine);
        BABYLON.SceneLoader.Append("/babylonTest/", "coffrage_ventilateur.babylon", scene,function(scene){
                    scene.clearColor = new BABYLON.Color3(1, 1, 1);// modifier la couleur de background 
                    stairMesh = scene.getMeshByName("group_75");
                    fan1Mesh = scene.getMeshByName("instance_2.020");
                    fan2Mesh = scene.getMeshByName("instance_2.046");
                    fan3Mesh = scene.getMeshByName("instance_2.023");
                    //OriginalStairMaterial = scene.getMaterialByID("coffrage_ventilateur._0040_Peru");
                    OriginalStairMaterial=stairMesh.material;
                    //OriginalFanMaterial=scene.getMaterialByID("coffrage_ventilateur._0132_LightGray.001")
                    OriginalFanMaterial=fan1Mesh.material;
                    boxMaterial[0] = new BABYLON.StandardMaterial("material", scene);
                    boxMaterial[1] = new BABYLON.StandardMaterial("material", scene);
                    boxMaterial[2] = new BABYLON.StandardMaterial("material", scene);
                    boxMaterial[0].diffuseColor= new BABYLON.Color3.Red();
                    boxMaterial[0].specularColor= new BABYLON.Color3.Black();

                    boxMaterial[1].diffuseColor= new BABYLON.Color3.Green();
                    boxMaterial[1].specularColor= new BABYLON.Color3.Black();

                    boxMaterial[2].diffuseColor= new BABYLON.Color3.Blue();;
                    boxMaterial[2].specularColor=new BABYLON.Color3.Black();

                    //var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(4, 6, 1), scene);// ajouter de light
                })
        InitCamera();
      
        return scene
}

    var scene = CreateScene();


engine.runBe

	

    engine.runRenderLoop(function(){
  
        if ((camera1.beta< 0.1) || (camera2.beta<0.1))
                  {
                        camera1.beta=0.1;
                        camera2.beta=0.1;
                    }
                else if((camera1.beta >0.95*Math.PI/2) || (camera2.beta >0.95*Math.PI/2))
                {
                    camera1.beta = 0.95*Math.PI/2;
                    camera2.beta = 0.95*Math.PI/2;
                 }

	scene.render();

});

    window.addEventListener("resize", function () {

                engine.resize();

            });
