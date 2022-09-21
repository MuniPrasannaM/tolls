import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import vehicles from "../../Mock/Vehicle.json"
function HomePage() {
    const entry = useSelector((state)=> state.allEntry.entry)
    const [tableData, setTableData] = useState([])
    useEffect(()=>{
        setTableData(entry);
    },[entry])
    const onFilter = (e) => {
        if(e === "All")
        {
            setTableData(entry)
        }
        else{
            var dattt = entry.map((dat) => {
                if(dat["TOLL NAME"].toLowerCase().includes(e.toLowerCase())) {
                    return dat
                }
            })
            console.log("dattt ",dattt);
            setTableData(dattt);
        }
        
    }
    const onSearch = (e) => {
        if(e === "" || e === " ")
        {
            setTableData(entry)
        }
        else{
            var dattt = entry.map((dat) => {
                if(dat["VEHICLE NUMBER"].toLowerCase().includes(e.toLowerCase())) {
                    return dat
                }
            })
            console.log("dattt ",dattt);
            setTableData(dattt);
        }
    }
    return (
        <><Table headers={vehicles["headers"]} data={tableData} title={"Toll entries/Vehicles entries"} onFilter={onFilter} onSearch={onSearch}/></>
    )
}

export default HomePage;