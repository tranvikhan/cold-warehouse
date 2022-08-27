import React, {
    // eslint-d.isable-next-line
    useState, useEffect, useRef
} from 'react';

const HueBar = (props) => {
    const [pointer, setPointer] = useState(240);
    const eBar = useRef();
    const eMin = useRef();
    const eMax = useRef();
    const ePointer = useRef();
    const prePtr = useRef(240);

    useEffect(()=>{
        const makeTable = (element) => {
            let tableBar = document.createElement('table')
            tableBar.setAttribute("width",props.width);
            tableBar.setAttribute("height",props.height);
            tableBar.setAttribute("style","border-spacing: 0;");
            element.appendChild(tableBar);
    
            let row = document.createElement('tr');
            tableBar.appendChild(row);
    
            for (let ii = 240; ii>=0; ii--){
                let cell = document.createElement('td');
                cell.setAttribute("id", "td_"+ii);
                cell.setAttribute("width", "auto");
                cell.setAttribute("height", "100%");
                cell.setAttribute("style","padding: 0; background-color: hsl("+ii+",100%,50%);");
                cell.onclick = () => {
                    document.getElementById("td_"+prePtr.current)
                        .setAttribute("style","padding: 0; background-color: hsl("+prePtr.current+",100%,50%);");
                    setPointer(ii);
                    cell.setAttribute("style","padding: 0; background-color: #000");
                    prePtr.current = ii;
                };
                row.appendChild(cell);
            }
        }

        eBar.current = document.getElementById("hueBar");

        makeTable(eBar.current)

        eMin.current = document.createElement('div');
        eMin.current.innerText = props.min;
        eMin.current.setAttribute("style","float: left;")
        eBar.current.appendChild(eMin.current);

        eMax.current = document.createElement('div');
        eMax.current.innerText = props.max;
        eMax.current.setAttribute("style","float: right;")
        eBar.current.appendChild(eMax.current);

        ePointer.current = document.createElement('div');
        ePointer.current.setAttribute("style", "margin: auto; width: 5em; ");
        eBar.current.appendChild(ePointer.current);
        // eslint-disable-next-line
    },[]);

    useEffect(()=>{
        eMin.current.innerText = props.min;
        eMax.current.innerText = props.max;
    },[props.min, props.max])

    useEffect(()=>{
        const hue2temp = (hue) => {
            return (props.max-hue/240*(props.max-props.min)).toFixed(2);
        }
        ePointer.current.innerHTML = hue2temp(pointer);
        // eslint-disable-next-line
    }, [pointer])

    return(
        <div id="hueBar">
        </div>
    );
}
export default HueBar;