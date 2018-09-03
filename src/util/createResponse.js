/**
 * Create Lambda response
 * @param {string} body response
 * @param {integer} statusCode
 * @return {object}
 */
export default function logger(body = '', statusCode = 200) {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}
