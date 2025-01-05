import { send } from "../deps.js";

const serveStaticMiddleware = async (context, next) => {
    if (context.request.url.pathname.startsWith("/scripts")) {
        const path = context.request.url.pathname.substring(8);

        await send(context, path, {
            root: `${Deno.cwd()}/scripts`,
        });
    } else {
        await next();
    }
};

export { serveStaticMiddleware };