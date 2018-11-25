
import * as dao from '../../src/daos/dna';
import * as AWS from 'aws-sdk-mock';

describe('DNA DAO', () => {
    beforeAll(() => {
        AWS.mock('DynamoDB', 'putItem', function (params, callback){
            callback(null, "successfully put item in database");
        });
    });

	test('Save dna', async () => {
        const dna = ['ATGCGA','CAGTGC','TTATGT','AGAAGG','CCCCTA','TCACTG'];

        const result = await dao.save(dna, true);
        
        expect(result).toBeDefined();
    });

    test('Return stats', async () => { 
        const stats = await dao.stats();

        expect(stats).toBeDefined();
    });
});