export const IS_DEV = process.env.NODE_ENV === "development";

/** From package.json */
export const { APP_NAME = "", APP_VERSION = "" } = process.env;
