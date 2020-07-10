
var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    //Adding a light
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);

    //Adding an Arc Rotate Camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);

    var assetsManager = new BABYLON.AssetsManager(scene);
    // var meshTask = ass/etsManager.addMeshTask("mtask", "", "scenes/", "skull.babylon");
    var meshTask = assetsManager.addMeshTask("mtask", "", "./", "cubemtlobj.obj");

    // var meshTask = BABYLON.SceneLoader.Append('./', 'cube.obj', scene, function (meshes) {
    //     scene.createDefaultCameraOrLight(true, true, true);
    // })

    meshTask.onSuccess = function (task) {
        console.log('loaded ' + task.loadedMeshes[1])
        task.loadedMeshes[1].position = BABYLON.Vector3.Zero();
        let material = task.loadedMeshes[1].material
            = new BABYLON.StandardMaterial('mat', scene);
        // material.emissiveColor = BABYLON.Color3.Blue();
        material.diffuseColor = BABYLON.Color3.Red();
        let material1 = task.loadedMeshes[0].material
            = new BABYLON.StandardMaterial('mat', scene);
        // material.emissiveColor = BABYLON.Color3.Blue();
        material1.diffuseColor = BABYLON.Color3.Green();
    }

    // Move the light with the camera
    scene.registerBeforeRender(function () {
        light.position = camera.position;
    });

    assetsManager.onFinish = function (tasks) {
        engine.runRenderLoop(function () {
            scene.render();
        });
    };

    assetsManager.load();

    return scene;
}
var engine;
try {
    engine = createDefaultEngine();
} catch (e) {
    console.log("the available createEngine function failed. Creating the default engine instead");
    engine = createDefaultEngine();
}
if (!engine) throw 'engine should not be null.';
scene = createScene();;
sceneToRender = scene

engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
