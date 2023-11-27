import React from 'react';
import classes from './MyCheckBox.module.css'

const MyCheckBox = (props) => {
    return (
        <div>
            <label className={classes.myLabel}>
                <input type="checkbox" className={classes.myInput}/>
                {props.text}
            </label>
        </div>
    );
};

export default MyCheckBox;