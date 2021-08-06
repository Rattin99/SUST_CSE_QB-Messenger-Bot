const {router, text,payload} = require('bottender/router');
const {createP} = require('./notion')

module.exports = async function App(context) {
    return router([
        payload('SUBMIT',respond),
        text(/^Q:/,handleQuestionPost),
        payload('QUESTION',handleQuestion),
    ])
};


async function respond(context){
    context.sendText('viva valo hoise asha kori. lets go!',{
        quickReplies: [
            {
                contentType: 'text',
                title: 'post Question',
                payload: 'QUESTION'
            }
        ]
    })
}

async function handleQuestion(context){

    context.sendText(`Write the question in one text.`)
    context.sendText(`Put "Q:" in front`)
    context.sendText(`example: Q:DLD er purnorup ki?`)
    context.sendText(`your question: `);

    // context.sendText('answer ki jana ase?',{
    //     quickReplies:[
    //         {
    //             contentType: 'text',
    //             title: 'ha answer post korbo',
    //             payload: 'ANSWER_POST'
    //         },
    //         {
    //             contentType: 'text',
    //             title: 'na answer jani e na!',
    //             payload: 'ANSWER_DECLINE'
    //         }
    //     ]
    // })
}

async function handleQuestionPost(context){
    const text = context.event.text;
    const question = text.substring(2,text.length);

    await context.sendText(`the question you posted is: "${question}"`);
    createP({question:question});
}



