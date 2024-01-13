export function formatPostTime(unconvertedDate: string) {
    let date = new Date(unconvertedDate);
    //get the current date
    let currentDate = new Date();
    //get the inputted date and current date in seconds
    let seconds = date.getTime() / 1000;
    let currentSeconds = currentDate.getTime() / 1000;
    //get the seconds since the post was made
    let secondsAgo = Math.floor(currentSeconds - seconds);
    //if the post was made less than a minute ago return the seconds since the post was made
    if (secondsAgo < 60) {
        return `${secondsAgo} sec ago`;
    }
    //if the post was made less than an hour ago return the minutes since the post was made
    let minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
        return `${minutesAgo} min ago`;
    }
    //if the post was made less than a day ago return the hours since the post was made
    let hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
        return `${hoursAgo} hr ago`;
    }
    //if the post was made less than a week ago return the days since the post was made
    let daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
        return `${daysAgo} dy ago`;
    }
    //if the post was made less than a month ago return the weeks since the post was made
    let weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
        return `${weeksAgo} wk ago`;
    }
    //if the post was made less than a year ago return the months since the post was made
    let monthsAgo = Math.floor(weeksAgo / 4);
    return `${monthsAgo} mo ago`;
}
