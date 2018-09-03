import elasticsearchClient from 'elasticsearch';
import {default as createLogger} from '../logger';
import {default as createResponse} from '../util/createResponse';

const logger = createLogger(__filename);
const client = elasticsearchClient.Client({
    hosts: process.env.ELASTICSEARCH_ENDPOINT,
    log: [{
        levels: ['error', 'warning', 'info'],
    }],
    maxRetries: 10,
    keepAlive: false,
});


/**
* ElasticSearch create operation.
* @param {string} index
* @param {string} type
* @param {object} document
* @return {object}
*/
export async function create(index, type, document) {
    logger.info(`Create document on ${index}`);
    return await bulk([
        {
            index: {
                _index: index,
                _type: type,
            },
        },
        document,
    ]);
}

/**
* ElasticSearch create many operation.
* @param {string} index
* @param {string} type
* @param {array<object>} documents
* @return {object}
*/
export async function createMany(index, type, documents) {
    logger.info(`Insert documents on ${index}`);
    let bulkRequest = [];
    const indexHeader = {
        index: {
            _index: index,
            _type: type,
        },
    };
    for (let doc of documents) {
        bulkRequest.push(indexHeader);
        bulkRequest.push(doc);
    }
    return await bulk(bulkRequest);
}

/**
 * Build index from a defined index name and body.
 * @param {string} index
 * @param {object} body
 * @return {object}
*/
export async function buildIndex(index, body) {
    logger.info(`Creating ${index} index`);
    return await client.indices.create({
        index,
        body,
    });
}

/**
* ElasticSearch bulk operation.
* @param {object} body
* @return {object}
*/
export async function bulk(body) {
    return client.bulk({
        body,
    });
}

/**
* Delete index.
* @param {string} index
* @return {object}
*/
export async function deleteIndex(index) {
    return client.indices.delete({
        index,
    });
}


/**
 * Get items by query.
 * @param {string} index
 * @param {object} body
 * @return {object}
*/
export async function getByQuery(index, body) {
    return await client.search({
        index,
        body,
    });
}

/**
 * Ping the elasticsearch endpoint.
 * @return {object}
*/
export async function ping() {
    return await client.ping({
        requestTimeout: 5000,
    }).then((response) => {
        return createResponse('Connected to elasticsearch!');
    }).catch((e) => {
        logger.error(e);
        return createResponse(e.message, 500);
    });
}
