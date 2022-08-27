import Matrix from 'components/matrix/matrix.js';
import MySlice from 'components/MySlice';
import React from 'react';

const  MatrixChart = (props) =>{

    return (props.data && props.config ) && 
    <React.Fragment>
      <Matrix 
        data={props.data} 
        config={props.config}
      />
    </React.Fragment>
}
export default MatrixChart;