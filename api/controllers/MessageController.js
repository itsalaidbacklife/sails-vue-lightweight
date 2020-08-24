/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	// Blast client message to all sockets
	newMessage(req, res) {
		sails.sockets.blast('message', {
			userName: req.body.userName,
			messageText: req.body.messageText,
		});
		return res.ok();
	},

	// Blast client's username change
	nameChange(req, res) {
		sails.sockets.blast('message', {
			userName: 'SYSTEM',
			messageText: `${req.body.oldUserName} has changed their name to ${req.body.newUserName}`
		});
		return res.ok();
	}

};

