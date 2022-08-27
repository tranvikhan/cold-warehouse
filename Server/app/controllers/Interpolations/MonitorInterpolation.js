exports.Get = (cubeData, areas) => {
  let coppy = [...areas];
  return coppy.map((area) => {
    let average =
      (cubeData.values[area.size.x0][area.size.y0][area.size.z0] +
        cubeData.values[area.size.x0][area.size.y0][area.size.z1] +
        cubeData.values[area.size.x0][area.size.y1][area.size.z0] +
        cubeData.values[area.size.x0][area.size.y1][area.size.z1] +
        cubeData.values[area.size.x1][area.size.y0][area.size.z0] +
        cubeData.values[area.size.x1][area.size.y0][area.size.z1] +
        cubeData.values[area.size.x1][area.size.y1][area.size.z0] +
        cubeData.values[area.size.x1][area.size.y1][area.size.z1]) /
      8;

    return average != 90 ? { ...area._doc, average: average, count: 8 } : null;
  });
};
