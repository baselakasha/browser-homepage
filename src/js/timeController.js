class TimeController{
    constructor(splitor= ":", element){
        this.splitor = splitor;
        this.element = element;
    }
    startInterval(){
        this.putTimeIn(this.element);
        setInterval(() => {
            this.putTimeIn(this.element);
        },60000);
    }
    putTimeIn(html_element){
        html_element.innerText = this.getFormatedTime();
    }
    getFormatedTime(){
        const {hours, minutes, seconds} = this.getTimeObjectWithLeadingZeros();
        return `${hours}${this.splitor}${minutes}`;
    }
    getTimeObjectWithLeadingZeros(){
        const time_object = this.getTimeObject();
        return addLeadingZeroToObjectProperties(time_object);
    }
    getTimeObject(){
        const now_date = new Date();
        return {
            "hours": now_date.getHours(),
            "minutes": now_date.getMinutes() 
        }
    }
}