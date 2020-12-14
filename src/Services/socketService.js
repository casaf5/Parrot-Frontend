import io from 'socket.io-client';

const ENDPOINT = process.env.NODE_ENV === 'production' ? '/' : '//localhost:3030';
const socket = io(ENDPOINT);

function on(eventName, cb) {
	socket.on(eventName, cb);
}

function emit(eventName, data, cb) {
	socket.emit(eventName, data, cb);
}

export const socketService = {
	on,
	emit,
};
