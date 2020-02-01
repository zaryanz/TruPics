const API_URL = 'http://0.0.0.0:5000/search';
const test = 'https://c.ndtvimg.com/2020-01/mtqb0nto_hyderabad-caa-protests-pti_625x300_06_January_20.jpg';
const form = document.getElementById("form");
const inputField = document.getElementById("img-url");
let month = '', year = '', day = '';
let dateArray = [];

const calculateYear = (element) => {
  if (element !== null) {
    year = '';
    for (let j = 0; j < 4; j++) {
      year += element[j];
    }
    return year;
  }
  else {
    return null;
  }
};

const calculateMonth = (element) => {
  if (element !== null) {
    month = '';
    for (let j = 5; j < 7; j++) {
      month += element[j];
    }
    return month;
  }
  else {
    return null;
  }
};

const calculateDay = (element) => {
  if (element !== null) {
    day = '';
    for (let j = 8; j < 10; j++) {
      day += element[j];
    }
    return day;
  }
  else {
    return null;
  }
};

form.addEventListener("submit", (e) => {
  dateArray = [];
  const formData = new FormData(form);
  const url = formData.get("img-url");
  console.log(url);
  inputField.value = '';
  fetch('http://0.0.0.0:2000/', {
    method: 'POST',
    body: JSON.stringify({ url: url }),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())
    .then((data) => {
      console.log(data);
      const arr = data.sup;
      for (i = 0; i < arr.length; i++) {
        // console.log(arr[i]);
        const year = calculateYear(arr[i]);
        const month = calculateMonth(arr[i]);
        const day = calculateDay(arr[i]);
        if (year !== null && month !== null && day !== null) {
          const date = new Date(year, month, day);
          console.log(date);
          dateArray.push(date);
        }
        else {
          console.log(null);
        }
      }
      console.log({ dates: dateArray });
      let largest = dateArray[0];
      let smallest = dateArray[0];
      for (i = 0; i < dateArray.length; i++) {
        if (dateArray[i] > largest) {
          largest = dateArray[i];
        }
      }
      for (i = 0; i < dateArray.length; i++) {
        if (dateArray[i] < smallest) {
          smallest = dateArray[i];
        }
      }
      console.log(largest);
      console.log(smallest);
      var cal = new CalHeatMap();
      cal.init({
        highlight: dateArray,
        start: smallest,
        domain: 'year',
        subDomain: 'month',
        displayLegend: false,
        cellSize: 25,
        label: {
          width: 10
        }
      });
    });
  e.preventDefault();
});
