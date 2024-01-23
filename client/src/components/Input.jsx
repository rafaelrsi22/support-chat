import DataInfo from "../lib/FormDataType";
import { useDispatch, useSelector } from "react-redux";

import { alertActions } from "../reducers/AlertReducer";

export default function Input(props) {
    const dispatch = useDispatch();
    const {dataType} = props;
    const inputInfo = DataInfo[dataType];

    if (!inputInfo) {
        throw 'Wrong data type input passed!';
    }

    return (
        <div className="mt-5">
            <label htmlFor="email-form" className="block text-sm font-medium leading-6 text-gray-900 uppercase">
                {inputInfo.label}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                </div>
                <input
                type={inputInfo.input}
                name={inputInfo.name}
                id={dataType + '-form'}
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={inputInfo.placeholder}
                onChange={(e) => props.onChange(e.target.value)}
                onInvalid={(e) => {
                    e.preventDefault();
                    dispatch(alertActions.createAlert('Invalid ' + inputInfo.name, 'Please, verify input data and try again!'));
                }}
                required
                />
            </div>
        </div>
    )
  }