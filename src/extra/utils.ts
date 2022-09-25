/**
 *  Function to filter array
 * @param arr Array to be filtered
 * @param filterArr Reference array containing elements to be sliced
 * @param key - optional in case of arr is array of objects 1-depth only
 */
export const filterArray = (
    arr: any[],
    filterArr: any[],
    key?: string,
): any[] => {
    if (key) {
        arr = arr.filter(e => {
            return filterArr.indexOf(e[key]) < 0;
        });
    } else {
        arr = arr.filter(e => {
            return filterArr.indexOf(e) < 0;
        });
    }
    return arr;
};
