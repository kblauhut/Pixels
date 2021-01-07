export const palette = [
  '#ffffff',
  '#bdbdbd',
  '#40414d',
  '#000000',
  '#36a3d9',
  '#173899',
  '#210a66',
  '#260240',
  '#4b0459',
  '#802671',
  '#b35181',
  '#cc7078',
  '#d99f82',
  '#e6b85c',
  '#cc7333',
  '#a64319',
  '#991717',
  '#731d0c',
  '#592716',
  '#734417',
  '#8c6631',
  '#b39c59',
  '#93a632',
  '#3b801a',
  '#095910',
  '#26402f',
  '#338060',
  '#39bfa9',
  '#ccb4a3',
  '#807669',
  '#4d4a40',
  '#7ca4bd',
  '#c8deec'
];

export function getColorHex(index) {
  if (palette[index] !== undefined) return palette[index];
  return '#bdbdbd';
}

export function getColorIndex(color) {
  for (let i = 0; i < palette.length; i += 1) {
    if (palette[i] === color) return i;
  }
  return 0;
}
