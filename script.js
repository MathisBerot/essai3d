window.addEventListener("load", function() {
    let canvas = document.getElementById("canvas");
    let engine = new BABYLON.Engine(canvas, true);
    engine.enableOfflineSupport = false;

    let createScene = function() {
        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        let lum1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(-4, 1, -4), scene);
        let lum2 = new BABYLON.PointLight("Light2", new BABYLON.Vector3(4, 1, -4), scene);

        // Charge le fichier STL
        BABYLON.STLFileLoader.RegisterPlugin();
        BABYLON.SceneLoader.ImportMesh("", "./", "planete.stl", scene, function(meshes) {
            console.log("Modèle chargé :", meshes);
        }, null, function(scene, message) {
            console.error("Erreur de chargement :", message);
        });

        return scene;
    };

    let scene = createScene();

    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener("resize", function() {
        engine.resize();
    });
});
