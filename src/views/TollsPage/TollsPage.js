import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TableToll from '../../components/TableToll/TableToll';
import vehicles from "../../Mock/Tolls.json"
function TollsPage() {
    
    const tolls = useSelector((state)=> state.allTolls.tolls)
    const [tableData, setTableData] = useState()
    useEffect(()=>{
        setTableData(tolls);
    },[tolls])
    
    const onFilter = (e) => {
        if(e === "All")
        {
            setTableData(tolls)
        }
        else{
            var dattt = tolls.map((dat) => {
                if(dat["TOLL NAME"].toLowerCase().includes(e.toLowerCase())) {
                    return dat
                }
            })
            console.log("dattttt ",dattt);
            setTableData(dattt);
        }
        
    }
    const onSearch = (e) => {
        if(e === "" || e === " ")
        {
            setTableData(tolls)
        }
        else{
            var dattt = tolls.map((dat) => {
                if(dat["TOLL NAME"].toLowerCase().includes(e.toLowerCase())) {
                    return dat
                }
            })
            console.log("dattt ",dattt);
            setTableData(dattt);
        }
    }
    return (
        <><TableToll headers={vehicles["headers"]} data={tableData} title={"Tollgate List"} onFilter={onFilter} onSearch={onSearch}/></>
    )
}

export default TollsPage;