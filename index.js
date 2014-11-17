var port = process.env.PORT;
var db = process.env.DB;
var Hapi = require('hapi');
var server = new Hapi.Server(port);
var Joi = require('joi');
var mongoose = require('mongoose');
var Task;
var Priority;

mongoose.connect(db);

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, user! Welcome to your To Do List!');
    }
});

server.route({
    method: 'GET',
    path: '/about',
    handler: function (request, reply) {
        reply('About Page');
    }
});

server.route({
    method: 'GET',
    path: '/tasks',
    handler: function (request, reply) {
        reply('Tasks Page');
    }
});

server.route({
    method: 'GET',
    path: '/priorities',
    handler: function (request, reply) {
        reply('Priorities Page');
    }
});

server.route({
    method: 'POST',
    path: '/tasks',
    handler: function (request, reply) {
        reply(encodeURIComponent(request.params.tasks));
    },
    config: {
        validate: {
            params: {
                name: Joi.string().min(3).max(7)
            },
            query: {
                limit: Joi.number().required().min(9)
            }
        }
    }
});

server.route({
    method: 'POST',
    path: '/priorities',
    handler: function (request, reply) {
        reply(encodeURIComponent(request.body.priorities));
    },
    config: {
        validate: {
            params: {
                name: Joi.string().min(3).max(7)
            },
            query: {
                limit: Joi.number().required().min(9)
            }
        }
    }
});

server.pack.register(
    [
        {plugin: require('good'),
            options: {
                reporters: [{
                    reporter: require('good-console'),
                    args:[{ log: '*', request: '*' }]
                }]
            }
        },
        { plugin: require('lout')}
    ], function (err) {
        if (err) {
            throw err; // something bad happened loading the plugin
        }

        server.start(function () {
            server.log('info', 'Server running at: ' + server.info.uri);
        });
    });