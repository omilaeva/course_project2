import * as userManager from "../../managers/userManager.js";

const registerUser = async ({ request, response, render }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    const [done, errors] = await userManager.addUser(
        params.get("email"),
        params.get("password")
    );
    if (!done) {
        const data = {
            email: params.get("email"),
            errors: errors
        }
        render("registration.eta", data);
        return;
    }

    response.redirect("/auth/login");
};

const showRegistrationForm = ({ render }) => {
    render("registration.eta");
};

export { registerUser, showRegistrationForm };