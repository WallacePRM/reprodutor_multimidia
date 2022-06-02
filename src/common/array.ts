export const sortAsc = (a: any, b: any) => {
    if (a > b) return 1;

    if (a < b) return -1;

    return 0;
};

export const sortDesc = (a: any, b: any) => {

    if (a > b) return -1;

    if (a < b) return 1;

    return 0;
};

export const shuffle = (array: []) => {

    return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};