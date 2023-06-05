import { createProxyMiddleware } from "http-proxy-middleware";
export const developMiddleware = (app) => {
    app.use(
        "/api",
        createProxyMiddleware({
            target: process.env.GATSBY_API_URL,
            secure: false,
            // logLevel: "debug",
            changeOrigin: true,
            headers: {
                "communication-key": "f6dc69a089844cf6b2019bae6d36fac8",
            },
        }),
    );
};
