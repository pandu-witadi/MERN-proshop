//
//
let CF = {
    app: {
        name: "node-express-mongoose-boilerplate",
        version: "0.0.1"
    },
    server: {
        port: 5152,
        apiPath: '/api'
    },
    // mongodb setting
    mongoose: {
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        // url : 'mongodb+srv://wamoo:wamoo@devconnector.jdg80.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        url : 'mongodb://127.0.0.1:27017/proshop'
    },
    // JWT (JSONWebToken)
    jwt: {
       saltLength: 10,
       secret_str : "this-auth-token",
       token_exp:  60 * 60 // 2 minutes
    },
    PAYPAL: {
        CLIENT_ID : 'AbV4DsXYRoJUeL-qzOyRQAxgdp8hRUgmVeesKbKTCzzPyj1FdvbHnbuYc5sl_1qzF96xRyqqEPF9SiQv'
    },
    frontEnd: {
        path: '../client_react/build'
    }
}


module.exports = CF
