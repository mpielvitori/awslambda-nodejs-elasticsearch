
import {createLogger} from '../logger';
import AWS from 'aws-sdk';

const logger = createLogger(__filename);
const REGION = process.env.AWS_REGION || 'sa-east-1';
const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || 'dna-test';

AWS.config.update({region: REGION});
// const dynamoDb = new DynamoDB.DocumentClient({region: REGION});

/**
 * @param {array<string>} dna
 * @param {boolean} mutant
 * @return {object}
*/
export async function save(dna, mutant) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  logger.info(`Saving dna`);
  const timestamp = new Date().getTime();
  const dnakey = dna.join('');

  const params = {
    TableName: DYNAMODB_TABLE,
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

/**
 * @return {object}
*/
export async function stats() {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: DYNAMODB_TABLE,
    FilterExpression: 'mutant = :mutantValue',
    ExpressionAttributeValues: {
      ':mutantValue': true,
    },
    Select: 'COUNT',
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    const humans = data.ScannedCount - data.Count;
    let ratio;
    if (humans > 0) {
      ratio = data.Count / humans;
    } else {
      ratio = data.Count > 0 ? 1 : 0;
    }

    return {
      count_mutant_dna: data.Count,
      count_human_dna: data.ScannedCount - data.Count,
      ratio,
    };
  } catch (error) {
    logger.error(error.stack);
    throw error;
  }
}
