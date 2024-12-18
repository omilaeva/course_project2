let options = [];
let currentId = 1;

const getAllByQuestionId = async (id) => {
    const questionOptions = [];
    for (let option of options) {
        if (option.questionId === id) {
            console.log(`Found option with id ${id}`);
            questionOptions.push(option);
        }
    }
    return questionOptions;
}

const add = async (questionId, optionText, isCorrect) => {
    options.push({id: currentId++, questionId: questionId, optionText: optionText, isCorrect: isCorrect});
    console.log(`Added option with question id ${questionId}`);
    return 1;
}

const deleteById = async (id) => {
    options = options.filter(function (option) {
        return option.id !== id;
    });
}

export {getAllByQuestionId, add, deleteById}