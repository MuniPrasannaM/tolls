import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import ModalTest from '../../WidgetComponents/Modal/ModalTest';
import "./Table.scss";
function Table(props) {
    const history = useHistory();
    const [tollName, setTollName] = useState([]);
    const [selectTollName, setSelectTollName] = useState("All")
    const [searchBox, setSearchBox] = useState("")
    const entry = useSelector((state)=> state.allEntry.entry)
    useEffect(() => {
        const datt = ["All"];
        entry.map((dat) => {
            if (datt.indexOf(dat["TOLL NAME"]) === -1) {
                datt.push(dat["TOLL NAME"]);
            }
        })
        console.log("dattt ", datt);
        setTollName(datt);
    }, [entry])
    const onChangeSelectTollName = (value) => {
        setSelectTollName(value);
        props.onFilter(value);
    }
    const onChangeSearch = (e) => {
        setSearchBox(e.target.value);
        props.onSearch(e.target.value);
    }
    const changeUrl = () => {
        history.push('/admin/tolls');
    }
    return (
        <>
            <div className="container">
                <h2 className='h2-table'>{props.title}</h2>
                <div className='row'>

                    <div className='column2'>
                        <form action="" class="search-bar">
                            <input type="search" name="search" onChange={onChangeSearch} placeholder='Search Vehicle Number' pattern=".*\S.*" required />
                            <button class="search-btn" type="submit">
                                <span>Search</span>
                            </button>

                        </form>
                    </div>
                    <div className='column1'><button class="button-19" role="button" onClick={changeUrl}>View Tolls</button></div>
                    <div className='column'>
                        <div className='filter-icon'>
                            <div class="dropdown">
                                <span><img src="https://www.svgrepo.com/show/61952/filter-filled-tool-symbol.svg" height={"25px"} width={"25px"} /></span>
                                <div class="dropdown-content">
                                    {/* <p ><span>&#10003;</span> All</p> */}
                                    {tollName.map((dat, index) => {
                                        return (
                                            <p onClick={() => onChangeSelectTollName(dat)}><span className={(dat === selectTollName) ? 'spanTick' : 'hideTick'}>&#10003;</span> {dat}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <ul className="responsive-table">
                        <li className=" li-table" id='table-header'>
                            {props.headers.map((header, index) => {
                                return (
                                    <div className="col col-1">{header}</div>
                                )

                            })}
                        </li>
                        <div className='li-overflow'>
                            {props.data.map((dat, index) => {
                                return (<>
                                    {dat && <li className="table-row li-table">
                                        {Object.keys(dat).map((key, index1) => {
                                            return (
                                                <div className="col col-1" data-label={key}>{dat[key]}</div>
                                            )
                                        })}
                                    </li>}
                                </>


                                )
                            })}
                        </div>
                    </ul>
                </div>
                <div className='row'>
                    <div className='col-1'>
                        <ModalTest buttonname={"ADD NEW TOLL"} renderForm={"tolls"} modalWidth={800} appStyle={{margin: "0px 60% 0px 4%"}} />
                    </div>
                    <div className='col-3'>
                        <ModalTest buttonname={"ADD NEW ENTRY"} renderForm={"entry"} modalWidth={500} appStyle={{margin:"-43px -10% 0px 75%"}}/>
                    </div>
                    
                </div>
            </div>

        </>
    )
}

export default Table