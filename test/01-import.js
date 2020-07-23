import * as Combinatorics from '../combinatorics.js';
describe('import', () => {
    for (const k in Combinatorics) {
        const tn = k === 'version' ? 'string' : 'function';
        it(`${k} is a ${tn}`, ()=>chai.expect(typeof Combinatorics[k]).to.equal(tn));
    }
});
