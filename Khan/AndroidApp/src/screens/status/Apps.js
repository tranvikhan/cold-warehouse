import * as React from 'react';
import TChart from './components/TChart.js';

let Config =
{
  "size": {
    "x": 3,
    "y": 3,
    "z": 3,
    "tilesize": 5
  },
  "door": {
    "show": true,
    "direction": "A"//"4 hướng là 4 cạnh của hình chữ nhật có thể đánh dấu A B C D"
  },
  "axis-labels": {
    "axis-x": {
      "show": true,
      "list": [0, 5, 12, 19]
    },
    "axis-y": {
      "show": true,
      "list": [2, 6]
    },
    "axis-z": {
      "show": true,
      "list": [5, 9]
    }
  }
}

let Data =
{
	"values" :
	[[
		[0, 1, 2],
		[0, 1, 2],
		[0, 1, 2]
	],
	[
		[0, 1, 2],
		[0, 1, 2],
		[0, 1, 2]
	],
	[
		[0, 1, 2],
		[0, 1, 2],
		[0, 1, 2]
	]],
	"min": 0,
	"max": 2
}

let Slice =
{
    axis: "x",
    level: 0
}

export default function Apps() {
  return (
    <TChart config={Config} data={Data} slice={Slice}/>
  );
}