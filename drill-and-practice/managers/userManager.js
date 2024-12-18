import { bcrypt } from "../deps.js";
import * as userService from "../services/userService.js";
import {validateEmail} from "../utils/topicValidation.js";

const processLogin = async (email, password) => {
    const user = await userService.findUserByEmail(email);
    if (user) {
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (passwordMatches) {
            return user;
        }
    }
    return null;
}

const addUser = async (email, password) => {
    const [passes, errors] = await validateEmail(email);
    if (!passes) {
        return [passes, errors];
    }
    await userService.addUser(email, await bcrypt.hash(password));
    return [true, []];
}

const findUserByEmail = async (email) => {
    return await userService.findUserByEmail(email);
}

export {processLogin, addUser, findUserByEmail};