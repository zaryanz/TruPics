const API_URL = 'http://0.0.0.0:5000/search';
const test = 'https://c.ndtvimg.com/2020-01/mtqb0nto_hyderabad-caa-protests-pti_625x300_06_January_20.jpg';
const form = document.getElementById("form");
const inputField = document.getElementById("img-url");
const loading = document.querySelector(".loading");
const alert = document.querySelector(".alert");
const heatmap = document.querySelector("#cal-heatmap");
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
  alert.className = 'alert';
  heatmap.innerHTML = '';
  alert.innerHTML = '';
  loading.style.display = 'block';
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
        cellSize: 20,
        range: 7,
        colLimit: 5,
        label: {
          width: 10
        }
      });
      loading.style.display = 'none';
      // console.log((largest - smallest) / (60 * 60 * 24 * 30 * 1000));
      const deltaMonths = (largest - smallest) / (60 * 60 * 24 * 30 * 1000);
      if (deltaMonths > 8) {
        alert.className += ' alert-danger';
        alert.innerHTML += '<h4>Image is fake</h4>';
      }
      else if (deltaMonths >= 6) {
        alert.className += ' alert-info';
        alert.innerHTML += '<h4>Image may be fake</h4>';
      }
      else {
        alert.className += ' alert-success';
        alert.innerHTML += '<h4>Image may be legit</h4>';
      }
    });
  e.preventDefault();
});
