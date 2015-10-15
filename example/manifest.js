
module.exports = {
    connections: [
        {
            port: {
                $filter: 'env',
                production: 3000,
                $default:   8080
            },
            labels: [
                'http'
            ]
        }
    ],
    server: {
        load: {
            sampleInterval: 1000
        }
    },
    plugins: {
        vision: {
            engines: {
                jade: 'jade'
            },
            path: './views',
            compileOptions: {
                $filter: 'env',
                production: {
                    pretty: false
                },
                $default: {
                    pretty: true
                }
            },
            isCached: {
                $filter: 'env',
                production: true,
                $default:   false
            }
        },
        './home': null
    }
};
