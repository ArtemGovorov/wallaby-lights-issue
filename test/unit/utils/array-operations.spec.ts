import '../setup';
import { reorderItems } from 'utils/array-operations';
describe('reorderItems', () => {
    it('should reorder two elements of an array', () => {
        // this is not a swap, but reordering

        let array = [
            { id: 1 },
            { id: 2 },
            { id: 3 }
        ];

        reorderItems(array, 0, 1);

        expect(array[0].id).toBe(2);
        expect(array[1].id).toBe(1);
        expect(array[2].id).toBe(3);

        array = [
            { id: 1 },
            { id: 2 },
            { id: 3 }
        ];

        reorderItems(array, 0, 2);

        // we dragged 1 below 3
        // so the new order becomes, 2, 3, 1
        expect(array[0].id).toBe(2);
        expect(array[1].id).toBe(3);
        expect(array[2].id).toBe(1);
    });
});
