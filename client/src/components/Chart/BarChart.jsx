import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
const BarChart=()=>{
    const [data,setData]=useState([])
    const reviews=useSelector(state=>state.reviews)
    const chartConfigs = {
        type: "bar2d", // The chart type
        width: "100%", // Width of the chart
        height: "200", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
          // Chart Configuration
          chart: {
            //Set the chart caption
            xAxisPosition: "right",
            showvalues: 1,
            //Set the theme for your chart
            theme: "fusion"
          },
          // Chart Data
          data: data
        }
    };
    const setConfigure=()=>{
        const countRate=[0,0,0,0,0]
        reviews.commentList.forEach(element => {
            countRate[element.rate-1]+=1
        });
        const data=countRate.map((ele,index)=>{
            return {
                label: `${index+1} stars`,
                value: ele,
                color: "#ffcc00"
            }
        })
        setData(data)
    }
    useEffect(() => {
        setConfigure()
        return () => {
            console.log("clean up chart");
            
        }
    }, [reviews])
    console.log("render chart");
    
    return (
        <div>
            <ReactFC {...chartConfigs} />
        </div>
    )
}

export default BarChart
