export function generateID() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}

export function getWeekRange(firstDay = 'Monday', timestamp = false) {
    let now = new Date();
    let dayOfWeek;
    let numDay = now.getDate();

    let start = new Date(now);
    let end = new Date(now);

    if (firstDay === 'Monday') {
        dayOfWeek = (now.getDay() + 6) % 7;
    } else {
        dayOfWeek = now.getDay();
    }

    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0);

    end.setDate(numDay + (6 - dayOfWeek));
    end.setHours(0, 0, 0, 0);

    if (timestamp) return {start: start.getTime(), end: end.getTime()};

    return {start, end}

}

export function filterByWeek(data) {
    const {start, end} = getWeekRange();

    return data.filter(item => new Date(item.date).getTime() >= start && new Date(item.date).getTime() <= end)
}

export function getWeeklyTotal(data) {
    const weeklyEntries = filterByWeek(data);

    return weeklyEntries.reduce((a, b) => a + b.amount, 0)
}

export function getCategoryTotal(id, entries) {
    const now = new Date();
    const today = getPureDate(now);

    const earningsCategory = entries.filter(listing => (
        (listing.category === id) && (getPureDate(listing.date).getTime() === today.getTime())
    ));

    return earningsCategory.reduce((a, b) => a + b.amount, 0).toFixed(2)
}

export function getDailyTotal(date, entries) {
    const earningsToday = entries.filter(entry => getPureDate(entry.date).getTime() === getPureDate(date).getTime());


    return earningsToday.reduce((a, b) => a + b.amount, 0).toFixed(2)
}

export function getPureDate(date) {
    const dateObj = new Date(date);
    return new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()))
}

export function sortByDate(data, time = true, order = 'ASC') {
    if (time) {
        if (order === 'ASC') {
            return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }

        return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    if (order === 'ASC') {
        return data.sort((a, b) => getPureDate(b.date).getTime() - getPureDate(a.date).getTime())
    }

    return data.sort((a, b) => getPureDate(a.date).getTime() - getPureDate(b.date).getTime())
}
