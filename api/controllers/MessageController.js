/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
	subscribeAll(req, res) {

	},

	newMessage(req, res) {
		console.log("\nreceived new message");
		console.log(req.body);
		console.log(req.body.userName);
		console.log(req.body.messageText);
		// if (req.isSocket) {
		// }
		sails.sockets.blast('message', {
			userName: req.body.userName,
			messageText: req.body.messageText,
		});
		return res.ok();
	},

};

