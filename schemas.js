const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.memeSchema = Joi.object({
    meme: Joi.object({
        title: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        image: Joi.required()
    }).required()
});

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        likes: Joi.number(),
        body: Joi.string().required().escapeHTML()
    }).required()
})
