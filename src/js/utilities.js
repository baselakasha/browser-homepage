function addLeadingZero(num){
    return String(num).padStart(2, '0');
}
function addLeadingZeroToObjectProperties(object){
    for(const prop in object){
        object[prop] = addLeadingZero(object[prop]);
    }
    return object;
}