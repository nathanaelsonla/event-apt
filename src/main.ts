import { Event } from "./models/Event.js";
import { User } from "./models/User.js";
import { Registration } from "./models/Registration.js";

/* =======================
   TABLEAUX DE STOCKAGE
======================= */
const events: Event[] = [];
const users: User[] = [];
const registrations: Registration[] = [];

/* =======================
   ELEMENTS HTML
======================= */
const eventForm = document.getElementById("event-form") as HTMLFormElement | null;
const eventList = document.getElementById("event-list") as HTMLDivElement | null;
const filterCategory = document.getElementById("filter-category") as HTMLSelectElement | null;
const filterDate = document.getElementById("filter-date") as HTMLInputElement | null;
const showPast = document.getElementById("show-past") as HTMLInputElement | null;
const pastEventList = document.getElementById("past-event-list") as HTMLDivElement | null;
const modal = document.getElementById("event-modal") as HTMLDivElement | null;
const modalBody = document.getElementById("modal-body") as HTMLDivElement | null;
const modalClose = document.getElementById("modal-close") as HTMLButtonElement | null;
const registrationModal = document.getElementById("registration-modal") as HTMLDivElement | null;
const registrationForm = document.getElementById("registration-form") as HTMLFormElement | null;
const registrationModalClose = document.getElementById("registration-modal-close") as HTMLButtonElement | null;
const registrationCancel = document.getElementById("registration-cancel") as HTMLButtonElement | null;

if (!eventForm) throw new Error("Element with id 'event-form' not found in DOM");
if (!eventList) throw new Error("Element with id 'event-list' not found in DOM");
if (!filterCategory) throw new Error("Element with id 'filter-category' not found in DOM");
if (!filterDate) throw new Error("Element with id 'filter-date' not found in DOM");
if (!showPast) throw new Error("Element with id 'show-past' not found in DOM");
if (!pastEventList) throw new Error("Element with id 'past-event-list' not found in DOM");
if (!modal || !modalBody || !modalClose) throw new Error("Modal elements not found in DOM");
if (!registrationModal || !registrationForm || !registrationModalClose || !registrationCancel) throw new Error("Registration modal elements not found in DOM");

let currentEventId: number | null = null;

/* =======================
   CREATION EVENEMENT
======================= */
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = (document.getElementById("title") as HTMLInputElement).value;
  const description = (document.getElementById("description") as HTMLTextAreaElement).value;
  const dateString = (document.getElementById("date") as HTMLInputElement).value;
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const location = (document.getElementById("location") as HTMLInputElement).value;
  const category = (document.getElementById("category") as HTMLSelectElement).value;
  const capacity = Number((document.getElementById("capacity") as HTMLInputElement).value);

  const newEvent = new Event(
    events.length + 1,
    title,
    description,
    date,
    location,
    category,
    capacity
  );

  events.push(newEvent);
  eventForm.reset();
  applyFilters();
});

/* =======================
   AFFICHAGE EVENEMENTS
======================= */
function displayEvents(eventArray: Event[]) {
  eventList!.innerHTML = "";

  const toShow = eventArray.filter(e => !e.isFinished() && !e.isPast());

  if (toShow.length === 0) {
    eventList!.innerHTML = "<p>Aucun évènement disponible.</p>";
    return;
  }

  toShow.forEach(event => {
    const div = document.createElement("div");
    div.className = "event-card";

    div.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date :</strong> ${event.date.toLocaleDateString()}</p>
      <p><strong>Catégorie :</strong> ${event.category}</p>
      <p><strong>Places restantes :</strong> ${event.getRemainingPlaces()}</p>
      <div class="actions">
        <label class="actions-left"><input type="checkbox" data-action="finished" ${event.isFinished() ? 'checked' : ''}> Terminé</label>
        <div class="actions-right">
          <button class="btn" data-action="details">Détails</button>
          <button class="btn btn-register" ${event.isFull() || event.isPast() ? "disabled" : ""} data-action="register">S'inscrire</button>
          <button class="btn btn-delete" data-action="delete">Supprimer</button>
        </div>
      </div>
    `;

    const finishedChk = div.querySelector("input[data-action=finished]") as HTMLInputElement | null;
    const registerBtn = div.querySelector("button[data-action=register]") as HTMLButtonElement | null;
    const deleteBtn = div.querySelector("button[data-action=delete]") as HTMLButtonElement | null;

    const detailsBtn = div.querySelector("button[data-action=details]") as HTMLButtonElement | null;

    if (finishedChk) finishedChk.addEventListener("change", () => toggleFinished(event.id, finishedChk.checked));
    if (registerBtn) registerBtn.addEventListener("click", () => registerToEvent(event.id));
    if (deleteBtn) deleteBtn.addEventListener("click", () => deleteEvent(event.id));
    if (detailsBtn) detailsBtn.addEventListener("click", () => showDetails(event.id));

    eventList!.appendChild(div);
  });
}

function toggleFinished(eventId: number, value: boolean) {
  const ev = events.find(e => e.id === eventId);
  if (!ev) return;
  ev.markFinished(value);
  displayEvents(events);
  displayPastEvents();
}

function displayPastEvents() {
  if (!showPast!.checked) {
    pastEventList!.innerHTML = "";
    const parent = pastEventList!.parentElement as HTMLElement | null;
    if (parent) parent.style.display = 'none';
    return;
  }

  const parent = pastEventList!.parentElement as HTMLElement | null;
  if (parent) parent.style.display = '';

  const list = events.filter(e => e.isFinished() || e.isPast());
  pastEventList!.innerHTML = "";
  if (list.length === 0) {
    pastEventList!.innerHTML = "<p>Aucun évènement terminé.</p>";
    return;
  }

  list.forEach(event => {
    const div = document.createElement('div');
    div.className = 'event-card';
    div.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date :</strong> ${event.date.toLocaleDateString()}</p>
      <p><strong>Lieu :</strong> ${event.location}</p>
    `;
    pastEventList!.appendChild(div);
  });
}

showPast!.addEventListener('change', () => {
  displayEvents(events);
  displayPastEvents();
});

function showDetails(eventId: number) {
  const ev = events.find(e => e.id === eventId);
  if (!ev) return;
  modalBody!.innerHTML = `
    <h3>${ev.title}</h3>
    <p><strong>Description :</strong> ${ev.description}</p>
    <p><strong>Date :</strong> ${ev.date.toLocaleString()}</p>
    <p><strong>Lieu :</strong> ${ev.location}</p>
    <p><strong>Catégorie :</strong> ${ev.category}</p>
    <p><strong>Capacité :</strong> ${ev.capacity}</p>
    <p><strong>Places restantes :</strong> ${ev.getRemainingPlaces()}</p>
  `;
  modal!.classList.remove('hidden');
  modal!.setAttribute('aria-hidden', 'false');
}

modalClose!.addEventListener('click', () => {
  modal!.classList.add('hidden');
  modal!.setAttribute('aria-hidden', 'true');
});

/* =======================
   SUPPRESSION EVENEMENT
======================= */
function deleteEvent(eventId: number) {
  const idx = events.findIndex(e => e.id === eventId);
  if (idx === -1) return;
  if (!confirm("Confirmer la suppression de cet évènement ?")) return;
  events.splice(idx, 1);
  for (let i = registrations.length - 1; i >= 0; i--) {
    if (registrations[i].eventId === eventId) registrations.splice(i, 1);
  }
  displayEvents(events);
}

/* =======================
   INSCRIPTION UTILISATEUR
======================= */
function registerToEvent(eventId: number) {
  const event = events.find(e => e.id === eventId);
  if (!event) return;

  if (event.isPast()) {
    alert("Cet évènement est déjà passé.");
    return;
  }

  if (event.isFull()) {
    alert("Cet évènement est complet.");
    return;
  }

  currentEventId = eventId;
  registrationForm!.reset();
  registrationModal!.classList.remove('hidden');
  registrationModal!.setAttribute('aria-hidden', 'false');
  (document.getElementById("reg-name") as HTMLInputElement).focus();
}

registrationForm!.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!currentEventId) return;

  const name = (document.getElementById("reg-name") as HTMLInputElement).value;
  const email = (document.getElementById("reg-email") as HTMLInputElement).value;

  if (!name || !email) {
    alert("Tous les champs sont requis.");
    return;
  }

  const emailDomain = email.split('@')[1];
  if (emailDomain !== 'saintjeaningenieur.org') {
    alert("Email invalide. Veuillez utiliser une adresse @saintjeaningenieur.org");
    return;
  }

  const event = events.find(e => e.id === currentEventId);
  if (!event) return;

  let user = users.find(u => u.email === email);

  if (!user) {
    user = new User(users.length + 1, name, email);
    users.push(user);
  }

  const alreadyRegistered = registrations.some(
    r => r.userId === user!.id && r.eventId === currentEventId
  );

  if (alreadyRegistered) {
    alert("Vous êtes déjà inscrit à cet évènement.");
    return;
  }

  registrations.push(new Registration(user.id, currentEventId));
  event.addRegistration();

  alert("Inscription réussie !");
  registrationModal!.classList.add('hidden');
  registrationModal!.setAttribute('aria-hidden', 'true');
  currentEventId = null;
  displayEvents(events);
});

registrationModalClose!.addEventListener('click', () => {
  registrationModal!.classList.add('hidden');
  registrationModal!.setAttribute('aria-hidden', 'true');
  currentEventId = null;
});

registrationCancel!.addEventListener('click', () => {
  registrationModal!.classList.add('hidden');
  registrationModal!.setAttribute('aria-hidden', 'true');
  currentEventId = null;
});

/* =======================
   FILTRAGE
======================= */
filterCategory!.addEventListener("change", applyFilters);
filterDate!.addEventListener("change", applyFilters);

function applyFilters() {
  let filteredEvents = [...events];

  if (filterCategory!.value) {
    filteredEvents = filteredEvents.filter(
      e => e.category === filterCategory!.value
    );
  }

  if (filterDate!.value) {
    const [year, month, day] = filterDate!.value.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day).toDateString();
    filteredEvents = filteredEvents.filter(
      e => e.date.toDateString() === selectedDate
    );
  }

  displayEvents(filteredEvents);
}



displayEvents(events);
displayPastEvents();
