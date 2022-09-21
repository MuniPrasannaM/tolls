import React from 'react'
import "./EntryForm.scss"
function EntryForm() {
    return (
        <div>
            <form>
                <select name="menu" id="meun-items">
                    <option disabled selected>Select Cource</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="js">JAVASCRIPT</option>
                    <option value="c">C LANGUAGE</option>
                </select>
            </form>

            
        </div>
    )
}

export default EntryForm