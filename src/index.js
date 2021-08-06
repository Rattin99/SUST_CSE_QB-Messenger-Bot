const {router, text,payload} = require('bottender/router');

module.exports = async function App(context) {
    return router([
        payload('SUBMIT',)
    ])
};

async function respond(context){
    context.sendText('dara notion integrate korinai ekhono')
}


