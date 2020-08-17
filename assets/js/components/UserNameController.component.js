Vue.component('UserNameController', {
	props: {
		userName: String,
	},
	data() {
		 return {
			newUserName: this.userName,
			showNameChangeInput: false,
		}
	},
	methods: {
		openNameChangeInput() {
			this.showNameChangeInput = true;
			this.newUserName = this.userName;
		},
		cancelNameChange() {
			this.newUserName = this.userName;
			this.showNameChangeInput = false;
		},
		submitNameChange() {
			this.$emit('submit-name-change', this.newUserName);
			this.showNameChangeInput = false;
		},
	},
	template: 
	`
		<div id="username-widget">
			<p v-if="!showNameChangeInput">
				Current Username: {{userName}} <button @click="openNameChangeInput">CHANGE USERNAME</button>
			</p>
			<p v-if="showNameChangeInput">
				<input type="text" v-model="newUserName" @keyup.enter="submitNameChange">
				<button @click="cancelNameChange">CANCEL</button>
				<button @click="submitNameChange">SUBMIT</button>
			</p>
		</div>
	`,
});