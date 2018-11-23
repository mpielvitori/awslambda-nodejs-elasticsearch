/**
 * Create Lambda response
 * @param {string} body response
 * @param {integer} statusCode
 * @return {object}
 */
export function createResponse(body = '', statusCode = 200) {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}
