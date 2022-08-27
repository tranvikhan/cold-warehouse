/*
object point
{
    int value,
    int x,
    int y,
    int z
}
*/

exports.Interpolation = (p0, p1, p2, p3, p4, p5, p6, p7, pos) => {
  let iValue = 0;
  let iX0 = p0.x;
  let iX1 = p7.x;
  let iY0 = p0.y;
  let iY1 = p7.y;
  let iZ0 = p0.z;
  let iZ1 = p7.z;

  let iDenominator = (iX0 - iX1) * (iY0 - iY1) * (iZ0 - iZ1);

  let iA0 =
    (-p0.value * iX1 * iY1 * iZ1 +
      p4.value * iX1 * iY1 * iZ0 +
      p2.value * iX1 * iY0 * iZ1 -
      p6.value * iX1 * iY0 * iZ0 +
      p1.value * iX0 * iY1 * iZ1 -
      p5.value * iX0 * iY1 * iZ0 -
      p3.value * iX0 * iY0 * iZ1 +
      p7.value * iX0 * iY0 * iZ0) /
    iDenominator;

  let iA1 =
    (p0.value * iY1 * iZ1 -
      p4.value * iY1 * iZ0 -
      p2.value * iY0 * iZ1 +
      p6.value * iY0 * iZ0 -
      p1.value * iY1 * iZ1 +
      p5.value * iY1 * iZ0 +
      p3.value * iY0 * iZ1 -
      p7.value * iY0 * iZ0) /
    iDenominator;

  let iA2 =
    (p0.value * iX1 * iZ1 -
      p4.value * iX1 * iZ0 -
      p2.value * iX1 * iZ1 +
      p6.value * iX1 * iZ0 -
      p1.value * iX0 * iZ1 +
      p5.value * iX0 * iZ0 +
      p3.value * iX0 * iZ1 -
      p7.value * iX0 * iZ0) /
    iDenominator;

  let iA3 =
    (p0.value * iX1 * iY1 -
      p4.value * iX1 * iY1 -
      p2.value * iX1 * iY0 +
      p6.value * iX1 * iY0 -
      p1.value * iX0 * iY1 +
      p5.value * iX0 * iY1 +
      p3.value * iX0 * iY0 -
      p7.value * iX0 * iY0) /
    iDenominator;

  let iA4 =
    (-p0.value * iZ1 +
      p4.value * iZ0 +
      p2.value * iZ1 -
      p6.value * iZ0 +
      p1.value * iZ1 -
      p5.value * iZ0 -
      p3.value * iZ1 +
      p7.value * iZ0) /
    iDenominator;

  let iA5 =
    (-p0.value * iY1 +
      p4.value * iY1 +
      p2.value * iY0 -
      p6.value * iY0 +
      p1.value * iY1 -
      p5.value * iY1 -
      p3.value * iY0 +
      p7.value * iY0) /
    iDenominator;

  let iA6 =
    (-p0.value * iX1 +
      p4.value * iX1 +
      p2.value * iX1 -
      p6.value * iX1 +
      p1.value * iX0 -
      p5.value * iX0 -
      p3.value * iX0 +
      p7.value * iX0) /
    iDenominator;

  let iA7 =
    (p0.value -
      p4.value -
      p2.value +
      p6.value -
      p1.value +
      p5.value +
      p3.value -
      p7.value) /
    iDenominator;

  iValue =
    iA0 +
    iA1 * pos.x +
    iA2 * pos.y +
    iA3 * pos.z +
    iA4 * pos.x * pos.y +
    iA5 * pos.x * pos.z +
    iA6 * pos.y * pos.z +
    iA7 * pos.x * pos.y * pos.z;

  return Math.round(iValue*100)/100;
}
