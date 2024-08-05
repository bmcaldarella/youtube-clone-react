export const API_KEY= 'AIzaSyAxABYlaoUNG0LDqPNPNm3P5rpoDWg8ZN0';

export const value_convertor = (value) => {
    if (value >= 1000000) {
        return Math.floor(value / 1000000) + "M";
    } else if (value >= 1000) {
        return Math.floor(value / 1000) + "K";
    } else {
        return value;
    }
};
export const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const intervals = [
        { name: 'year', value: 31536000 }, // 60*60*24*365
        { name: 'month', value: 2592000 }, // 60*60*24*30
        { name: 'day', value: 86400 },    // 60*60*24
        { name: 'hour', value: 3600 },     // 60*60
        { name: 'minute', value: 60 },
        { name: 'second', value: 1 }
    ];

    for (const interval of intervals) {
        const amount = Math.floor(seconds / interval.value);
        if (amount !== 0) {
            return rtf.format(-amount, interval.name);
        }
    }

    return rtf.format(0, 'second'); // Default fallback
};