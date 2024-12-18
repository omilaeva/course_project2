import * as loginManager from "../../managers/userManager.js";

const processLogin = async ({ render, request, response, state }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    const user = await loginManager.processLogin(params.get("email"), params.get("password"));
    console.dir(user);
    if (!user) {
        console.log("Render login form with errors");
        render("login.eta", {errors: ["Wrong email or password"], email: params.get("email")});
        return;
    }
    await state.session.set("user", user);
    response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
    render("login.eta");
};

const logout = async ({state, response}) => {
    await state.session.set("user", null);
    response.redirect("/");
}
export { processLogin, showLoginForm, logout};