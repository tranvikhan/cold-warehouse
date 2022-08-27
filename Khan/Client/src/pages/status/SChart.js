// eslint-disable-next-line
import React, {useEffect, useState} from 'react';
import TChart from './component3DChart/3DChart.js'
import HueBar from './component3DChart/HueBar.js'
import Axios from 'axios';
import MySlice from '../../components/MySlice.js';
import {BASE_URL} from '../../constants/apiConfig.js'


let Config =
{
  "size": {
    "x": 53,
    "y": 22,
    "z": 25,
    "tilesize": 5
  },
  "door": {
    "show": true,
    "direction": "C"//"4 hướng là 4 cạnh của hình chữ nhật có thể đánh dấu A B C D"
  },
  "axis-labels": {
    "axis-x": {
      "show": true,
      "list": [0,13,26,53]
    },
    "axis-y": {
      "show": true,
      "list": [22,10]
    },
    "axis-z": {
      "show": true,
      "list": [23,12,18]
    }
  }
}



function axiosTest() {
  // create a promise for the axios request
  const promise = Axios.get( BASE_URL + "api/sensor/demoTemperature");

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data)

  // return it
  return dataPromise
}

// now we can use that data from the outside!

export default function SChart() {
    const [data,setData] = useState(null);
    const [axis, setAxis] = useState('x');
    const [slice,setSlice] = useState({
        origin: null,
        destination: null
    });
    const [exTemp, setExTemp] = useState({
        min: 0,
        max: 0
    })
    useEffect(()=>{
        axiosTest()
            .then(data => {
                setData(data);
            })
            .catch(err => console.log(err))
    },[]);

    useEffect(()=>{
        data!=null && setExTemp({
            min: data.min,
            max: data.max
        });
    },[data])
  return (<>
    <TChart config={Config} data={data} slice={slice}/>
    <div className="p-x-4">
        <HueBar min={exTemp.min} max={exTemp.max} width={"100%"} height={10}></HueBar>
    </div>
    <MySlice max={0} max={ Config.size[axis]-1}
        onChangeValue={(value)=> {
            let vDes = {
                x: Config.size.x,
                y: Config.size.y,
                z: Config.size.z
            }
            vDes[axis] = Config.size[axis] - value;
            setSlice({
                origin: null,
                destination: vDes
            });
        }}
        onChangeAxis={(ax)=>{
            console.log(ax);
            setAxis(ax);
        }}
    />
  </>
  );
}