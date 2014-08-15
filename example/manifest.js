
module.exports = {
    servers: [{
        port: {
            $filter: 'env',
            production: 3000,
            $default:   8080
        },
        options: {
            labels: ['web'],
            views: {
                path: './views',
                engines: {
                    jade: 'jade'
                },
                compileOptions: {
                    $filter: 'env',
                    production: {
                        pretty: false
                    },
                    $default: {
                        pretty: true
                    }
                }
            }
        }
    }],
    plugins: {}
};