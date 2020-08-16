const app = new Vue({
	el: '#home',
	data: () => {
		return {
			chatInput: '',
			receivedMessages: [],
			userName: 'anonymous',
		}
	},
	methods: {
		submitChat() {
			axios.post('submit-chat', {
				messageText: this.chatInput,
				userName: this.userName
			})
			.then(() => {
				this.chatInput = '';
			})
			.catch(() => {
				this.chatInput = '';
			});
		},
	},
	mounted() {
		io.socket.on('message', (msg) => {
			console.log("received message from server: ");
			console.log(msg);
			this.receivedMessages.push(msg);
		});
	},
});