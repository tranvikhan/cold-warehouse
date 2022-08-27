const FakeData = [
  {
    id: "118",
    value: -6.11,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    id: "112",
    value: -7.66,
    x: 53,
    y: 0,
    z: 0,
  },
  {
    id: "107",
    value: -6.11,
    x: 0,
    y: 22,
    z: 0,
  },
  {
    id: "101",
    value: -7.44,
    x: 53,
    y: 22,
    z: 0,
  },
  {
    id: "116",
    value: -3.99,
    x: 0,
    y: 0,
    z: 25,
  },
  {
    id: "110",
    value: -4.55,
    x: 53,
    y: 0,
    z: 25,
  },
  {
    id: "109",
    value: -3.44,
    x: 0,
    y: 22,
    z: 25,
  },
  {
    id: "103",
    value: -4.55,
    x: 53,
    y: 22,
    z: 25,
  }
  /* {
    id: "119",
    value: -16.36,
    x: 26,
    y: 11,
    z: 12,
  },
  {
    id: "120",
    value: -16.54,
    x: 13,
    y: 0,
    z: 0,
  }, 
  {
    id: "121",
    value: -16.32,
    x: 37,
    y: 22,
    z: 18,
  }, */
];

const WareHouseConfig = {
  id: "room00001",
  name: "Phòng A1",
  description: "Phòng thí nghiệm chuyên sâu 1",
  size: {
    x: 540,
    y: 230,
    z: 260,
  },
  sensorDensity: 10,
};
const interpolation = require("./interpolation").Interpolation;
function MainFunc(data, config) {
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
  return result;
}

exports.Fake = () => {
  return MainFunc(FakeData, WareHouseConfig);
};
