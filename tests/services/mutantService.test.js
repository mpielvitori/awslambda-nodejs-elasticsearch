
import * as mutantService from '../../src/services/mutantService';
import * as AWS from 'aws-sdk-mock';

describe('Mutants service', () => {
    beforeAll(() => {
        AWS.mock('DynamoDB', 'putItem', function (params, callback){
            callback(null, "successfully put item in database");
        });
    });

	test('Mutant positive result example DNA', async () => {
        const request = {
            body: JSON.stringify(
                {
                    dna:['ATGCGA','CAGTGC','TTATGT','AGAAGG','CCCCTA','TCACTG']
                }
            )
        };
        const result = await mutantService.isMutant(request);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toBe('OK');
    });

    test('Mutant positive result from left to right', async () => {
        const request = {
            body: JSON.stringify(
                {
                    dna:['AAAAGA','TGGGGC','TTATGT','AGAAGG','TTCCTA','TCACTG']
                }
            )
        };
        const result = await mutantService.isMutant(request);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toBe('OK');
    });
    
    test('Mutant positive result from top to bottom', async () => {
        const request = {
            body: JSON.stringify(
                {
                    dna:['ATGCGA','ACGTGC','ATATGT','AGAAGG','CCTCTA','TCACTG']
                }
            )
        };
        const result = await mutantService.isMutant(request);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toBe('OK');
    });

    test('Mutant positive result diagonal from top to bottom', async () => {
        const request = {
            body: JSON.stringify(
                {
                    dna:['AGGCAA','CAGTGC','TGAGTT','AGAAGG','CCCCTA','TCACTG']
                }
            )
        };
        const result = await mutantService.isMutant(request);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toBe('OK');
    });

    test('Mutant positive result diagonal from bottom to top', async () => {
        const request = {
            body: JSON.stringify(
                {
                    dna:['TTGCGA','CACTAC','TCAACT','CGAAGG','CCACTA','TCTCTG']
                }
            )
        };
        const result = await mutantService.isMutant(request);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toBe('OK');
    });

    test('Mutant negative result', async () => {
        const request = {
            body: JSON.stringify(
                {
                    dna:['TTGCGA','CAGTGC','TTATGT','AGAAGG','TCCCTA','TCACTG']
                }
            )
        };
        const result = await mutantService.isMutant(request);
        
		expect(result.statusCode).toBe(403);
        expect(JSON.parse(result.body)).toBe('Forbidden');
    });
    
    test('Return dna stats', async () => { 
        const stats = await mutantService.stats();

        expect(stats.statusCode).toBe(200);
    });
});