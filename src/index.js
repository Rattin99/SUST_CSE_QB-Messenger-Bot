const {router, text,payload} = require('bottender/router');
const {createP} = require('./notion')

module.exports = async function App(context) {
    // context.getUserProfile().then(user => {

    // })
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

    await context.sendText(`Write the question in one text.`)
    await context.sendText(`Put "Q:" in front of the text`)
    await context.sendText(`example: "Q:DLD er পুর্নরুপ ki?"`)
    await context.sendText('now text the question: ')

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

     await createP({question});
    await context.sendText(`the question you posted is: "${question}"`);
   
}



