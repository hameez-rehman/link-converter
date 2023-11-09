export const bracesRegex = /[{()}]/g;

export const weblinkRegex = new RegExp(`^${process.env.BASE_URL}`);
export const deeplinkRegex = new RegExp(`^${process.env.DEEPLINK_URL}`);
