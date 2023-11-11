import { useMemo } from "react";

export const useSortedFlowers = (flowers, sort) => {
    const sortedFlowers = useMemo(() => {
        if (sort === 'price') {
            return [...flowers].sort((a, b) => a[sort] - b[sort]);
        } else if (sort === 'color') {
            return [...flowers].sort((a, b) => a[sort].localeCompare(b[sort], 'ru'));
        }
        return flowers;
    }, [sort, flowers])

    return sortedFlowers;
}

export const useFlowers = (flowers, sort, query) => {
    const sortedFlowers = useSortedFlowers(flowers, sort);

    const sortedAndSearchedFlowers = useMemo(() => {
        return sortedFlowers.filter(flower => flower.name.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedFlowers])

    return sortedAndSearchedFlowers;
}