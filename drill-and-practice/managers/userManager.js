import { bcrypt } from "../deps.js";
import * as userService from "userService";
import {validateEmail, validateTextLength} from "../utils/topicValidation.js";

const processLogin = async (email, password) => {
    if (email.length === 0) {
        return null;
    }
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
    const [passesPass, errorsPass] = await validateTextLength(["Password", password], 4);
    if (!passes || !passesPass) {
        Object.keys(errors).forEach((attribute) => {
            Object.values(errors[attribute]).forEach((err) => {
                errorsPass.push(err);
            });
        });
        return [false, errorsPass];
    }
    const user = await userService.findUserByEmail(email);
    if (user) {
        return [false, ["This email is already registered"]];
    }
    await userService.addUser(email, await bcrypt.hash(password));
    return [true, []];
}

const findUserByEmail = async (email) => {
    return await userService.findUserByEmail(email);
}

export {processLogin, addUser, findUserByEmail};