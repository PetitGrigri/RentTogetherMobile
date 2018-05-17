
const optionsDateTimeFormat = {
    year: "numeric", 
    month: "numeric", 
    day: "numeric",
    hour: "numeric", 
    minute: "numeric", 
    second: "numeric",
    hour12: false
};

export const toString = (unformatedDateTime) => {
    let dateTime = Date.parse(unformatedDateTime);
    return Intl.DateTimeFormat('fr-FR', optionsDateTimeFormat).format(dateTime);
}