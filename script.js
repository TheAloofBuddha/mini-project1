document.getElementById("form").onsubmit = function (e) {
  e.preventDefault();

  let applicantName = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;

  let appointmentDate = document.getElementById("preferredDate").value;

  let duration = document.getElementById("duration");
  let counsellingType = document.getElementById("counsellingType");

  let counsellor = document.getElementsByName("counsellor");
  let sessionTime = document.getElementsByName("pick-slot");

  let now = new Date();
  let dateAppoint = now.getDate;
  let timeAppoint = now.getTime;

  if (age < 18) {
    alert("You have to be 18 or above to book a session.");
    return;
  }

  let price = [];

  let oneWeek = new Date(now);
  oneWeek.setDate(now.getDate() + 7);
  let lateWeek = oneWeek;

  if (appointmentDate <= lateWeek) {
    price.push(20);
  } else {
    price.push(50);
  }

  let selectedDuration = duration.value;

  if (selectedDuration == "thirty-minutes") {
    price.push(30);
  } else if (selectedDuration == "one-hour") {
    price.push(55);
  } else if (selectedDuration == "two-hours") {
    price.push(100);
  } else if (selectedDuration == "four-hours") {
    price.push(180);
  } else if (selectedDuration == "half-day") {
    price.push(270);
  } else {
    price.push(500);
  }

  let selectedDurationText = duration.options[duration.selectedIndex].text;

  let selectedSessionSlot;
  let sessionSlot;
  for (let i = 0; i < sessionTime.length; i++) {
    if (sessionTime[i].checked) {
      sessionSlot = sessionTime[i].value;
    }
  }
  if (sessionSlot == "nine") {
    price.push(0);
    selectedSessionSlot = "9:00am";
  } else if (sessionSlot == "tenThirty") {
    price.push(0);
    selectedSessionSlot = "10:30am";
  } else if (sessionSlot == "twelve") {
    price.push(5);
    selectedSessionSlot = "12:00pm";
  } else if (sessionSlot == "two") {
    price.push(5);
    selectedSessionSlot = "2:00pm";
  } else if (sessionSlot == "four") {
    price.push(7);
    selectedSessionSlot = "4:00pm";
  } else if (sessionSlot == "emergency") {
    price.push(20);
    selectedSessionSlot = "Emergency";
  } else {
    alert("Pick a session");
    return;
  }

  let selectedType = counsellingType.value;

  if (selectedType == "individuals") {
    price.push(20);
  } else if (selectedType == "couples") {
    price.push(60);
  } else if (selectedType == "family") {
    price.push(65);
  } else {
    price.push(40);
  }

  let assignedType = counsellingType[counsellingType.selectedIndex].text;

  let totalCost = 0;
  for (i = 0; i < price.length; i++) {
    totalCost += price[i];
  }

  let selectedCounsellor;

  for (let i = 0; i < counsellor.length; i++) {
    if (counsellor[i].checked) {
      selectedCounsellor = counsellor[i].value;
      break;
    }
  }

  let assignedCounsellor;
  if (selectedCounsellor == "angela") {
    assignedCounsellor = "Counsellor Angela";
  } else if (selectedCounsellor == "faith") {
    assignedCounsellor = "Counsellor Faith";
  } else if (selectedCounsellor == "carol") {
    assignedCounsellor = "Carol";
  } else if (selectedCounsellor == "paul") {
    assignedCounsellor = "Counsellor Paul";
  } else {
    alert("Pick a counsellor");
  }

  if (selectedType == "individuals" && selectedCounsellor != "angela") {
    alert("If Individual Counselling, Select Counsellor Angela");
  } else if (selectedType == "couples" && selectedCounsellor != "faith") {
    alert("If Couples Counselling, Select Counsellor Faith");
  } else if (selectedType == "family" && selectedCounsellor != "carol") {
    alert("If Family Counselling, Select Counsellor Carol");
  } else if (selectedType == "work" && selectedCounsellor != "paul") {
    alert("If Work/Business Counselling, Select Counsellor Paul");
  } else {
    confirmation();
  }

  function confirmation() {
    let confirmationDiv = document.getElementById("confirmation");

    confirmationDiv.innerHTML = `
      <p><strong>Name:</strong> ${applicantName}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <p><strong>Appointment Date:</strong> ${appointmentDate}</p>
      <p><strong>Session Duration:</strong> ${selectedDurationText} Session</p>
      <p><strong>Counselling Type:</strong> ${assignedType}</p>
      <p><strong>Selected Counsellor:</strong> ${assignedCounsellor}</p>
      <p><strong>Selected Session:</strong> ${selectedSessionSlot}</p>
      <p><strong>Total Price:</strong> $${totalCost}</p>
      <button id="confirm-booking">Confirm Booking</button>
    `;
    confirmButton();
  }

  function confirmButton() {
    let confirmBtn = document.getElementById("confirm-booking");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        alert("Booking Confirmed");
        let confirmationDiv = document.getElementById("confirmation");
        confirmationDiv.innerHTML = `
          <p><strong>Name:</strong> ${applicantName}</p>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Appointment Date:</strong> ${appointmentDate}</p>
          <p><strong>Session Duration:</strong> ${selectedDurationText} Session</p>
          <p><strong>Counselling Type:</strong> ${assignedType}</p>
          <p><strong>Selected Counsellor:</strong> ${assignedCounsellor}</p>
          <p><strong>Selected Session:</strong> ${selectedSessionSlot}</p>
          <p><strong>Total Price:</strong> $${totalCost}</p>
        `;
      });
    }
  }
};
