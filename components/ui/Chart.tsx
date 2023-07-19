import { Card, Title, LineChart, BarChart } from "@tremor/react";
export default function Chart({
  data,
  chartType,
}: {
  data: any[];
  chartType: string;
}) {
    const test = [{"name":"2010","ExportGrowth":2.2,"ImportGrowth":3.6,"GDP":14.4},{"name":"2011","ExportGrowth":4.1,"ImportGrowth":4.5,"GDP":15.3},{"name":"2012","ExportGrowth":3.8,"ImportGrowth":3.1,"GDP":16.0},{"name":"2013","ExportGrowth":4.3,"ImportGrowth":0.2,"GDP":16.9},{"name":"2014","ExportGrowth":2.9,"ImportGrowth":-1.4,"GDP":17.6},{"name":"2015","ExportGrowth":3.3,"ImportGrowth":-2.3,"GDP":18.2},{"name":"2016","ExportGrowth":1.3,"ImportGrowth":-2.9,"GDP":18.6},{"name":"2017","ExportGrowth":3.9,"ImportGrowth":2.0,"GDP":19.1},{"name":"2018","ExportGrowth":2.7,"ImportGrowth":3.9,"GDP":19.5},{"name":"2019","ExportGrowth":2.1,"ImportGrowth":3.2,"GDP":20.1},{"name":"2020","ExportGrowth":0.6,"ImportGrowth":-2.4,"GDP":21.0},{"name":"2021","ExportGrowth":3.5,"ImportGrowth":1.5,"GDP":21.4}]
    const value = data.length > 0 ? Object.keys(data[0])[1] : 'value'; // returns array of keys in an object
    console.log(Object.keys(data[0]));
    const values = data.length > 0 ? (Object.keys(data[0]).slice(1, Object.keys(data[0]).length)) : ['value'];


    const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}`;
    //data = [{"name": "January", "Covid-19 Deaths": 150}, {"name": "February", 'Covid-19 Deaths': 510}, {"name": "March", 'Covid-19 Deaths': 1250}, {"name": "April", 'Covid-19 Deaths': 2550}, {"name": "May", 'Covid-19 Deaths': 3500}, {"name": "June", 'Covid-19 Deaths': 4000}, {"name": "July", 'Covid-19 Deaths': 4200}]
    //console.log(data[0]);
    return (
    <div>
      <LineChart
            className="h-[300px]"
            data={data}
            index="name"
            categories={values}
            colors={['blue']}
            showLegend={true}
            valueFormatter={dataFormatter}
          />
    </div>
  );
}
