const interpolation = require("./interpolation").Interpolation;

const NoiSuyBaChieu = (data, config) => {
  let tempArray= data.map(fd => fd.value);
  const density = config.sensorDensity;
  const xBlock = config.size.x / density -1;
  const yBlock = config.size.y / density -1;
  const zBlock = config.size.z / density -1;

  let result = new Array();
  for (let x = 0; x <= xBlock; x++) {
    result[x] = new Array();
    for (let y = 0; y <= yBlock; y++) {
      result[x][y] = new Array();
      for (let z = 0; z <= zBlock; z++) {
        result[x][y][z] = null;
      }
    }
  }
  if(data.length ===0) return result;
  var total = 0;
  for(var i = 0; i < data.length; i++) {
      total += data[i].value;
  }
  var avg = total / data.length;
  let copyData = data.map(dt=>{
    return {
      x: dt.x,
      y: dt.y,
      z: dt.z
    }
  });
  
  if(!copyData.find(e=>(e.x === 0 && e.y === 0 && e.z === 0))) data.push({x:0,y:0,z:0, value:avg});
  if(!copyData.find(e=>(e.x === 0 && e.y === 0 && e.z === zBlock))) data.push({x:0,y:0,z:zBlock, value:avg});
  if(!copyData.find(e=>(e.x === 0 && e.y === yBlock && e.z === 0))) data.push({x:0,y:yBlock,z:0, value:avg});
  if(!copyData.find(e=>(e.x === 0 && e.y === yBlock && e.z === zBlock))) data.push({x:0,y:yBlock,z:zBlock, value:avg});
  if(!copyData.find(e=>(e.x === xBlock && e.y === 0 && e.z === 0))) data.push({x:xBlock,y:0,z:0, value:avg});
  if(!copyData.find(e=>(e.x === xBlock && e.y === 0 && e.z === zBlock))) data.push({x:xBlock,y:0,z:zBlock, value:avg});
  if(!copyData.find(e=>(e.x === xBlock && e.y === yBlock && e.z === 0))) data.push({x:xBlock,y:yBlock,z:0, value:avg});
  if(!copyData.find(e=>(e.x === xBlock && e.y === yBlock && e.z === zBlock))) data.push({x:xBlock,y:yBlock,z:zBlock, value:avg});


  data.map((item) => {
    result[item.x][item.y][item.z] = item.value;
  });
  //result[x][y][z]

  recursive(0, 0, 0, xBlock, yBlock, zBlock);

  function recursive(x0, y0, z0, x1, y1, z1) {
    function DivCube(xx0, yy0, zz0, xx1, yy1, zz1) {
      interpolationMe(xx0, yy0, zz0);
      interpolationMe(xx0, yy0, zz1);
      interpolationMe(xx0, yy1, zz0);
      interpolationMe(xx0, yy1, zz1);
      interpolationMe(xx1, yy0, zz0);
      interpolationMe(xx1, yy0, zz1);
      interpolationMe(xx1, yy1, zz0);
      interpolationMe(xx1, yy1, zz1);

      recursive(xx0, yy0, zz0, xx1, yy1, zz1);
    }

    function interpolationMe(px, py, pz) {
      if (result[px][py][pz] === null) {
        let point = function (x, y, z, v) {
          return { x: x, y: y, z: z, value: v };
        };
        result[px][py][pz] = interpolation(
          point(x0, y0, z0, result[x0][y0][z0]),
          point(x1, y0, z0, result[x1][y0][z0]),
          point(x0, y1, z0, result[x0][y1][z0]),
          point(x1, y1, z0, result[x1][y1][z0]),
          point(x0, y0, z1, result[x0][y0][z1]),
          point(x1, y0, z1, result[x1][y0][z1]),
          point(x0, y1, z1, result[x0][y1][z1]),
          point(x1, y1, z1, result[x1][y1][z1]),
          { x: px, y: py, z: pz }
        );
      }
    }

    data = data.filter((item) => {
      return !(
        (item.x === x0 && item.y === y0 && item.z === z0) ||
        (item.x === x0 && item.y === y0 && item.z === z1) ||
        (item.x === x0 && item.y === y1 && item.z === z0) ||
        (item.x === x0 && item.y === y1 && item.z === z1) ||
        (item.x === x1 && item.y === y0 && item.z === z0) ||
        (item.x === x1 && item.y === y0 && item.z === z1) ||
        (item.x === x1 && item.y === y1 && item.z === z0) ||
        (item.x === x1 && item.y === y1 && item.z === z1)
      );
    });

    /* console.log(
      x0 + "|" + y0 + "|" + z0 + "    |    " + x1 + "|" + y1 + "|" + z1
    );
    console.log(data.length);  */
    

    let check = true;
    let item = null;

    for (let i = 0; i < data.length; i++) {
      //nam tren canh
      if (
        (data[i].y === y0 && data[i].z === z0) ||
        (data[i].y === y0 && data[i].z === z1) ||
        (data[i].y === y1 && data[i].z === z0) ||
        (data[i].y === y1 && data[i].z === z1)
      ) {
        item = data[i];

        DivCube(x0, y0, z0, item.x, y1, z1);
        DivCube(item.x, y0, z0, x1, y1, z1);

        check = false;
        break;
      }

      if (
        (data[i].x === x0 && data[i].z === z0) ||
        (data[i].x === x0 && data[i].z === z1) ||
        (data[i].x === x1 && data[i].z === z0) ||
        (data[i].x === x1 && data[i].z === z1)
      ) {
        item = data[i];

        DivCube(x0, y0, z0, x1, item.y, z1);
        DivCube(x0, item.y, z0, x1, y1, z1);

        check = false;
        break;
      }

      if (
        (data[i].y === y0 && data[i].x === x0) ||
        (data[i].y === y0 && data[i].x === x1) ||
        (data[i].y === y1 && data[i].x === x0) ||
        (data[i].y === y1 && data[i].x === x1)
      ) {
        item = data[i];

        DivCube(x0, y0, z0, x1, y1, item.z);
        DivCube(x0, y0, item.z, x1, y1, z1);

        check = false;
        break;
      }
      //nam tren mat phang
      if (data[i].y === y0 || data[i].y === y1) {
        item = data[i];

        DivCube(x0, y0, z0, item.x, y1, item.z);
        DivCube(item.x, y0, z0, x1, y1, item.z);
        DivCube(x0, y0, item.z, item.x, y1, z1);
        DivCube(item.x, y0, item.z, x1, y1, z1);

        check = false;
        break;
      }

      if (data[i].x === x0 || data[i].x === x1) {
        item = data[i];

        DivCube(x0, y0, z0, x1, item.y, item.z);
        DivCube(x0, item.y, z0, x1, y1, item.z);
        DivCube(x0, y0, item.z, x1, item.y, z1);
        DivCube(x0, item.y, item.z, x1, y1, z1);

        check = false;
        break;
      }

      if (data[i].z === z0 || data[i].z === z1) {
        item = data[i];

        DivCube(x0, y0, z0, item.x, item.y, z1);
        DivCube(item.x, y0, z0, x1, item.y, z1);
        DivCube(x0, item.y, z0, item.x, y1, z1);
        DivCube(item.x, item.y, z0, x1, y1, z1);

        check = false;
        break;
      }

      //nam trong khoi
      if (
        data[i].x > x0 &&
        data[i].x < x1 &&
        data[i].y > y0 &&
        data[i].y < y1 &&
        data[i].z > z0 &&
        data[i].z < z1
      ) {
        item = data[i];
        DivCube(x0, y0, z0, item.x, item.y, item.z);
        DivCube(item.x, y0, z0, x1, item.y, item.z);
        DivCube(x0, item.y, z0, item.x, y1, item.z);
        DivCube(item.x, item.y, z0, x1, y1, item.z);

        DivCube(x0, y0, item.z, item.x, item.y, z1);
        DivCube(item.x, y0, item.z, x1, item.y, z1);
        DivCube(x0, item.y, item.z, item.x, y1, z1);
        DivCube(item.x, item.y, item.z, x1, y1, z1);

        check = false;
        break;
      }
    }

    if (check) {
      /* console.log("tinh noi suy"); */

      for (let ix = x0; ix <= x1; ix++) {
        for (let iy = y0; iy <= y1; iy++) {
          for (let iz = z0; iz <= z1; iz++) {
            interpolationMe(ix, iy, iz);
          }
        }
      }
    }
  }
  return {values: result,max:Math.max(...tempArray),min: Math.min(...tempArray)};
}

export default NoiSuyBaChieu;