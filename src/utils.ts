export function normalizeRatingIds(ids: any[], userId: any): string[]  {
    let ratingData = {};
    let normalizedIds = [];
    ids.forEach((id) => {
        if (!ratingData[id.toString()] && (id.toString() != userId.toString())) {
            normalizedIds.push(id.toString());
            ratingData[id.toString()] = true;
        }
    });
    return normalizedIds;
}

export function getPointsByIndex(index: number): number {
    if (index > 9) {
        return 0
    }
    else if (index == 0) {
        return 12;
    }
    else if (index == 1) {
        return 10;
    }
    else {
        return 10 - index;
    }
}