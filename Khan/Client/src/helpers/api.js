/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchJSON = async (url, options = {}) => {
    return await fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};
export { fetchJSON };
