class DateController{
    constructor(splitor = "/"){
        this.date = new Date();
        this.splitor = splitor;
    }
    putDateIn(html_element){
        html_element.innerText = this.getFormatedDate();
    }
    getFormatedDate(){
        const {day, month, year} = this.getDateObjectWithLeadingZeros();
        return `${day}${this.splitor}${month}${this.splitor}${year}`;
    }
    getDateObjectWithLeadingZeros(){
        const date_object = this.getDateObject();
        return addLeadingZeroToObjectProperties(date_object);
    }
    getDateObject() {
        return {
            "day": this.date.getDate(),
            "month": this.date.getMonth() + 1,
            "year": this.date.getFullYear()
        };
    }
}