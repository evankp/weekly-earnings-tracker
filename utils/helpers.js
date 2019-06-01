import _ from 'lodash';
import {DateTime} from 'luxon';

export function generateID() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}

export function getDay(date) {
    return DateTime.fromISO(date).startOf('day')
}

export function getWeekRange(customWeek = null, timestamp = false) {
    let start,
        end;

    if (customWeek !== null) {
        start = DateTime.local(customWeek).startOf('week');
        end = DateTime.local(customWeek).endOf('week');
    } else {
        start = DateTime.local().startOf('week');
        end = DateTime.local().endOf('week');
    }

    return {start, end}
}

export function filterByWeek(data) {
    const {start, end} = getWeekRange();

    return data.filter(item => {
        const itemDate = DateTime.fromISO(item.date).valueOf();
        return itemDate >= start && itemDate <= end
    })
}

export function getWeeklyTotal(data) {
    const weeklyEntries = filterByWeek(data);

    return weeklyEntries.reduce((a, b) => a + b.amount, 0).toFixed(2)
}

export function getCategoryTotal(id, entries) {
    const today = DateTime.local();

    const earningsCategory = entries.filter(listing => (
        (listing.category === id) && (getDay(listing.date).valueOf() === today.startOf('day').valueOf())
    ));

    return earningsCategory.reduce((a, b) => a + b.amount, 0).toFixed(2)
}

export function getDailyTotal(date, entries) {
    const earningsDay = entries.filter(entry => DateTime.fromISO(entry.date).hasSame(date, 'day'));

    return earningsDay.reduce((a, b) => a + b.amount, 0).toFixed(2)
}

export let filterByDay = _.flow([
    (object) => _.groupBy(object, (iteratee) => DateTime.fromISO(iteratee.date).startOf('day')),
    (collection) => _.map(collection, (obj) => {
        const amount = obj.reduce((a, b) => a + b.amount, 0);

        return {
            date: DateTime.fromISO(obj[0].date).startOf('day').toISO(),
            amount
        };
    })
]);

export function sortByDate(data, time = true, order = 'DESC') {
    if (time) {
        if (order === 'ASC') {
            return data.sort((a, b) => DateTime.fromISO(a.date).valueOf() - DateTime.fromISO(b.date).valueOf())
        }

        return data.sort((a, b) => DateTime.fromISO(b.date).valueOf() - DateTime.fromISO(a.date).valueOf())
    }

    if (order === 'ASC') {
        return data.sort((a, b) => getDay(a.date).valueOf() - getDay(b.date).valueOf())
    }

    return data.sort((a, b) => getDay(b.date).valueOf() - getDay(a.date).valueOf())
}
