// myplugins/home/index.js

exports.register = function(plugin, options, next) {

    plugin.route({
        method: 'GET',
        path:   '/',
        handler: function(request, reply) {

            reply('Hapi Joi Joi');
        }
    });

    next();
};

exports.register.attributes = {
   name:    'homePlugin',
   version: '0.0.1'
};
