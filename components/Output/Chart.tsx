import { Card, Title, LineChart, BarChart, AreaChart, DonutChart } from "@tremor/react";
import { ChartType } from "../../types"
export default function Chart({
  data,
  chartType,
}: {
  data: any[];
  chartType: ChartType;
}) {
    console.log(Object.keys(data[0]));
    const values = data.length > 0 ? (Object.keys(data[0]).slice(1, Object.keys(data[0]).length)) : ['value'];


    const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}`;
    const valueFormatter = (number: number) => `$ ${Intl.NumberFormat("us").format(number).toString()}`;
    //data = [{"name": "January", "Covid-19 Deaths": 150}, {"name": "February", 'Covid-19 Deaths': 510}, {"name": "March", 'Covid-19 Deaths': 1250}, {"name": "April", 'Covid-19 Deaths': 2550}, {"name": "May", 'Covid-19 Deaths': 3500}, {"name": "June", 'Covid-19 Deaths': 4000}, {"name": "July", 'Covid-19 Deaths': 4200}]
    //console.log(data[0]);
    const chartRender = () => {
      switch(chartType.chartType.toLowerCase()) {
        case 'bar':
          return (
            <BarChart
              className="h-[300px]"
              data={data}
              index="name"
              categories={values}
              colors={['blue', 'red', 'violet', 'slate', 'green']}
              showLegend={true}
              valueFormatter={dataFormatter}
            />
          );
          case 'area':
          return (
            <AreaChart
              className="h-[300px]"
              data={data}
              index="name"
              categories={values}
              colors={['blue']}
              showLegend={true}
              valueFormatter={dataFormatter}
            />
          );
          case 'line':
          return (
            <LineChart
              className="h-[300px]"
              data={data}
              index="name"
              categories={values}
              colors={['blue']}
              showLegend={true}
              valueFormatter={dataFormatter}
            />
          );
          case 'pie':
          return (
            <DonutChart
              className="h-[300px]"
              data={data}
              index="name"
              category={values[0]}
              colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
              // showLegend={true}
              
              valueFormatter={dataFormatter}
            />
          );
          case 'scatter':
          return (
            <LineChart
              className="h-[300px]"
              data={data}
              index="name"
              categories={values}
              colors={['blue']}
              showLegend={true}
              valueFormatter={dataFormatter}
            />
          );
          
          

      }
    }

    return (
      <div>
        {chartRender()}
      </div>
    )
}
