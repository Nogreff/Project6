import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import '../css/TodoSubmit.css';

function TodoSubmit(props) {
	const { newTodo } = props;
	const [newInput, setNewInput] = useState('');
	const [newTime, setNewTime] = useState('');
	const [newId, setNewId] = useState(0);
	const inputRef = useRef(null);
	const textError = useRef();
	const timeError = useRef();
	const checkTimeEnable = useRef();
	const checkTimeRepeat = useRef();
	const timeRef = useRef(null);
	const handleText = e => {
		setNewInput(e.target.value);
		if (inputRef.current.validity.valueMissing === false) {
			textError.current.classList.remove('error');
			inputRef.current.classList.remove('error');
		}
	};
	const handleTime = e => {
		setNewTime(e.target.value);
		if (timeRef.current.validity.valueMissing === false) {
			timeError.current.classList.remove('error');
			timeRef.current.classList.remove('error');
		}
	};
	const timeInputEnable = () => {
		if (checkTimeEnable.current.checked === true) {
			timeRef.current.disabled = true;
			timeRef.current.value = '';
			checkTimeRepeat.current.disabled = true;
			checkTimeRepeat.current.checked = false;
			timeError.current.classList.remove('error');
			timeRef.current.classList.toggle('disabled');
		} else {
			timeRef.current.disabled = false;
			checkTimeRepeat.current.disabled = false;
			timeRef.current.classList.toggle('disabled');
		}
	};
	const checkEmptyInput = () => {
		if (!inputRef.current.value) {
			textError.current.classList.add('error');
			inputRef.current.classList.add('error');
			inputRef.current.value = '';
		} else {
			textError.current.classList.remove('error');
			inputRef.current.classList.remove('error');
		}
	};
	const checkTimeFormat = () => {
		if (
			checkTimeEnable.current.checked === false &&
			!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
				timeRef.current.value
			)
		) {
			timeRef.current.classList.add('error');
			timeError.current.classList.add('error');
			timeRef.current.value = '';
		} else if (
			timeRef.current.value ||
			(checkTimeEnable.current.checked === true && !timeRef.current.value)
		) {
			timeError.current.classList.remove('error');
			timeRef.current.classList.remove('error');
		}
	};
	const setNewTodo = () => {
		setNewId(newId => newId + 1);
		newTodo(
			{
				id: newId,
				text: newInput,
				counter: '00:00',
				time:
					(timeRef.current.disabled && timeRef.current.value) ||
					timeRef.current.disabled
						? 'no timer'
						: newTime,
				done: false,
				repeat: checkTimeRepeat.current.checked,
			},
			checkTimeEnable.current
		);
	};
	const checkInputData = () => {
		if (
			(inputRef.current.value && timeRef.current.value) ||
			(inputRef.current.value && checkTimeEnable.current.checked === true)
		) {
			setNewTodo();
			inputRef.current.value = '';
			timeRef.current.value = '';
			setNewInput('');
			setNewTime('');
		}
	};
	const cleanInputs = () => {
		checkTimeEnable.current.checked = false;
		checkTimeRepeat.current.checked = false;
		checkTimeRepeat.current.disabled = false;
		timeRef.current.classList.remove('disabled');
		timeRef.current.disabled = false;
		inputRef.current.focus();
	};
	const handleSubmit = e => {
		e.preventDefault();
		checkEmptyInput();
		checkTimeFormat();
		checkInputData();
		cleanInputs();
	};
	return (
		<form onSubmit={handleSubmit} className='todo_form'>
			<div ref={textError} className='form_text_wrapper'>
				<input
					placeholder='Add a todo'
					onChange={handleText}
					className='form_text'
					ref={inputRef}
					required
				/>
			</div>
			<div className='time_wrapper'>
				<div className='time_options_wrapper'>
					<div ref={timeError} className='form_time_wrapper'>
						<input
							ref={timeRef}
							type='time'
							onChange={handleTime}
							className='form_time'
							pattern='([1]?[0-9]|2[0-3]):[0-5][0-9]'
							required
						/>
					</div>
					<div className='form_timer_options'>
						<span className='check_enable_wrapper'>
							<input
								ref={checkTimeEnable}
								type='checkbox'
								onChange={timeInputEnable}
								className='form_check_enable'
							/>
						</span>
						<span className='check_repeat_wrapper'>
							<input
								ref={checkTimeRepeat}
								type='checkbox'
								className='form_check_repeat'
							/>
						</span>
					</div>
				</div>

				<button onClick={handleSubmit} className='todo_btn'>
					ADD
				</button>
			</div>
		</form>
	);
}

TodoSubmit.propTypes = {
	newTodo: PropTypes.func,
};
export default TodoSubmit;
