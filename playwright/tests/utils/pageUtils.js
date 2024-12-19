const waitForServer = async () => {
    let isServerReady = false;
    while (!isServerReady) {
        try {
            const response = await fetch('http://localhost:7777/');
            if (response.ok) isServerReady = true;
        } catch (error) {
            console.log('Waiting for server to be ready...');
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};

const addTopic = async (page, topicName) => {
    await page.locator('#name').click();
    await page.locator('#name').fill(topicName);
    await page.getByRole('button', { name: 'Add' }).click();
}

const addQuestion = async (page, questionText) => {
    await page.getByLabel('Enter question:').click();
    await page.getByLabel('Enter question:').fill(questionText);
    await page.getByRole('button', { name: 'Add' }).click();
}

async function addOption(page, optionText, isChecked) {
    await page.locator('#option_text').click();
    await page.locator('#option_text').fill(optionText);
    if (isChecked) {
        await page.getByLabel('Is correct?').check();
    }
    await page.getByRole('button', { name: 'Add' }).click();
}

function getRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
export {waitForServer, addTopic, addQuestion, addOption, getRandomString}