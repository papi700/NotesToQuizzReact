// export const parseQuestions = (rawText) => {
//     const questionRegex = /\d+\.\s(.*?)(?=\sChoices:|$)/g;
//     const choicesRegex = /Choices:\s*([\s\S]*?)(?=Answer:)/g;
//     const answerRegex = /Answer:\s*([a-d]\..*?)(?=\n\s*(?:\d+\.|$))/gs;

//     const questions = [...rawText.matchAll(questionRegex)].map(match => match[1])
//     const choices = rawText.match(choicesRegex).map(group => {return group.match(/([a-d]\.\s*[^\n]+)/g).map(choice => choice.trim())})
//     console.log('[...rawText.matchAll(answerRegex)] ', [...rawText.matchAll(answerRegex)])
//     const answers = [...rawText.matchAll(answerRegex)].map(match => [match[1].trim()]).map((answer, index) => {
//         return choices[index].filter(choice => choice.startsWith(answer[0]))
//     });
    
//     return answers // should return an array of objects. Each object should contain the question sentence, the choices and the correct anwer(s).
// }

// export const parseQuestions = (rawText) => {
//     // Match all blocks containing one question, its choices, and the answer
//     const questionBlocks = [...rawText.matchAll(/(\d+\.\s(.*?))\sChoices:\s([\s\S]*?)\sAnswer:\s([a-d]\..*?)\s*(?=\d+\.|$)/g)];

//     // Transform each block into an object with question, choices, and answer
//     return questionBlocks.map(([_, question, questionText, choicesText, answer]) => {
//         const choices = choicesText
//             .split('\n')
//             .map(choice => choice.trim())
//             .filter(choice => choice);  // Remove any empty lines

//         return {
//             question: questionText.trim(),
//             choices: choices,
//             answer: answer.trim()
//         };
//     });
// };

export const parseQuestions = (rawText) => {
    // Match each question block (question + choices + answer)
    const questionBlocks = [...rawText.matchAll(/(\d+\.\s(.*?))\sChoices:\s([\s\S]*?)\sAnswer:\s([\s\S]*?)(?=\d+\.|$)/g)];

    return questionBlocks.map(([_, question, questionText, choicesText, answersText]) => {
        // Extract choices and trim them
        const choices = choicesText
            .split('\n')
            .map(choice => choice.trim())
            .filter(choice => choice);  // Remove empty lines

        // Extract answers and match with full choice text
        const answers = answersText
            .split(',')
            .map(answer => answer.trim())  // Trim each answer (like 'c.')
            .map(letter => choices.find(choice => choice.startsWith(letter)));  // Find matching choice

        return {
            question: questionText.trim(),
            choices: choices,
            answers: answers  // Store answers as an array of full choice texts
        };
    });
};