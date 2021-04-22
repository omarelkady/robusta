import React from 'react';

function Header(props) {
    return (
        <div class="header">
            <div class="logo">
                INSTAWEATHER
                  </div>
            <div class="toggle">
                <label class="switch">
                    <input onClick={props.handler} type="checkbox" id="togBtn" />
                    <div class="slider round">
                        <span class="on" value="C">C°</span>
                        <span class="off" value="F">F°</span>
                    </div>
                </label>
            </div>
        </div>
    )
}
export default Header