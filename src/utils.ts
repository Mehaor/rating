export function normalizeRatingIds(ids: any[], userId: any): string[]  {
    let ratingData = {};
    let normalizedIds = [];
    ids.forEach((id) => {
        if (id && !ratingData[id.toString()] && (id.toString() != userId.toString())) {
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


export function getRatedList(users: any[], withRating: boolean = false): any[] {
    let userRatingData = {};
    users.forEach((user: any, index) => {
        user.rating.forEach((id: string, index: number) => {
            if (id.toString() == user._id.toString()) {
            }
            else if (userRatingData[id] == undefined) {
                userRatingData[id] = getPointsByIndex(index);
            }
            else {
                userRatingData[id] += getPointsByIndex(index);
            }
        });
    });
    let ratedItems: any[] = [];
    Object.keys(userRatingData).forEach((k) => {
        let val: any = users.find((val: any, index: number, obj: any[]) => {
            return val._id == k;
        });
        if (val) {
            ratedItems.push({_id: val._id, username: val.username, nickname: val.nickname, avatar: val.avatar, points: userRatingData[k], rating: withRating ? val.rating : [] })
        }
    });

    ratedItems.sort((a, b) => { return b.points - a.points });
    let lastPlace = 1;
    ratedItems.forEach((item: any, index: number) => {
        if (index == 0) {
            item.position = 1;
        }
        else {
            if (item.points < ratedItems[index - 1].points) {
                lastPlace++;
            }
            item.position = lastPlace;
        }

    });
    return ratedItems;
}