import { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoListFunctions from './components/TodoListFunctions';
import TodoSubmit from './components/TodoSubmit';
import TodoMessage from './components/TodoMessage';
function App() {
	const [todoData, setTodoData] = useState([]);
	const [timeManager, setTimeManager] = useState([]);
	const [latestTimeID, setLatestTimeID] = useState(null);
	const todoMessage = useRef();
	const newTodo = (todo, timeDisabled) => {
		if (
			!todo.text ||
			/^\s*$/.test(todo.text) ||
			(!todo.time && timeDisabled.checked === false)
		) {
			return;
		}
		const newRegister = [todo, ...todoData];
		setTodoData(newRegister);
		if (timeDisabled.checked === false && todoData !== undefined) {
			setTimeout(() => {
				timerMessage(0);
			}, 1000);
		}
	};
	const deleteTodo = todo => {
		setTodoData(todoData.filter(index => index.id !== todo));
		setTimeManager(timeManager.filter(time => time.timerID !== todo));
	};
	const updateTodo = (todoId, newTxt, newTime, newRepeat, updateCheck) => {
		if (
			!newTxt ||
			/^\s*$/.test(newTxt) ||
			(!newTime && updateCheck.checked === false)
		) {
			return;
		}
		const todoUpdate = todoData;
		for (let i = 0; i < todoData.length; i++) {
			if (todoData[i].id === todoId) {
				todoUpdate[i].text = newTxt;
				todoUpdate[i].time =
					!newTime || updateCheck.checked === true ? 'no timer' : newTime;
				todoUpdate[i].counter = '00:00';
				todoUpdate[i].repeat = newRepeat.checked;
				setTodoData(todoUpdate);
				if (updateCheck.checked === false) {
					setTimeout(() => {
						timerMessage(i);
					}, 1000);
				}
			}
		}
	};
	useEffect(() => {}, [todoData]);
	const timerMessage = id => {
		setLatestTimeID(id);
		todoMessage.current.classList.add('show');
		setTimeout(() => {
			todoMessage.current.classList.remove('show');
		}, 8000);
	};
	return (
		<div className='App'>
			<h1>ToDo List</h1>
			<TodoSubmit newTodo={newTodo} timerMessage={timerMessage} />
			<TodoListFunctions
				todoData={todoData}
				deleteTodo={deleteTodo}
				updateTodo={updateTodo}
				setTodoData={setTodoData}
				setTimeManager={setTimeManager}
				timeManager={timeManager}
			/>
			<TodoMessage
				todoData={todoData}
				todoMessage={todoMessage}
				latestTimeID={latestTimeID}
			/>
		</div>
	);
}

export default App;
