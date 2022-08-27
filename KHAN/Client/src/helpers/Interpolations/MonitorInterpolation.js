const interpolation = require("./interpolation").Interpolation;

exports.Get =(data, config, areas)=> {
  let count =0;
  let sum =0;
    data.map(item=>{
      if((item.x === 0 && item.y === 0 && item.z === 0) ||
      (item.x === 0 && item.y === 0 && item.z === config.size.z / config.sensorDensity -1) ||
      (item.x === 0 && item.y === config.size.y / config.sensorDensity -1 && item.z === 0) ||
      (item.x === 0 && item.y === config.size.y / config.sensorDensity -1 && item.z === config.size.z / config.sensorDensity -1) ||
      (item.x === config.size.x / config.sensorDensity -1 && item.y === 0 && item.z === 0) ||
      (item.x === config.size.x / config.sensorDensity -1 && item.y === 0 && item.z === config.size.z / config.sensorDensity -1) ||
      (item.x === config.size.x / config.sensorDensity -1 && item.y === config.size.y / config.sensorDensity -1 && item.z === 0) ||
      (item.x === config.size.x / config.sensorDensity -1 && item.y === config.size.y / config.sensorDensity -1 && item.z === config.size.z / config.sensorDensity -1)){
        count = count+1;
      }
      sum = sum + item.value;
    });
    if(count <8){
      return areas.map(area => {
        let temp_count =0;
        let temp_sum =0;
        data.map(item =>{
          if (
            item.x >= area.size.x0 &&
            item.x <= area.size.x1 &&
            item.y >= area.size.y0 &&
            item.y <= area.size.y1 &&
            item.z >= area.size.z0 &&
            item.z <= area.size.z1
          ){
            temp_count = temp_count +1;
            temp_sum = temp_sum +item.value;
          }
        })
        if(temp_count ==0){
          return {...area._doc,count:0,sum:0,average:sum/data.length};
        }else{
          return {...area._doc,count:0,sum:0,average:temp_sum/temp_count}
        }
        
      });
    }else{
      return getInterpolation(data, config, areas);
    }
}

const getInterpolation = (data, config, areas)=>{
  
  const density = config.sensorDensity;
  const xBlock = config.size.x / density;
  const yBlock = config.size.y / density;
  const zBlock = config.size.z / density;

  let result = new Array();

  for (let x = 0; x < xBlock; x++) {
    result[x] = new Array();
    for (let y = 0; y < yBlock; y++) {
      result[x][y] = new Array();
      for (let z = 0; z < zBlock; z++) {
        result[x][y][z] = null;
      }
    }
  }
  data.map((item) => {
    result[item.x][item.y][item.z] = item.value;
  });
  //result[x][y][z]

  recursive(0, 0, 0, xBlock - 1, yBlock - 1, zBlock - 1);

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

    const point = function (x, y, z, v) {
      return { x: x, y: y, z: z, value: v };
    };

    function interpolationMe(px, py, pz) {
      if (result[px][py][pz] === null) {
        
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

    function interpolationArea(px, py, pz) { 
        return interpolation(
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
      areas.map(area =>{
          //000
          if(area.size.x0 >= x0 && area.size.y0 >=y0 && area.size.z0 >=z0 && 
            area.size.x0 <= x1 && area.size.y0 <=y1 && area.size.z0 <=z1){
              if(!area.sum) area.sum =0;
              if(!area.count) area.count =0;
              area.count = area.count +1;
              area.sum = interpolationArea(area.size.x0,area.size.y0,area.size.z0)+ area.sum;
              area.average = area.sum/area.count;
            }
          //001
          if(area.size.x0 >= x0 && area.size.y0 >=y0 && area.size.z1 >=z0 && 
            area.size.x0 <= x1 && area.size.y0 <=y1 && area.size.z1 <=z1){
              if(!area.sum) area.sum =0;
              if(!area.count) area.count =0;
              area.count = area.count +1;
              area.sum = interpolationArea(area.size.x0,area.size.y0,area.size.z1)+ area.sum;
              area.average = area.sum/area.count;
            }
          //010
          if(area.size.x0 >= x0 && area.size.y1 >=y0 && area.size.z0 >=z0 && 
            area.size.x0 <= x1 && area.size.y1 <=y1 && area.size.z0 <=z1){
              if(!area.sum) area.sum =0;
              if(!area.count) area.count =0;
              area.count = area.count +1;
              area.sum = interpolationArea(area.size.x0,area.size.y1,area.size.z0)+ area.sum;
              area.average = area.sum/area.count;
            } 
          //011
          if(area.size.x0 >= x0 && area.size.y1 >=y0 && area.size.z1 >=z0 && 
            area.size.x0 <= x1 && area.size.y1 <=y1 && area.size.z1 <=z1){
              if(!area.sum) area.sum =0;
              if(!area.count) area.count =0;
              area.count = area.count +1;
              area.sum = interpolationArea(area.size.x0,area.size.y1,area.size.z1)+ area.sum;
              area.average = area.sum/area.count;
            }
          //100
          if(area.size.x1 >= x0 && area.size.y0 >=y0 && area.size.z0 >=z0 && 
            area.size.x1 <= x1 && area.size.y0 <=y1 && area.size.z0 <=z1){
              if(!area.sum) area.sum =0;
              if(!area.count) area.count =0;
              area.count = area.count +1;
              area.sum = interpolationArea(area.size.x1,area.size.y0,area.size.z0)+ area.sum;
              area.average = area.sum/area.count;
            }
          //101
          if(area.size.x1 >= x0 && area.size.y0 >=y0 && area.size.z1 >=z0 && 
            area.size.x1 <= x1 && area.size.y0 <=y1 && area.size.z1 <=z1){
              if(!area.sum) area.sum =0;
              if(!area.count) area.count =0;
              area.count = area.count +1;
              area.sum = interpolationArea(area.size.x1,area.size.y0,area.size.z1)+ area.sum;
              area.average = area.sum/area.count;
          } 
          //110
          if(area.size.x1 >= x0 && area.size.y1 >=y0 && area.size.z0 >=z0 && 
            area.size.x1 <= x1 && area.size.y1 <=y1 && area.size.z0 <=z1){
              if(!area.sum) area.sum =0;
              if(!area.count) area.count =0;
              area.count = area.count +1;
              area.sum = interpolationArea(area.size.x1,area.size.y1,area.size.z0)+ area.sum;
              area.average = area.sum/area.count;
          }        
          //111
          if(area.size.x1 >= x0 && area.size.y1 >=y0 && area.size.z1 >=z0 && 
            area.size.x1 <= x1 && area.size.y1 <=y1 && area.size.z1 <=z1){
              if(!area.sum) area.sum =0;
              if(!area.count) area.count =0;
              area.count = area.count +1;
              area.sum = interpolationArea(area.size.x1,area.size.y1,area.size.z1)+ area.sum;
              area.average = area.sum/area.count;
          }


      })
      
  }
} 
  return areas;
}

