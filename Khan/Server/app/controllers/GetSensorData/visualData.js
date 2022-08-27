const xlsxFile = require('read-excel-file/node');
exports.Get = async function (index){
   return await xlsxFile('./app/controllers/GetSensorData/Data7ngay.xlsx').then(rows=>{
        let DataArray = new Array();
        for(let i=index;i<=index+18;i++){
            DataArray.push({
                data_id: 3078057,
                station_id: 8,
                datatype_id: String(rows[i][0]),
                sink_id: null,
                pond_id: 21,
                river_id: null,
                data_value: rows[i][2],
                data_createdDate: String(rows[i][1]),
                data_stationType: 1,
                threshold_level: 0
            })
        }

        return {
            Error:false,
            Message:"Success",
            data: DataArray,
            length: DataArray.length,
        }

    }).catch(err=>{
        return {
            Error:true,
            Message:err,
            data:null,
            length:null
        }
    });
};

