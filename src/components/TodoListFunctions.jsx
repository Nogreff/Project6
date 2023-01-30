import PropTypes from 'prop-types';
import TodoList from './TodoList';
import timeUpSound from '../assets/sound/timeup1.mp3';
import { useRef, useState } from 'react';

function TodoListFunctions(props) {
	const {
		todoData,
		deleteTodo,
		updateTodo,
		setTodoData,
		timeManager,
		setTimeManager,
	} = props;
	const [todoId, setTodoId] = useState([]);
	const [timeUp, setTimeUp] = useState(false);
	const controlRef = useRef(new Audio(timeUpSound));
	const updateTextRef = useRef([]);
	const textUpdateError = useRef([]);
	const updateTimeRef = useRef([]);
	const timeUpdateError = useRef([]);
	const updateTimeEnable = useRef([]);
	const reftest = useRef(false);
	const timeManagerFormat = {
		timerID: null,
		actualHour: 0,
		actualMinute: 0,
		todoHour: 0,
		todoMinute: 0,
		timeDifference: 0,
		hourDifference: 0,
		minuteDifference: 0,
		timerCount: 0,
	};
	const newTimeManager = () => {
		const newTimeManagerArray = timeManager.push(timeManagerFormat);
		setTimeManager(newTimeManagerArray);
	};
	const updateCheck = id => {
		setTodoId([...todoId, id]);
	};
	const setAlarm = (done, repeat) => {
		if (done === false && repeat === false) {
			controlRef.current.play();
			controlRef.current.loop = true;
			setTimeout(() => (controlRef.current.loop = false), 5000);
		} else if (done === false && repeat === true) {
			controlRef.current.play();
			controlRef.current.loop = true;
		}
	};
	const timeDifferenceCalculation = (timeManagerSetup, index) => {
		timeManagerSetup[index].timeDifference =
			timeManagerSetup[index].todoHour * 60 +
				timeManagerSetup[index].todoMinute >=
			timeManagerSetup[index].actualHour * 60 +
				timeManagerSetup[index].actualMinute
				? timeManagerSetup[index].todoHour * 60 +
				  timeManagerSetup[index].todoMinute -
				  (timeManagerSetup[index].actualHour * 60 +
						timeManagerSetup[index].actualMinute)
				: timeManagerSetup[index].todoHour * 60 +
				  timeManagerSetup[index].todoMinute +
				  1440 -
				  (timeManagerSetup[index].actualHour * 60 +
						timeManagerSetup[index].actualMinute);
		setTimeManager(timeManagerSetup);
	};
	const timeSetup = (index, id, newTimer) => {
		const actualDate = new Date();
		const timeManagerSetup = timeManager;
		timeManagerSetup[index].timerID = id;
		timeManagerSetup[index].actualHour = actualDate.getHours();
		timeManagerSetup[index].actualMinute = actualDate.getMinutes();
		timeManagerSetup[index].todoHour = parseInt(newTimer[0]);
		timeManagerSetup[index].todoMinute = parseInt(newTimer[1]);
		timeDifferenceCalculation(timeManagerSetup, index);
	};
	const timeDifferenceCheck = (id, done, repeat) => {
		const timeManagerSetup = timeManager;
		if (timeManagerSetup[id].timeDifference === 0) {
			timeManagerSetup[id].hourDifference = 0;
			timeManagerSetup[id].minuteDifference = 0;
			timeManagerSetup[id].timerCount = 'time up';
			reftest.current = true;
			setTimeUp(true);
			setAlarm(done, repeat);
		} else if (
			timeManagerSetup[id].actualHour <= timeManagerSetup[id].todoHour &&
			timeManagerSetup[id].timeDifference < 60
		) {
			timeManagerSetup[id].hourDifference = 0;
			timeManagerSetup[id].minuteDifference =
				timeManagerSetup[id].timeDifference;
		} else {
			timeManagerSetup[id].hourDifference = parseInt(
				timeManagerSetup[id].timeDifference / 60
			);
			timeManagerSetup[id].minuteDifference =
				timeManagerSetup[id].timeDifference % 60;
		}
		setTimeManager(timeManagerSetup);
	};
	const timerCalculation = id => {
		const timeManagerSetup = timeManager;
		timeManagerSetup[id].hourDifference =
			timeManagerSetup[id].hourDifference < 10
				? '0' + timeManagerSetup[id].hourDifference
				: timeManagerSetup[id].hourDifference;
		timeManagerSetup[id].minuteDifference =
			timeManagerSetup[id].minuteDifference < 10
				? '0' + timeManagerSetup[id].minuteDifference
				: timeManagerSetup[id].minuteDifference;
	};
	const timeUpCheck = id => {
		const timeManagerSetup = timeManager;
		if (timeManagerSetup[id].timerCount !== 'time up') {
			timeManagerSetup[id].timerCount =
				timeManagerSetup[id].hourDifference +
				':' +
				timeManager[id].minuteDifference;
		}
		setTimeManager(timeManagerSetup);
	};
	const todoCounterManager = (index, id, time, done, repeat) => {
		const newTimer = time.split(':');
		timeSetup(index, id, newTimer);
		timeDifferenceCheck(index, done, repeat);
		timerCalculation(index);
		timeUpCheck(index);
	};
	const countFormat = x => {
		x = x.map((todo, index) => {
			if (todo.time && todo.counter !== 'time up') {
				if (!timeManager[index]) {
					newTimeManager();
				}
				todoCounterManager(index, todo.id, todo.time, todo.done, todo.repeat);
				todo.counter = timeManager[index].timerCount;
			}

			return todo;
		});
		if (x !== todoData) {
			setTodoData(xx => [...xx]);
		}
	};

	const checkUpdatedText = id => {
		if (!updateTextRef.current[id].value) {
			textUpdateError.current[id].classList.add('error');
			updateTextRef.current[id].classList.add('error');
			updateTextRef.current[id].value = '';
		} else {
			textUpdateError.current[id].classList.remove('error');
			updateTextRef.current[id].classList.remove('error');
		}
	};
	const checkUpdatedTime = id => {
		if (
			updateTimeEnable.current[id].checked === false &&
			!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
				updateTimeRef.current[id].value
			)
		) {
			timeUpdateError.current[id].classList.add('error');
			updateTimeRef.current[id].classList.add('error');
			updateTimeRef.current[id].value = '';
		} else if (
			timeUpdateError.current[id].value ||
			(updateTimeEnable.current[id].checked === true &&
				!updateTimeRef.current[id].value)
		) {
			timeUpdateError.current[id].classList.remove('error');
			updateTimeRef.current[id].classList.remove('error');
		}
	};
	const checkUpdatedValues = id => {
		if (
			(updateTextRef.current[id].value && updateTimeRef.current[id].value) ||
			(updateTextRef.current[id].value &&
				updateTimeEnable.current[id].checked === true)
		) {
			setTodoId(todoId.filter(index => index !== id));
		}
	};
	const updatedCheck = id => {
		checkUpdatedText(id);
		checkUpdatedTime(id);
		checkUpdatedValues(id);
	};
	function todoDone(id) {
		const currentData = todoData;
		for (let i = 0; i < todoData.length; i++) {
			if (todoData[i].id === id) {
				currentData[i].done = !currentData[i].done;
			}
		}
		setTodoData([...currentData]);
	}
	return (
		<>
			<TodoList
				todoData={todoData}
				deleteTodo={deleteTodo}
				updateTodo={updateTodo}
				setTodoData={setTodoData}
				updateTextRef={updateTextRef}
				textUpdateError={textUpdateError}
				updateTimeRef={updateTimeRef}
				timeUpdateError={timeUpdateError}
				updateTimeEnable={updateTimeEnable}
				controlRef={controlRef}
				todoId={todoId}
				timeUp={timeUp}
				setTodoId={setTodoId}
				updatedCheck={updatedCheck}
				todoDone={todoDone}
				countFormat={countFormat}
				updateCheck={updateCheck}
			/>
		</>
	);
}
TodoListFunctions.propTypes = {
	todoData: PropTypes.array,
	deleteTodo: PropTypes.func,
	updateTodo: PropTypes.func,
	setTodoData: PropTypes.func,
	timeManager: PropTypes.array,
	setTimeManager: PropTypes.func,
};
export default TodoListFunctions;
