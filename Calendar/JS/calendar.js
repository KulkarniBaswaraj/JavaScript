let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let event = {
    thisday: null,
    list : [],
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");


const next = () => {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

const previous = () => {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

generateList = (events) => {
    let eventsList = '';
    if(events.length > 0) {
        document.getElementById('events_header').innerHTML = 'List of events'
        events.forEach(ev => {
            eventsList += `<li> ${ev} </li>`
        });
    } else {
        eventsList = `<li> No events found </li>`
        document.getElementById('events_header').innerHTML = "";
    }
    document.getElementById('events_list').innerHTML = eventsList;
}

const showEvents = (e = event.thisDay) => {
    event.thisDay = typeof e == "string" ? e : e.target.dataset.store;
    console.log(event.thisDay);
    try {
        event.list = JSON.parse(localStorage.getItem(event.thisDay));
        if(Array.isArray(event.list)) {
            generateList(event.list)
        } else {
            generateList([]);
        }
    } catch (error) {
        console.log(error)   
    }
}

addEvents = () => {
    const newEvent = document.getElementById('event_inp').value;
    if(newEvent) {
        const eventList = localStorage.getItem(event.thisDay);
        if(!eventList) {
            localStorage.setItem(event.thisDay, JSON.stringify([newEvent]));
            showEvents();
        } else {
            let lists =  JSON.parse(localStorage.getItem(event.thisDay));
            lists.push(newEvent)
            localStorage.setItem(event.thisDay, JSON.stringify([...lists]));
            showEvents();
        }
    }
}
// showCalendar(currentMonth, currentYear);

const showCalendar = (month, year) => {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                cell.classList.add('empty');
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("today");
                    event.thisDay = `${date}${month}${year}`;
                    showEvents();
                } // color today's date
                cell.appendChild(cellText);
                cell.addEventListener("click", showEvents);
                cell.setAttribute('data-store', `${date}${month}${year}`)
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

showCalendar(currentMonth, currentYear);