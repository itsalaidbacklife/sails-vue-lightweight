const app = new Vue({
	el: '#home',
	data: () => {
		return {
			chatInput: '',
			receivedMessages: [],
			userName: 'anonymous',
			showNameChangeInput: false,
			newUserName: '',
		}
	},
	methods: {
		// Send chat message to server
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
		/**
		 * Changing Username
		 */
		openNameChangeInput() {
			this.showNameChangeInput = true;
			this.newUserName = this.userName;
		},
		submitNameChange() {
			axios.post('name-change', {
				oldUserName: this.userName,
				newUserName: this.newUserName,
			})
			.then(() => {
				this.showNameChangeInput = false;
			})
			.catch();
		},
		cancelNameChange() {
			this.newUserName = this.userName;
			this.showNameChangeInput = false;
		},
	},
	mounted() {
		// Subscribe to socket updates
		io.socket.on('message', (msg) => {
			this.receivedMessages.push(msg);
		});
	},
});