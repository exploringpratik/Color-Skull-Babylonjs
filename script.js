var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var mesh = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(1, 1, 1));

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.99;
    camera.lowerRadiusLimit = 10;


    camera.wheelPrecision = 0.5;
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.5;

    // THE MESH I WANT TO IMPORT AND TO Re-COLOR
    BABYLON.SceneLoader.ImportMesh("", "./", "cubemtlobj.obj", scene, function (newMeshes) {
        mesh = newMeshes[0];
        mesh.material = new BABYLON.StandardMaterial("mat", scene);
        mesh.material.emissiveColor = new BABYLON.Color3.Green()
    });

    return scene;

};




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

function redColor() {
    changeColor(1, 0, 0)
}

function yellowColor() {
    changeColor(1, 1, 0)

}

function greenColor() {
    changeColor(0, 0.5, 0)

}

function changeColor(r, g, b) {
    BABYLON.SceneLoader.ImportMesh("", "./", "cubemtlobj.obj", scene, function (newMeshes) {
        mesh = newMeshes[0];
        mesh.material = new BABYLON.StandardMaterial("mat", scene);
        mesh.material.emissiveColor = new BABYLON.Color3(r, g, b)
    });
}