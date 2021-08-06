const {router, text,payload} = require('bottender/router');

module.exports = async function App(context) {
    return router([
        payload('SUBMIT',respond),

        payload('QUESTION_POST',handleQuestionPost),
    ])
};


async function respond(context){
    context.sendText('viva valo hoise asha kori. lets go!',{
        quickReplies: [
            {
                contentType: 'text',
                title: 'post Question',
                payload: 'QUESTION_POST'
            }
        ]
    })
}

async function handleQuestionPost(context){
    context.sendText('answer ki jana ase? post korte chas?',{
        quickReplies:[
            {
                contentType: 'text',
                title: 'ha answer post korbo',
                payload: 'ANSWER_POST'
            },
            {
                contentType: 'text',
                title: 'na answer jani e na!',
                payload: 'ANSWER_DECLINE'
            }
        ]
    })
}


