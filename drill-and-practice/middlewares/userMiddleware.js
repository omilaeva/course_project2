// import * as userService from "../services/userService.js";

import * as userManager from "../managers/userManager.js"

const userMiddleware = async (context, next) => {
    const user = await context.state.session.get("user");

    if (user) {
        context.user = await userManager.findUserByEmail(user.email);
    }

    await next();
};

export { userMiddleware };