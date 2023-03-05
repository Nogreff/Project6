import '../css/TodoMessage.css';
import PropTypes from 'prop-types';

function TodoMessage(props) {
	const { todoData, todoMessage, latestTimeID } = props;
	let splitCounter = [];
	if (todoData[latestTimeID] !== undefined) {
		splitCounter = todoData[latestTimeID].counter.slice().split(':');
		for (let x = 0; x < splitCounter.length; x++) {
			splitCounter[x] = splitCounter[x].split('');
			if (splitCounter[x][0] === '0') {
				splitCounter[x].shift();
			}
			splitCounter[x] = splitCounter[x].join('');
		}
	}
	return (
		<div className='todo_message' ref={e => (todoMessage.current = e)}>
			<p>
				{todoData[latestTimeID] !== undefined && splitCounter[0] !== '0'
					? 'Timer will go off in ' +
					  splitCounter[0] +
					  ' hour(s) and ' +
					  splitCounter[1] +
					  ' minute(s).'
					: 'Timer will go off in ' + splitCounter[1] + ' minute(s).'}
			</p>
		</div>
	);
}
TodoMessage.propTypes = {
	todoData: PropTypes.array,
	todoMessage: PropTypes.object,
	latestTimeID: PropTypes.number,
};
export default TodoMessage;
