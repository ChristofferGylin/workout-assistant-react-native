export const millisToTime = (millis) => {

    let rest = millis % 60000;
    let minutes = (millis - rest) / 60000;
    millis = rest;
    rest = millis % 1000;
    let seconds = (millis - rest) / 1000;
    millis = rest;

    let minutesText;
    let secondsText;
    let millisText;

    if (minutes < 10) {
        minutesText = `0${minutes}`;
    } else {
        minutesText = `${minutes}`;
    }

    if (seconds < 10) {
        secondsText = `0${seconds}`;
    } else {
        secondsText = `${seconds}`;
    }

    millis = Math.round(millis);

    if (millis < 10) {
        millisText = `00${millis}`;
    } else if (millis < 100) {
        millisText = `0${millis}`;
    } else {
        millisText = `${millis}`;
    }

    return `${minutesText}:${secondsText}:${millisText}`;

}