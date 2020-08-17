const app = new Vue({
	el: '#home',
	data: () => {
		return {
			chatInput: '',
			receivedMessages: [],
			userName: 'anonymous',
			anonymousUserNameOptions: ['cheetah', 'snake', 'mammoth', 'moose', 'jackrabbit', 'hippo', 'dance-master', 'hooligan', 'whippersnapper'],
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
				this.userName = this.newUserName;
			})
			.catch();
		},
		cancelNameChange() {
			this.newUserName = this.userName;
			this.showNameChangeInput = false;
		},
	},
	mounted() {
		// Randomize anonymous username e.g. 'anonymous hippo'
		const anonymousAnimal = this.anonymousUserNameOptions[Math.floor(Math.random() * this.anonymousUserNameOptions.length)];
		this.userName = `anonymous ${anonymousAnimal}`;
		// Subscribe to socket updates
		io.socket.on('message', (msg) => {
			this.receivedMessages.push(msg);
		});
	},
});