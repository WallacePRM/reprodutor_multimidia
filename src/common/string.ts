export const hasSymbol = (str: string) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(str);
};

export const removeExtension = (str: string) => {
    return str.replace(/\.[^/.]+$/, "");
};