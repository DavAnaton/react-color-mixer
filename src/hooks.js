import {useState} from 'react';

const useInput = (initialValue, onChange) => {
	const [value, setValue] = useState(initialValue);
	return {value, onChange: (event) => {
		setValue(event?.target?.value);
		onChange && onChange(event?.target?.value);
	}};
};
export {useInput};

const useRange = (initialValue, onChange) => {
	const [value, setValue] = useState(initialValue);
	return {value, onChange: (event) => {
		setValue(parseInt(event?.target?.value));
		onChange && onChange(parseInt(event?.target?.value));
	}};
};
export {useRange};