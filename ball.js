AFRAME.registerComponent("ball",{
    init: function(){
        this.shoot()
    },

    shoot: function(){
        var turn = 10;
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z" && turn!==0){
                var ball = document.createElement("a-entity");
                ball.setAttribute("gltf-model","./assets/ball/scene.gltf")
                var cam = document.querySelector("#camera")
                var pos = cam.getAttribute("position")
                ball.setAttribute("position",
                {
                    x:pos.x,
                    y: 2,
                    z: pos.z
                });
                ball.setAttribute("dynamic-body",{
                    mass:10,
                    shape:"sphere",
                })
                ball.setAttribute("scale",{x:3.5,y:3.5,z:3.5})
                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);

                ball.setAttribute("velocity",direction.multiplyScalar(-15));
                ball.setAttribute("velocity",{y:0})
                turn-=1

                ball.addEventListener("collide",this.removeBall);
                this.sound();
                var scene = document.querySelector("#scene")
                scene.appendChild(ball)

                
            }
        })
    },
    removeBall: function(e){
        var score=0;
        var element = e.detail.target.el;

        //element which is hit
        var elementHit = e.detail.body.el;

        if (elementHit.id.includes("pin")) {
        //impulse and point vector
        var impulse = new CANNON.Vec3(0, 0, -0.02);
        var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
        );
        var entity = document.querySelector("#sound1");
        entity.components.sound.playSound();
        console.log(elementHit.id)
        elementHit.body.applyImpulse(impulse, worldPoint);
        score++;
        //remove event listener
        element.removeEventListener("collide", this.removeBall);
        }
    },
    sound: function(){
        var entity = document.querySelector("#sound2");
        entity.components.sound.playSound();
    }
})