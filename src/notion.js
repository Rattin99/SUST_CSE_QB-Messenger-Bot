const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });


function create({ question, answer, courses }) {
    notion.pages.create({
        parent: {
            database_id: process.env.NOTION_DATABASE_ID
        },
        properties: {
            [process.env.NOTION_QUESTIONS_ID]: {
                title: [{
                    type: 'text',
                    text: {
                        content: question
                    }
                }]
            },
            [process.env.NOTION_ANSWER_ID]: {
                rich_text: [{
                    type: 'text',
                    text: {
                        content: answer

                    }
                }]
            },
            [process.env.NOTION_COURSE_ID]: {
                multi_select: courses.map(course => {
                    return { id: course.id }
                })
            },


        }
    })
}

function createP({question}){
    notion.pages.create({
        parent:{
            database_id: process.env.NOTION_DATABASE_ID
        },
        properties:{
            [process.env.NOTION_QUESTIONS_ID]: {
                title: [{
                    type: 'text',
                    text: {
                        content: question
                    }
                }]
            }
        }
    })
}

async function getTags() {
    const database = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID })

    return notionPropertiesById(database.properties)[process.env.NOTION_COURSE_ID].multi_select.options.map(option => {
        return { id: option.id, name: option.name }
    })
}

function notionPropertiesById(properties) {
    return Object.values(properties).reduce((obj, property) => {
        const { id, ...rest } = property
        return { ...obj, [id]: rest }
    }, {})
}

module.exports = {
    create,
    getTags,
    createP
}




