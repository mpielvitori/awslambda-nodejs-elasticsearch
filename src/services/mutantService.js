
import {default as logger} from '../logger';
import {default as createResponse} from '../util/createResponse';

/**
 * @param {object} event
 * @return {object}
*/
export async function isMutant(event) {
    const request = JSON.parse(event.body);

    logger.info(`Check if dna ${request.dna} is mutant`);

    for (let row of request.dna) {
        logger.info(`DNA row ${row}`);
    }

    return createResponse();
}
