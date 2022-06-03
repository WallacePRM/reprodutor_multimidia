export const hasSymbol = (str: string) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(str);
};

export const removeExtension = (str: string) => {
    return str.replace(/\.[^/.]+$/, "");
};

export const convertMediaType = (str: string) => {

    if (str.indexOf("audio") > -1) return 'music';
    else if (str.indexOf("video") > -1) return 'video';
    else return 'folder';
};