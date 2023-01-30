import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import '../css/TodoList.css';

function TodoList(props) {
	const {
		todoData,
		deleteTodo,
		updateTodo,
		updateTextRef,
		textUpdateError,
		updateTimeRef,
		timeUpdateError,
		updateTimeEnable,
		todoId,
		updatedCheck,
		todoDone,
		countFormat,
		timeUp,
		controlRef,
		updateCheck,
	} = props;

	const updateTimeRepeat = useRef([]);
	const counterCheck = useRef(false);
	const resetInterval = useRef();
	const newText = (e, id) => {
		updateTextRef.current[id].value = e.target.value;
		if (updateTextRef.current[id].validity.valueMissing === false) {
			textUpdateError.current[id].classList.remove('error');
			updateTextRef.current[id].classList.remove('error');
		}
	};
	const newTime = (e, id) => {
		updateTimeRef.current[id].value = e.target.value;
		if (updateTimeRef.current[id].validity.valueMissing === false) {
			timeUpdateError.current[id].classList.remove('error');
			updateTimeRef.current[id].classList.remove('error');
		}
	};
	const timeEnabler = id => {
		if (updateTimeEnable.current[id].checked === false) {
			updateTimeRepeat.current[id].disabled = false;
			updateTimeRef.current[id].disabled = false;
			updateTimeRef.current[id].classList.toggle('disabled');
		} else if (updateTimeEnable.current[id].checked === true) {
			updateTimeRepeat.current[id].disabled = true;
			updateTimeRepeat.current[id].checked = false;
			updateTimeRef.current[id].value = '';
			updateTimeRef.current[id].disabled = true;
			updateTimeRef.current[id].classList.toggle('disabled');
			timeUpdateError.current[id].classList.remove('error');
			updateTimeRef.current[id].classList.remove('error');
		}
	};
	useEffect(() => {
		if (todoData.length > 0) {
			clearInterval(resetInterval.current);
			resetInterval.current = setInterval(() => countFormat(todoData), 1000);
			counterCheck.current = true;
		} else if (todoData.length === 0) {
			clearInterval(resetInterval.current);
			counterCheck.current = false;
		}
	}, [todoData]);
	return (
		<div>
			{todoData.map((value, index) => {
				console.log(value.id);
				return timeUp === true && value.counter === 'time up' ? (
					<div className='todo_now' key={value.id}>
						<a>{value.text}</a>
						<a
							className='todo_now_btn'
							onClick={() => {
								controlRef.current.pause();
								controlRef.current.loop = false;
								deleteTodo(value.id);
							}}
						>
							Done
						</a>
					</div>
				) : todoId.some(index => index === value.id) ? (
					<div className='todo_update' key={value.id}>
						<div
							ref={index => (textUpdateError.current[value.id] = index)}
							className='text_updated_wrapper'
						>
							<input
								ref={index => (updateTextRef.current[value.id] = index)}
								onChange={e => newText(e, value.id)}
								className='text_updated'
								defaultValue={value.text}
								required
							/>
						</div>
						<div className='update_time_wrapper'>
							<div className='update_time_options_wrapper'>
								<div
									ref={index => (timeUpdateError.current[value.id] = index)}
									className='time_updated_wrapper'
								>
									<input
										ref={index => (updateTimeRef.current[value.id] = index)}
										defaultValue={value.time !== 'no timer' && value.time}
										type='time'
										onChange={e => newTime(e, value.id)}
										min='00:00'
										max='23:59'
										step='2'
										required
									/>
								</div>
								<div className='update_timer_options'>
									<span className='update_enable_wrapper'>
										<input
											ref={index =>
												(updateTimeEnable.current[value.id] = index)
											}
											type='checkBox'
											onChange={() => timeEnabler(value.id)}
											className='time_check_enable'
										/>
									</span>
									<span className='update_repeat_wrapper'>
										<input
											ref={index =>
												(updateTimeRepeat.current[value.id] = index)
											}
											type='checkBox'
											className='time_check_repeat'
										/>
									</span>
								</div>
							</div>

							<button
								className='updated_btn'
								onClick={() => {
									updateTodo(
										value.id,
										updateTextRef.current[value.id].value,
										updateTimeRef.current[value.id].value,
										updateTimeRepeat.current[value.id],
										updateTimeEnable.current[value.id]
									);
									updatedCheck(value.id);
								}}
							>
								Update
							</button>
						</div>
					</div>
				) : (
					<div
						className={value.done === true ? 'todo_info done' : 'todo_info'}
						key={value.id}
					>
						<a className={value.done === true ? 'todo_text done' : 'todo_text'}>
							{value.text}
						</a>
						<span
							className={
								value.repeat === true
									? 'repeat_sound'
									: value.time === 'no timer'
									? 'no_sound'
									: null
							}
						>
							<a>{value.time === 'no timer' ? '' : value.time}</a>
						</span>
						<div className='todo_info_options'>
							<a
								className={
									value.done === true ? 'todo_info_done done' : 'todo_info_done'
								}
								onClick={() => todoDone(value.id)}
							></a>
							<a id='todo_info_delete' onClick={() => deleteTodo(value.id)}></a>
							<a
								id='todo_info_update'
								onClick={() => updateCheck(value.id)}
							></a>
						</div>
					</div>
				);
			})}
		</div>
	);
}

TodoList.propTypes = {
	todoData: PropTypes.array,
	deleteTodo: PropTypes.func,
	updateTodo: PropTypes.func,
	setTodoData: PropTypes.func,
	updateTextRef: PropTypes.object,
	textUpdateError: PropTypes.object,
	updateTimeRef: PropTypes.object,
	timeUpdateError: PropTypes.object,
	updateTimeEnable: PropTypes.object,
	todoId: PropTypes.array,
	setTodoId: PropTypes.func,
	updatedCheck: PropTypes.func,
	todoDone: PropTypes.func,
	countFormat: PropTypes.func,
	controlRef: PropTypes.object,
	timeUp: PropTypes.bool,
	updateCheck: PropTypes.func,
	deleteTimeManager: PropTypes.func,
};
export default TodoList;
