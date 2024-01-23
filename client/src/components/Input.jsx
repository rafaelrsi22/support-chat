import React, { useState } from "react";
import DataInfo from "../lib/FormDataType";

export default function Input(props) {
    const [warnVisible, setWarnVisibility] = useState(false);

    const {dataType} = props;
    const inputId = dataType + '-form';
    const inputInfo = DataInfo[dataType];

    if (!inputInfo) {
        throw 'Wrong data type input passed!';
    }

    return (
        <div className="mt-5">
            <label htmlFor={inputId} className="block text-base font-medium leading-6 text-gray-900 uppercase">
                {inputInfo.label}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                </div>
                <input
                type={inputInfo.input}
                name={inputInfo.name}
                id={inputId}
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={inputInfo.placeholder}
                onChange={(e) => {
                    setWarnVisibility(false);
                    props.onChange(e.target.value)
                }}
                onInvalid={(e) => {
                    e.preventDefault();
                    setWarnVisibility(true);
                }}
                required
                />
            </div>
            <small className={"text-red-500 font-semibold text-xs font-medium leading-6 text-gray-900 uppercase " + (warnVisible ? 'block' : 'hidden')}>
                Invalid input!
            </small>
        </div>
    )
  }