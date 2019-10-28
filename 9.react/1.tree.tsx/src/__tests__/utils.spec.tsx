import { sum } from '../utils';
describe('sum', () => {
    test('1+1', () => {
        expect(sum(1, 1)).toBe(2);
    });
    test('2+2', () => {
        expect(sum(2, 2)).toBe(4);
    });
});