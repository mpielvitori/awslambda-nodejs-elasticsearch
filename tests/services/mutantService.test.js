
import * as mutantService from '../../src/services/mutantService';

describe('Mutants service', () => {
	test('Mutant positive result', async () => {
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
});