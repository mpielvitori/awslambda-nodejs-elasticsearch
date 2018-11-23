
import * as AWS from 'aws-sdk';
import {createLogger} from '../logger';

const logger = createLogger(__filename);

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * @param {array<string>} dna
 * @param {boolean} mutant
 * @return {object}
*/
export async function save(dna, mutant) {
  logger.info(`Saving dna`);
  const timestamp = new Date().getTime();
  const dnakey = dna.join('');

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      dnakey,
      mutant,
      createdAt: timestamp,
    },
  };

  try {
    const data = await dynamoDb.put(params).promise();
    logger.info(`DNA saved successfully`);
    return data;
  } catch (error) {
    logger.error(error.stack);
    throw error;
  }
}
