import { days } from "../Constants/Days";
import { months } from "../Constants/Months";
export function getdata(day1) {
    let currDay = days[day1.slice(0, 3)];
    let currMonth = months[day1.slice(4, 7)];
    let currDate = day1.slice(8, 10);
    let currYear = day1.slice(11, 15);
    let fullDate = currDate + "/" + currMonth + "/" + currYear;
    return { currDay, fullDate };
  }
 
  export function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  }