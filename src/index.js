const {router, text,payload} = require('bottender/router');
const {createP, getTags} = require('./notion')


module.exports = async function App(context) {
    return router([
        payload('SUBMIT',respond),
        text(/^Q:/,handleQuestionPost),
        payload('QUESTION',handleQuestion),
        payload('ANSWER_POST',handleAnswer),
        payload(/^A:/,handleAnswerPost)
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

}

async function handleQuestionPost(context){
    const text = context.event.text;
    const question = text.substring(2,text.length);

    context.setState({
        ...context.myobject,
        question: question
    });

    await context.sendText(`the question you posted is: "${question}"`);
     context.sendText('answer ki jana ase?',{
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

async function handleAnswer(context){
    await context.sendText(`Write the answer in one text.`)
    await context.sendText(`Put "A:" in front of the text`)
    await context.sendText(`example: "A:DLD এর পুর্নরুপ Digital logic design."`)
    await context.sendText('now text the answer: ');
}

async function handleAnswerPost(context){
    const text = context.event.text;
    const answer = text.substring(2,text.length);

    await context.setState({
        ...context.myobject,
        answer: answer
    });

    await context.sendText(`the answer you posted is: "${answer}"`);

    // getCoursesOpt(context);
}

async function getCoursesOpt(context){

    await context.sendText(` "${context.setState.question}" eita kon course er question? `,{
        quickReplies: [
            {
                contentType: 'text',
                title: "MAT102 (1/1 math)",
                payload: 'MAT102'
            },
            {
                contentType: 'text',
                title: "PHY207 (2/1 physics)",
                payload: 'PHY207'
            },
            {
                contentType: 'text',
                title: "C (CSE133)",
                payload: 'CSE133'
            },
            {
                contentType: 'text',
                title: "MAT204 (2/2 Math)",
                payload: 'MAT204'
            },
            {
                contentType: 'text',
                title:  "EEE111 (1/2 EEE)",
                payload: 'EEE111'
            },
            {
                contentType: 'text',
                title:  "Data Structure (CSE137)",
                payload: 'CSE137'
            },
            {
                contentType: 'text',
                title:  "Numerical Analysis (CSE239)",
                payload: 'CSE239'
            },
            {
                contentType: 'text',
                title:  "Numerical Analysis (CSE239)",
                payload: 'CSE239'
            },
            {
                contentType: 'text',
                title:  "MAT103D(1/2 math)",
                payload: 'MAT103'
            },
            {
                contentType: 'text',
                title:  "ECO105D",
                payload: 'MAT105'
            },
            {
                contentType: 'text',
                title:  "TOC",
                payload: 'TOC'
            },
            {
                contentType: 'text',
                title: "Algo",
                payload: 'ALGO'
            }    
        ]
    })
}



