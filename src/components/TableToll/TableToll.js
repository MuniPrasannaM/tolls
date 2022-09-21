import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import "./TableToll.scss";
import { useHistory } from "react-router-dom";
import ModalTest from '../../WidgetComponents/Modal/ModalTest';
import { useSelector } from 'react-redux';
function TableToll(props) {
    const history = useHistory();
    const [tollName, setTollName] = useState([]);
    const [selectTollName, setSelectTollName] = useState("All")
    const [searchBox, setSearchBox] = useState("")
    const tollsData = useSelector((state) => state.allTolls.tolls)
    useEffect(() => {
        const datt = ["All"];
        // console.log("props data ",props.data)
        if (tollsData) {
            tollsData.map((dat) => {
                if (dat && datt.indexOf(dat["TOLL NAME"]) === -1) {
                    datt.push(dat["TOLL NAME"]);
                }
            })
        }
        console.log("dattt ", datt);
        setTollName(datt);
    }, [tollsData])
    const onChangeSelectTollName = (value) => {
        setSelectTollName(value);
        props.onFilter(value);
    }
    const changeUrl = () => {
        history.push('/admin/home');
    }
    const onChangeSearch = (e) => {
        setSearchBox(e.target.value);
        props.onSearch(e.target.value);
    }
    return (
        <div className="container">
            <h2 className='h2-table'>{props.title}</h2>
            <div className='row'>
                <div className='column2'>
                    <form action="" class="search-bar">
                        <input type="search" name="search" onChange={onChangeSearch} placeholder='Search Toll' pattern=".*\S.*" required />
                        <button class="search-btn" type="submit">
                            <span>Search</span>
                        </button>

                    </form>
                </div>
                <div className='column1'><button class="button-19" role="button" onClick={changeUrl}>Back to home</button></div>
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
                        {props.data && props.data.map((dat, index) => {
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
            <ModalTest buttonname={"ADD TOLLS"} renderForm={"tolls"} modalWidth={800} appStyle={{ margin: "0px -10% 0px 75%" }} />
        </div>
    )
}

export default TableToll