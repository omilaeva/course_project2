import * as optionManager from "../../managers/optionManager.js";

const addOption = async ({request, response}) => {
    const body = request.body({ type: "json" });
    const data = await body.value;
    console.log(data.option);
    const [done, result] = await optionManager.add(data.question, data.option, data.isChecked);
    if (done) {
        response.status = 200;
        response.body = {done: true, id: result};
    } else {
        response.status = 400;
        response.body = { errors: result };
    }
}

export {addOption}