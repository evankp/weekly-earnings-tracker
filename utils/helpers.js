import _ from 'lodash';
import {DateTime} from 'luxon';

export function generateID() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}

export function getDay(date) {
    return DateTime.fromISO(date).startOf('day')
}

export function getWeekRange(customWeek = null) {
    let start,
        end;

    if (customWeek !== null) {
        start = DateTime.fromISO(customWeek).startOf('week');
        end = DateTime.fromISO(customWeek).endOf('week');
    } else {
        start = DateTime.local().startOf('week');
        end = DateTime.local().endOf('week');
    }

    return {start, end}
}

export function filterByWeek(data, customWeek = null) {
    const {start, end} = getWeekRange(customWeek);

    return data.filter(item => {
        const itemDate = DateTime.fromISO(item.date).valueOf();
        return itemDate >= start && itemDate <= end
    })
}

export function getWeeklyTotal(data) {
    const dataWeek = data.length > 0 ? DateTime.fromISO(data[0].date).startOf('week').toISO() : null;
    const weeklyEntries = filterByWeek(data, dataWeek);

    return weeklyEntries.reduce((a, b) => a + b.amount, 0).toFixed(2)
}

export function getCategoryTotal(id, entries, customWeek = null) {
    const day = customWeek ? DateTime.fromISO(customWeek) : DateTime.local();

    const earningsCategory = entries.filter(listing => (
        (listing.category === id) && (getDay(listing.date).valueOf() === day.startOf('day').valueOf())
    ));

    return earningsCategory.reduce((a, b) => a + b.amount, 0).toFixed(2)
}

export function getDailyTotal(date, entries) {
    const earningsDay = filterByDay(date, entries);

    return earningsDay.reduce((a, b) => a + b.amount, 0).toFixed(2)
}

export function filterByDay(date, entries) {
    return entries.filter(entry => DateTime.fromISO(entry.date).hasSame(date, 'day'))
}

export const filterAndJoinByDay = _.flow([
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
