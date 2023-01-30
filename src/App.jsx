import { useState } from 'react';
import './App.css';
import TodoListFunctions from './components/TodoListFunctions';
import TodoSubmit from './components/TodoSubmit';

function App() {
	const [todoData, setTodoData] = useState([]);
	const [timeManager, setTimeManager] = useState([]);

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
	};
	const deleteTodo = todo => {
		setTodoData(todoData.filter(index => index.id !== todo));
		setTimeManager(timeManager.filter(time => time.timerID !== todo));
		console.log(timeManager);
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
			}
		}
	};
	return (
		<div className='App'>
			<h1>ToDo List</h1>
			<TodoSubmit newTodo={newTodo} />
			<TodoListFunctions
				todoData={todoData}
				deleteTodo={deleteTodo}
				updateTodo={updateTodo}
				setTodoData={setTodoData}
				setTimeManager={setTimeManager}
				timeManager={timeManager}
			/>
		</div>
	);
}

export default App;
