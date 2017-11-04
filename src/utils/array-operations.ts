export function reorderItems(collection, from, to) {
    collection.splice(to, 0, collection.splice(from, 1)[0]);
}
