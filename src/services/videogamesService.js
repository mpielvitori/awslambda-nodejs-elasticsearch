import * as elasticSearchService from './elasticsearchService';
import {default as createLogger} from '../logger';
import bodybuilder from 'bodybuilder';
import {VideogamesIndexConfig} from '../config/indexes/videogames.json';
import videogamesIndexData from '../../fixtures/videogames.json';
import {default as createResponse} from '../util/createResponse';

const logger = createLogger(__filename);

const indexName = 'videogames';
const indexType = indexName;

/**
 * @param {object} event
 * @return {object}
*/
export async function create(event) {
    const videogame = JSON.parse(event.body);
    return await elasticSearchService.create(indexName, indexType, videogame)
    .then((response) => {
        if (response.errors) {
            return createResponse(response, 400);
        } else {
            return createResponse(response);
        }
    })
    .catch((e) => {
        logger.error('Failed creating videogame', e);
        return createResponse(e.message, 500);
    });
}

/**
 * @param {object} event
 * @return {object}
*/
export async function search(event) {
    let searchInputData = '';
    if (event.queryStringParameters) {
        searchInputData = event.queryStringParameters.data;
    }
    const query = await makeVideogamesQuery(searchInputData);

    return await elasticSearchService.getByQuery(indexName, query)
        .then((response) => {
            return createResponse(response);
        })
        .catch((e) => {
            logger.error('Failed searching videogames', e);
            return createResponse(e.message, 500);
        });
}

/**
 * @param {string} inputData
 * @return {object}
*/
async function makeVideogamesQuery(inputData) {
    return bodybuilder()
        .size(100)
        // UTC time
        .query('range', 'releaseDate', {'lte': 'now'})
        .query('multi_match', {
                'query': inputData,
                'type': 'best_fields',
                'fields': [
                  'title^2.5',
                  'platforms^1.5',
                  'creator^3.5',
                  'company^1.5',
                ],
                'tie_breaker': 0.3,
                'fuzziness': 'AUTO',
            }
        ).build();
}

/**
 * Bulk dummy data
 * @return {object}
*/
export async function bulkDummyData() {
    return elasticSearchService.createMany(
        indexName, indexType, videogamesIndexData
    ).then(() => {
        logger.info(`Index filled`);
        return createResponse('videogames index filled');
    }).catch((e) => {
        logger.error('Error filling videogames index', e);
        return createResponse(e.message, 500);
    });
}

/**
 * Create/Reset index
 * @return {object}
*/
export async function resetIndex() {
    await elasticSearchService.deleteIndex(indexName)
    .then((response) => {
        logger.info(`Index deleted`);
    })
    .catch((e) => {
        logger.error(e);
    });

    return elasticSearchService.buildIndex(
        indexName,
        VideogamesIndexConfig
    ).then(() => {
        logger.info(`Index created`);
        return createResponse('Videogames index created');
    }).catch((e) => {
        logger.error('Error creating index into elasticsearch', e);
        return createResponse(e.message, 500);
    });
}
