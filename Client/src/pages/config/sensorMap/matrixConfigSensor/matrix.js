import React, { useEffect, useState, useRef } from 'react'
// import MySlice from 'components/MySlice.js'
// import HueBar from 'components/HueBar.js'
import './matrix.css'

class Helper{
    constructor(){
        this.xRuler = document.createElement('p')
        this.yRuler = document.createElement('p')
    }
    colorMap = [
        '#CCCCCC',
        '#00A100',
        '#FFAA00',
        '#DC0404'
    ]
    setProps(props){
        this.data = props.data;
        this.min = props.min;
        this.max = props.max;
        this.width = this.data[0].length;
        this.height = this.data.length;
        this.onClick = props.onClick;
        this.config = props.config;
    }
    setAxis(axis){
        this.axis = axis
    }
    createElement(tagName, attribute = {}){
        let e = document.createElement(tagName);
        Object.assign(e, attribute);
        return e;
    }
    createEmptyElement(){
        return this.createElement('p')
    }
    makeRow(rowNumber, container){
        const { data: DATA, width: WIDTH} = this;

        let row = this.createElement('tr');

        for(let ix=0;ix<WIDTH;ix++){
            let type = DATA[rowNumber][ix];
            let cl = this.colorMap[type];
            row.appendChild(
                this.createElement('td', {
                    onclick: () => this.onClick(ix,rowNumber,cl, type),
                    onmouseenter: () => this.onMouseEnter(ix,rowNumber),
                    onmouseout: () => this.onMouseOut(ix,rowNumber),
                    style: `background: ${cl}`,
                    className: "cell"
                })
            );
        }
        container.appendChild(row);
    }
    makeTable(container){
        const table = this.createElement('table', {
            className: 'text-center',
        })

        for(let iy=this.height-1;iy>=0;iy--){
            this.makeRow(iy, table);
        }

        container.innerHTML = '';
        container.appendChild(table);
        container.appendChild(this.xRuler);
        container.appendChild(this.yRuler);
        this.xRuler.className = this.yRuler.className = "label";
    }
    onMouseEnter(x, y){
        let router = {
            x: {
                f: "y",
                s: "z"
            },
            y: {
                f: "z",
                s: "x"
            },
            z: {
                f: "y",
                s: "x"
            }
        }
        this.xRuler.innerHTML = `<strong>${router[this.axis].s}</strong>: ` + x;
        this.yRuler.innerHTML = `<strong>${router[this.axis].f}</strong>: ` + y;
    }
    onMouseOut(x, y){
        delete [x, y];
    }
    handleRuler(container, event){
        this.xRuler.style = this.yRuler.style = 'display;';
        let fkRect = container.getBoundingClientRect();
        let x = event.clientX-fkRect.left-this.xRuler.clientWidth/2;
        let y = event.clientY-fkRect.top-this.yRuler.offsetHeight/2;
        this.xRuler.style = `background: #afa;
            left: ${x}px;
            top: ${container.offsetHeight}px;`;
        this.yRuler.style = `background: #faa;
            left: ${container.offsetWidth}px;
            top: ${y}px;`;
    }
    removeRuler(){
        this.xRuler.style.display = this.yRuler.style.display = 'none';
    }
    initData(sz){
        return { values: new Array(sz.x).fill(0).map(
            e => new Array(sz.y).fill(0).map(
                e => new Array(sz.z).fill(0).map(
                    e => 0
            ))),
            min: 0,
            max: 0
        }
    }
}

export const ViewConfigSensorMap = (props) => {
    const [container, setContainer] = useState(document.createElement('p'));
    const helper = new Helper();

    useEffect(()=>{
        helper.setProps(props);
        helper.setAxis(props.axis);
        helper.makeTable(container);
        let parent = container.parentElement || container;
        let sm = (parent.offsetWidth<parent.offsetHeight)?parent.offsetWidth:parent.offsetHeight;
        const {width: WIDTH, height: HEIGHT} = helper
        Object.assign(container.style,{
            width: `${sm/HEIGHT*WIDTH}px`,
            height: `${sm}px`
        });
    },[container, props])
    return(
        <React.Fragment>
            <div style={{textAlign: "center"}}>
                <div style={{display: "inline-block", margin: "6px", color: helper.colorMap[0]}} >Trống</div>
                <div style={{display: "inline-block", margin: "6px", color: helper.colorMap[1]}} >Đang chạy</div>
                {/* <div style={{display: "inline-block", margin: "6px", color: helper.colorMap[2]}} >Đang tắt</div> */}
                <div style={{display: "inline-block", margin: "6px", color: helper.colorMap[3]}} >Cần thiết</div>
            </div>
            <div className="editSensorMapView block h-100" style={{width:'inherit'}}>
                <div
                    ref={
                        e=>setContainer(e)
                    }
                    className = "matrixContainer w-100"
                    onMouseOver={(event) => helper.handleRuler(container, event)}
                    onMouseOut={()=>helper.removeRuler()}
                />
            </div>
           

            
        </React.Fragment>
    )
}

ViewConfigSensorMap.defaultProps = {
    data: [[]], axis: 'z', min: 0, max: 0,
    onClick: (x, y, hue, temp)=>{console.log(x, y, hue, temp)},
}