var Hapi = require('hapi'),
    path = require('path'),
    nodemailer = require('nodemailer'),
    config = require('./mailerconfig'),
    port = process.env.PORT || 3000,
    server = new Hapi.Server(port),
    routes = {
        css: {
            method: 'GET',
            path: '/css/{path*}',
            handler: createDirectoryRoute('css')
        },
        js: {
            method: 'GET',
            path: '/js/{path*}',
            handler: createDirectoryRoute('js')
        },
        images: {
            method: 'GET',
            path: '/images/{path*}',
            handler: createDirectoryRoute('images')
        },
        templates: {
            method: 'GET',
            path: '/templates/{path*}',
            handler: createDirectoryRoute('templates')
        },
        contact: {
            method: 'POST',
            path: '/contact',
            handler: function (request, reply) {
                var name = request.payload.name,
                    email = request.payload.email,
                    message = request.payload.message;

                // do stuff that the site says
                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: config.user,
                        pass: config.pass
                    }
                });

                var mailOptions = {
                    from: 'Contact Me <kelly.c.talley@gmail.com>', // sender address
                    to: 'kelly.c.talley@gmail.com', // list of receivers
                    replyTo: name + ' <' + email + '>',
                    subject: '[Contact Me] Hello', // Subject line
                    text: message
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        reply(error).code(500);
                    } else {
                        console.log('Message sent: ' + info.response);
                        reply('Your message has been sent! Thanks!').code(200);
                    }
                });  
            }
        },
        spa: {
            method: 'GET',
            path: '/{path*}',
            handler: {
                file: path.join(__dirname, '/dist/index.html')
            }
        }
    };

//transport





server.route([ routes.css, routes.js, routes.images, routes.templates, routes.contact, routes.spa ]);
server.start( onServerStarted );

function onServerStarted() {
    console.log( 'Server running on port ', port );
}

function createDirectoryRoute( directory ) {
    return {
        directory: {
            path: path.join(__dirname, '/dist/', directory)
        }
    };
}

module.exports = server;