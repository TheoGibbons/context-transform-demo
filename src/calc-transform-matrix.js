function matrixInverse3x3(M) {
  const [
    [a, b, c],
    [d, e, f],
    [g, h, i]
  ] = M;

  if (!M || M.length !== 3 || M.some(row => row.length !== 3)) {
    throw new Error("Input must be a 3x3 matrix");
  }

  const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  if (det === 0) throw new Error("Matrix is not invertible");

  const invDet = 1 / det;

  return [
    [
      (e * i - f * h) * invDet,
      (c * h - b * i) * invDet,
      (b * f - c * e) * invDet
    ],
    [
      (f * g - d * i) * invDet,
      (a * i - c * g) * invDet,
      (c * d - a * f) * invDet
    ],
    [
      (d * h - e * g) * invDet,
      (b * g - a * h) * invDet,
      (a * e - b * d) * invDet
    ]
  ];
}

function matrixMultiply(A, B) {

  if (!A || !B || A.some(row => row.length !== B.length)) {
    throw new Error("Incompatible matrix dimensions");
  }

  const result = [];

  for (let i = 0; i < A.length; i++) {
    result[i] = [];
    for (let j = 0; j < B[0].length; j++) {
      result[i][j] = 0;
      for (let k = 0; k < B.length; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }

  return result;
}

function calcTransformMatrix(M2, M3) {
  return matrixMultiply(M3, matrixInverse3x3(M2))
}