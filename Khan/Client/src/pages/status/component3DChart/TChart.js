import React, {
    // eslint-disable-next-line
    useState, useEffect, useRef
} from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import {
    Object3D
} from 'three';
import "./3DChart.css";

const TChart = (props) => {
    const container = useRef();

    const initWorld = () =>{
        console.log("makeWorld");
        let scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        let camera = new THREE.PerspectiveCamera(
            60,
            container.current.clientWidth / container.current.clientHeight,
            1,
            1000
        );
        camera.up.set(0, 0, 1);
        camera.position.set(350, 350, 350);
    
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.current.clientWidth, container.current.clientHeight);
        
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 10;
        controls.maxDistance = 900;
        controls.maxPolarAngle = Math.PI;
        controls.rotateSpeed = 0.5;
        
        let axesHelper = new THREE.AxesHelper(7749);
        scene.add(axesHelper);
        // window.addEventListener('resize', function () {
        //     camera.aspect = window.clientWidth / container.current.clientHeight;
        //     camera.updateProjectionMatrix();
        //     renderer.setSize(container.current.clientWidth, container.current.clientHeight);
        // }, false);

        let animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
        return {
            scene: scene,
            camera: camera,
            controls: controls,
            renderer: renderer
        };    
    }
    const world = useRef();

    const makeDoor = () => {
        console.log("makeDoor");
        let oSettings = props.config.door;
        if (!oSettings.show || !world.current.scene) return;
        let oCSize = props.config.size;
        let oSize = {
            x: oCSize.x * oCSize.tilesize,
            y: oCSize.y * oCSize.tilesize,
            z: oCSize.z * oCSize.tilesize,
            e: 20 * oCSize.tilesize
        }

        let oVector= {
            x0: 0, y0: 0, z0: 0,
            x1: 0, y1: 0, z1: 0
        };
        switch (oSettings.direction){
            case 'A':
                oVector = {
                    x0: oSize.x/2, y0: -oSize.e, z0: oSize.z/2,
                    x1: oSize.x/2, y1: oSize.y, z1: oSize.z/2
                }
                break;
            case 'B':
                oVector = {
                    x0: oSize.x/2, y0: oSize.y+oSize.e, z0: oSize.z/2,
                    x1: oSize.x/2, y1: oSize.y, z1: oSize.z/2
                }
                break;
            case 'C':
                oVector = {
                    x0: -oSize.e, y0: oSize.y/2, z0: oSize.z/2,
                    x1: oSize.x, y1: oSize.y/2, z1: oSize.z/2
                }
                break;
            case 'D':
                oVector = {
                    x0: oSize.x+oSize.e, y0: oSize.y/2, z0: oSize.z/2,
                    x1: oSize.x, y1: oSize.y/2, z1: oSize.z/2
                }
                break;
            default:
                break;
        }

        let vDirection = new THREE.Vector3( oVector.x1-oVector.x0, oVector.y1-oVector.y0, oVector.z1-oVector.z0);
        let vOrigin = new THREE.Vector3( oVector.x0, oVector.y0, oVector.z0);

        let iLength = 8*oCSize.tilesize;
        let iColor = 0x000000;
        let iHeadLength = 2*oCSize.tilesize;
        let iHeadWidth = 1*oCSize.tilesize;
        let oDoor = new THREE.ArrowHelper(vDirection.normalize(), vOrigin, iLength, iColor, iHeadLength, iHeadWidth);
        oDoor.up.set(0,0,1);

        world.current.scene.add(oDoor);
    }

    const makeWireFrame = () => {
        console.log("makeWireFrame");
        let oMaterial = new THREE.LineBasicMaterial({
            color: 0x000000,
            linewidth: 2
        });
        let oSize = props.config.size;
        let x = oSize.x * oSize.tilesize;
        let y = oSize.y * oSize.tilesize;
        let z = oSize.z * oSize.tilesize;
        let aPoints = [];
        aPoints.push( new THREE.Vector3( 0, 0, 0 ) );
        aPoints.push( new THREE.Vector3( x, 0, 0 ) );
        aPoints.push( new THREE.Vector3( x, y, 0 ) );
        aPoints.push( new THREE.Vector3( 0, y, 0 ) );
        aPoints.push( new THREE.Vector3( 0, 0, 0 ) );
        aPoints.push( new THREE.Vector3( 0, 0, z ) );
        aPoints.push( new THREE.Vector3( x, 0, z ) );
        aPoints.push( new THREE.Vector3( x, y, z ) );
        aPoints.push( new THREE.Vector3( 0, y, z ) );
        aPoints.push( new THREE.Vector3( 0, 0, z ) );
        let oGeometry1 = new THREE.BufferGeometry().setFromPoints( aPoints );

        aPoints = [];
        aPoints.push( new THREE.Vector3( x, 0, 0 ) );
        aPoints.push( new THREE.Vector3( x, 0, z ) );
        aPoints.push( new THREE.Vector3( x, y, z ) );
        aPoints.push( new THREE.Vector3( x, y, 0 ) );
        aPoints.push( new THREE.Vector3( 0, y, 0 ) );
        aPoints.push( new THREE.Vector3( 0, y, z ) );
        let oGeometry2 = new THREE.BufferGeometry().setFromPoints( aPoints );

        let oLine1 = new THREE.Line( oGeometry1, oMaterial );
        world.current.scene.add(oLine1);
        let oLine2 = new THREE.Line( oGeometry2, oMaterial );
        world.current.scene.add(oLine2);
    }

    const calcSize = () => {
        let result = {
            x: props.config.size.x,
            y: props.config.size.y,
            z: props.config.size.z,
        }
        result[props.slice.axis.toLowerCase()] -= props.slice.level;
        if (result.x < 0 || result.y < 0 || result.z < 0) return null;
        return result;
    }

    const makeFrame = () => {
        console.log("makeFrame");
        let size = calcSize();
        let tileSize = props.config.size.tilesize;        
        //Centering oribit controls
        world.current.controls.target.set(props.config.size.x*tileSize/2, props.config.size.y*tileSize/2, props.config.size.z*tileSize/2);
        let cube = new Object3D();
        for (let ii = 0; ii < 6; ii++) {
            cube.add(createAFace(ii));
        }
        
        world.current.scene.add(cube);
        cube.size = size;//?

        return cube;

        function createAFace(order) {
            let fPi = Math.PI;
            let size = calcSize();
            let oFaceInfo = {
                0: {
                    width: 'x',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 0, 0),
                    get position() {
                        return new THREE.Vector3(size[this.width] * tileSize / 2, 0, size[this.height] * tileSize / 2)
                    },
                    side: THREE.BackSide
                },
                1: {
                    width: 'x',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 0, 0),
                    get position() {
                        return new THREE.Vector3(size[this.width] * tileSize / 2, size.y * tileSize, size[this.height] * tileSize / 2)
                    },
                    side: THREE.FrontSide
                },
                2: {
                    width: 'y',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 3 * fPi / 2, 0),
                    get position() {
                        return new THREE.Vector3(0, size[this.width] * tileSize / 2, size[this.height] * tileSize / 2)
                    },
                    side: THREE.FrontSide
                },
                3: {
                    width: 'y',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 3 * fPi / 2, 0),
                    get position() {
                        return new THREE.Vector3(size.x * tileSize, size[this.width] * tileSize / 2, size[this.height] * tileSize / 2)
                    },
                    side: THREE.BackSide
                },
                4: {
                    width: 'x',
                    height: 'y',
                    angle: new THREE.Vector3(fPi, 0, 0),
                    get position() {
                        return new THREE.Vector3(size[this.width] * tileSize / 2, size[this.height] * tileSize / 2, 0)
                    },
                    side: THREE.FrontSide
                },
                5: {
                    width: 'x',
                    height: 'y',
                    angle: new THREE.Vector3(fPi, 0, 0),
                    get position() {
                        return new THREE.Vector3(size[this.width] * tileSize / 2, size[this.height] * tileSize / 2, size.z * tileSize)
                    },
                    side: THREE.BackSide
                }
            }

            let oCurrFI = oFaceInfo[order];
            let tileGeometry = new THREE.PlaneGeometry(
                size[oCurrFI.width] * tileSize,
                size[oCurrFI.height] * tileSize,
                size[oCurrFI.width], size[oCurrFI.height]
            );
        
            let tileMaterial = new THREE.MeshBasicMaterial({
                vertexColors: THREE.FaceColors,
                side: oCurrFI.side
            });
            let boxMesh = new THREE.Mesh(tileGeometry, tileMaterial);
            boxMesh.rotation.setFromVector3(oCurrFI.angle);
            boxMesh.position.copy(oCurrFI.position);
            tileGeometry.dispose();
            tileMaterial.dispose();
            return boxMesh;
        }
    }
    const mainFrame = useRef();

    const writeNumber = () => {
        const tilesize = props.config.size.tilesize;
        
        const makeTextSprite = ( message) => {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.width = canvas.height = tilesize*2;

            // context.beginPath();
            // context.rect(0,0,canvas.width,canvas.height);
            // context.fillStyle = "red";
            // context.fill();

            context.font = 'Bold '+tilesize*2+'px Roboto';
            context.fillStyle = "#7F007F";
            context.textAlign = "center";
            context.fillText(message, tilesize, tilesize*1.74591293182);

            let texture = new THREE.Texture(canvas) 
            texture.needsUpdate = true;

            var spriteMaterial = new THREE.SpriteMaterial( { map: texture } );
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(canvas.width, canvas.width, canvas.width);
            return sprite;	
        }
        
        const writeN = (n, x, y, z) => {
            const mul = (n) => {return (n-0.5)*tilesize};
            let sp = makeTextSprite(String(n));
            sp.position.set( mul(x), mul(y), mul(z) );
            world.current.scene.add(sp);
        }

        
        let oLabel = props.config["axis-labels"];
        if (oLabel){
        if (oLabel["axis-x"].show)
            oLabel["axis-x"].list.forEach((e) => {
                writeN(e,e,0,0);
        })
        if (oLabel["axis-y"].show)
            oLabel["axis-y"].list.forEach((e) => {
                writeN(e,0,e,0);
        })
        if (oLabel["axis-z"].show)
            oLabel["axis-z"].list.forEach((e) => {
                writeN(e,0,0,e);
        })
        }
    }

    const updateChart = (oFrame) => {
        let aData = props.data.values;
        let size = calcSize();
        
        let aFace = new Array(6).fill(0);

        //Find lowest and greatest temperature
        let iMin = props.data.min;
        let iMax = props.data.max;
        for(let iit=0;iit<size.z;iit++){
            for(let iis=0;iis<size.y;iis++){
                for(let iif=0;iif<size.x;iif++){
                    if (iis === 0)
                        push2Face(0, aData[iif][iis][iit])
                    if (iis === size.y - 1)
                        push2Face(1, aData[iif][iis][iit])
                    if (iif === 0)
                        push2Face(2, aData[iif][iis][iit])
                    if (iif === size.x - 1)
                        push2Face(3, aData[iif][iis][iit])
                    if (iit === 0)
                        push2Face(4, aData[iif][iis][iit])
                    if (iit === size.z - 1)
                        push2Face(5, aData[iif][iis][iit])
                }
            }
        }

        for (let ii=0;ii<6;ii++)
            oFrame.children[ ii ].geometry.elementsNeedUpdate = true;

        function push2Face(order, value){
            let hue = tempToHSL(iMin, iMax, value);
            let currFace = oFrame.children[order].geometry.faces;
            let idx = aFace[order];
            currFace[idx * 2].color.setHSL( hue, 1, 0.5);
            currFace[idx * 2 + 1].color.setHSL( hue, 1, 0.5);
            aFace[order]++;
        }

        function tempToHSL(min, max, temp) {
            return (240 - (temp - min) * 240 / (max - min))/360; //hue
        }
    }

    useEffect(()=>{
        world.current = initWorld();
        container.current.appendChild(world.current.renderer.domElement);
        makeDoor();
        makeWireFrame();
        writeNumber();
        return () => {

        }
    },[]);

    useEffect(() => {
        mainFrame.current = makeFrame();
        if(props.data != null)
            updateChart(mainFrame.current);
        return () => {
            world.current.scene.remove(mainFrame.current);
        }
    // eslint-disable-next-line
    },[props.slice]);

    useEffect(()=>{
        if(props.data != null)
            updateChart(mainFrame.current);
    // eslint-disable-next-line
    },[props.data]);
    return (
        <div className="chartContainer" ref={(self)=>{container.current = self}}/>
    );
};

export default TChart;