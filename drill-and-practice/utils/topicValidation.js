import { validate, required, isEmail } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const validateTextLength = ([name, text], length = 2) => {
    if (!text) {
        return [false, [`${name} is absent`]];
    }
    const trimmedText = text.trim();
    if (trimmedText.length < length) {
        const errorList = [`${name} should contain at least ${length} characters`];
        if (trimmedText !== text) {
            errorList.push(`${name} shouldn't contain leading or trailing whitespaces`);
        }
        return [false, errorList];
    }
    return [true, []];
}

const validateEmail = async (email) => {

    const validationRules = {
        email: [required, isEmail]
    };

    return await validate({email: email}, validationRules);
}

export {validateTextLength, validateEmail}