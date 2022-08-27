import React, {
    useState,
    useEffect,
    useRef
} from 'react';

class hueBarHelper{
    constructor(props){
        this.eBar = this.createElement('div');
        this.eMin = this.createElement('div',{
            innerText: Math.round(props.min*100)/100 +' °C',
            style: `float: left;`,
        });
        this.eBar.appendChild(this.eMin);

        this.eMax = this.createElement('div',{
            innerText: Math.round(props.max *100)/100 +' °C',
            style: `float: right;`,
        });
        this.eBar.appendChild(this.eMax);

        this.ePointer = this.createElement('div',{
            innerHTML: Math.round((props.max+props.min)/2 *100)/100 +' °C',
            style: `margin: auto; width: 5em;`,
        });
        this.eBar.appendChild(this.ePointer);

        this.width = props.width + (isNaN(props.width)?'':'px');
        this.height = props.height + (isNaN(props.height)?'':'px');
        this.min = props.min;
        this.max = props.max;
        this.cell = [];
        this.previousSelected = 0;
    }
    updateExtreme(min, max){
        this.min = min;
        this.max = max;
        this.eMin.innerText = Math.round(min *100)/100 +' °C';
        this.eMax.innerText = Math.round(max *100)/100 +' °C';
    }
    createElement(tagName, attribute = {}){
        let e = document.createElement(tagName);
        Object.assign(e, attribute);
        return e;
    }
    makeTable(parent){
        const tableBar = this.createElement('table',{
            style: `border-spacing: 0;
                width:${this.width};
                height:${this.height};`
        });
        parent.appendChild(tableBar);
        parent.appendChild(this.eBar);

        const row = this.createElement('tr');
        tableBar.appendChild(row);
        this.cell = [];
        for (let ii = 240; ii >= 0; ii--) {
            let eCell = this.createElement('td',{
                width: "auto",
                height: "100%",
                style: `padding: 0;
                    background-color: ${this.hsl(ii)}`,
                onclick: ()=> this.onCellClick(ii),
            });
            this.cell.unshift(eCell);
            row.appendChild(eCell);
        }
    }
    onCellClick(index){
        //restore previous selected cell's color
        let pre = this.previousSelected;
        this.cell[pre].style.background = this.hsl(pre);

        //make selected turn into black
        let e = this.cell[index];
        e.style.background = "#000";
        this.previousSelected = index;

        //update new temperature for middle label
        this.ePointer.innerText = this.hue2temp(index) +' °C';
    }
    hue2temp(hue, min = this.min, max = this.max){
        return (max - hue / 240 * (max - min)).toFixed(2);
    }
    hsl(hue, saturation = "100%", lightness = "50%"){
        return `hsl(${hue},${saturation},${lightness})`;
    }
    temp2hue(temp, min = this.min, max = this.max){
        return Math.trunc(240 - 240 * (temp - min) / (max - min));
    }
}

const HueBar = (props) => {
    const [e, setElement] = useState(document.createElement('p'));
    const helper = useRef(null);

    useEffect(()=>{
        helper.current = new hueBarHelper(props);
        props.markCell.current = helper.current.onCellClick.bind(helper.current);
    },[])

    useEffect(() => {
        helper.current.updateExtreme(props.min, props.max);
    }, [props.min, props.max])

    useEffect(() => {
        helper.current.makeTable(e);
    }, [e]);

    return (
        <div ref = {e => setElement(e)}/>
    );
}

HueBar.defaultProps = {
    min: 0,
    max: 7749,
    width: "100%",
    height: 10,
    markCell: {
        current: 0
    }
}

export default HueBar;