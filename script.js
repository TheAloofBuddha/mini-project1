// Utility: select helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// Set current year in footer
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = $("#navToggle");
const navLinks = $(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.getAttribute("data-open") === "true";
    navLinks.style.display = isOpen ? "" : "inline-flex";
    navLinks.setAttribute("data-open", String(!isOpen));
  });
}

// Header scroll effect
const headerEl = document.querySelector('.header');
if (headerEl) {
  const onScroll = () => {
    if (window.scrollY > 10) headerEl.classList.add('scrolled');
    else headerEl.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
$$('.reveal').forEach((el) => observer.observe(el));

// Booking form logic
const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const applicantName = document.getElementById("name").value.trim();
    const age = Number(document.getElementById("age").value);
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const appointmentDate = document.getElementById("preferredDate").value;
    const duration = document.getElementById("duration");
    const counsellingType = document.getElementById("counsellingType");

    const counsellor = document.getElementsByName("counsellor");
    const sessionTime = document.getElementsByName("pick-slot");

    if (!applicantName) { alert("Please enter your full name."); return; }
    if (!Number.isFinite(age) || age < 18) { alert("You must be 18 or older."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert("Enter a valid email."); return; }
    if (!/^\d{11}$/.test(phone)) { alert("Enter an 11‑digit phone number."); return; }

    // Date pricing within 7 days gets a convenience fee
    const now = new Date();
    const chosen = new Date(appointmentDate);
    const oneWeekOut = new Date(now);
    oneWeekOut.setDate(now.getDate() + 7);

    if (!(chosen instanceof Date) || Number.isNaN(chosen.getTime())) { alert("Choose a valid date."); return; }

    const price = [];
    price.push(chosen <= oneWeekOut ? 20 : 50);

    const selectedDuration = duration.value;
    if (selectedDuration === "thirty-minutes") price.push(30);
    else if (selectedDuration === "one-hour") price.push(55);
    else if (selectedDuration === "two-hours") price.push(100);
    else if (selectedDuration === "four-hours") price.push(180);
    else if (selectedDuration === "half-day") price.push(270);
    else if (selectedDuration === "full-day") price.push(500);

    const selectedDurationText = duration.options[duration.selectedIndex].text;

    let sessionSlotValue = null;
    for (let i = 0; i < sessionTime.length; i++) {
      if (sessionTime[i].checked) { sessionSlotValue = sessionTime[i].value; break; }
    }
    let selectedSessionSlot = null;
    if (sessionSlotValue === "nine") { price.push(0); selectedSessionSlot = "9:00am"; }
    else if (sessionSlotValue === "tenThirty") { price.push(0); selectedSessionSlot = "10:30am"; }
    else if (sessionSlotValue === "twelve") { price.push(5); selectedSessionSlot = "12:00pm"; }
    else if (sessionSlotValue === "two") { price.push(5); selectedSessionSlot = "2:00pm"; }
    else if (sessionSlotValue === "four") { price.push(7); selectedSessionSlot = "4:00pm"; }
    else if (sessionSlotValue === "emergency") { price.push(20); selectedSessionSlot = "Emergency"; }
    else { alert("Pick a session time."); return; }

    const selectedType = counsellingType.value;
    if (selectedType === "individuals") price.push(20);
    else if (selectedType === "couples") price.push(60);
    else if (selectedType === "family") price.push(65);
    else if (selectedType === "work") price.push(40);

    const assignedType = counsellingType[counsellingType.selectedIndex].text;

    const totalCost = price.reduce((sum, n) => sum + n, 0);

    let selectedCounsellor = null;
    for (let i = 0; i < counsellor.length; i++) {
      if (counsellor[i].checked) { selectedCounsellor = counsellor[i].value; break; }
    }

    let assignedCounsellor = null;
    if (selectedCounsellor === "angela") assignedCounsellor = "Counsellor Angela";
    else if (selectedCounsellor === "faith") assignedCounsellor = "Counsellor Faith";
    else if (selectedCounsellor === "carol") assignedCounsellor = "Counsellor Carol";
    else if (selectedCounsellor === "paul") assignedCounsellor = "Counsellor Paul";
    else { alert("Pick a counsellor."); return; }

    // Enforce simple mapping rule
    if (selectedType === "individuals" && selectedCounsellor !== "angela") { alert("For Individual, select Counsellor Angela."); return; }
    if (selectedType === "couples" && selectedCounsellor !== "faith") { alert("For Couples, select Counsellor Faith."); return; }
    if (selectedType === "family" && selectedCounsellor !== "carol") { alert("For Family, select Counsellor Carol."); return; }
    if (selectedType === "work" && selectedCounsellor !== "paul") { alert("For Work, select Counsellor Paul."); return; }

    const confirmationDiv = document.getElementById("confirmation");
    if (!confirmationDiv) return;
    confirmationDiv.innerHTML = `
      <div class="form-shell">
        <h3 style="margin-top:0">Confirm your booking</h3>
        <div class="cards-grid" style="grid-template-columns: repeat(2, 1fr); gap: 12px;">
          <p><strong>Name:</strong> ${applicantName}</p>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date:</strong> ${appointmentDate}</p>
          <p><strong>Duration:</strong> ${selectedDurationText}</p>
          <p><strong>Type:</strong> ${assignedType}</p>
          <p><strong>Counsellor:</strong> ${assignedCounsellor}</p>
          <p><strong>Session:</strong> ${selectedSessionSlot}</p>
          <p><strong>Total:</strong> $${totalCost}</p>
        </div>
        <div class="form-actions" style="margin-top: 10px;">
          <button id="confirm-booking" class="button button-primary">Confirm booking</button>
        </div>
      </div>
    `;

    const confirmBtn = document.getElementById("confirm-booking");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        alert("Booking confirmed. We’ll email details shortly.");
        confirmationDiv.innerHTML = `
          <div class="form-shell">
            <h3 style="margin:0">Booking confirmed</h3>
            <p style="color: var(--muted);">A confirmation email will be sent to ${email}.</p>
          </div>
        `;
      });
    }
  });
}
