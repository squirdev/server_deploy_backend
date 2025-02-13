
import {getKLineList} from '@/axios/api.js'

const ByData = {

  NetworkFilter: (data, callback) => {

    console.log('cust data:', data);

    const {Name, Request: {Data: {symbol: [symbolCode]}}} = data;


    const code = symbolCode.substring(0, symbolCode.indexOf('_'));
    console.log("code", code);




    if (Name === 'MinuteChartContainer::RequestMinuteData') {
      getKLineList({code, type: '5m'}).then(res => {
        console.log("res ===>", res);


        const stock = {

        };
        var hqchartData={stock:[stock], code:0 };

      });
    }

  }

};



export default
{
  ByData: ByData
}
