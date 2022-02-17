/**
 * Mail Functions
 */

// Dependencies
const { htmlToText } = require('html-to-text');
const templates = require('./templates');

/**
 * @description Callback function after sending email
 * @param {object} error Error object, in case of error while sending mail
 * @param {object} data Success object
 */
exports.mailCallback = (error, data) => {
    if (!error) return;
    console.log(`Error sending email, ${error}`);
};

/**
 * @description Creates a mail config object with param details
 * @param {string} to To whom the email is to be sent
 * @param {string} subject Subject of the email
 * @param {string} html Content of the email
 * @returns {object} Mail config object
 */
exports.mailConfig = ({ to = '', subject = '', html = '' }) => {
	const config = {
		to,
		subject,
		html,
	};
	return config;
};


/**
 * @description Takes a file, converts to html and text
 * @param {string} template Template that needs to be rendered
 * @param {object} options Rendering Options
 * @returns {object} {html, text}
 */
exports.generateHtmlAndText = (template = '', options = {}) => {
	const html = templates[template](options)
	const text = htmlToText(html);
	return { html, text };
};