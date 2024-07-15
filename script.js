const partyContainer = document.querySelector("#party-container");
const newPartyForm = document.querySelector("#party-name");
const partyName = document.querySelector("#party-name");
const partyDescription = document.querySelector("#description");
const partyDate = document.querySelector("#party-date");
const partyLocation = document.querySelector("#party-location");

async function getEvents(){
    try{
        const res = await fetch(
            "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events"
        );
        console.log(res);
        const json = await res.json();
        return json.data;
    } catch(err) {
        console.log(err);
    }
}

function createEventsHTML(events, container) {
  const eventsHTML = events.map((event) => {
    const eventContainer = document.createElement("div");
    const eventParagraph = document.createElement("p");
    eventParagraph.innerText = `${event.name} ${event.desricption} ${event.location} ${event.date}`;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", async function () {
      try {
        const res = await fetch(
          `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events/${event.id}`,
          {
            method: "DELETE",
          }
        );
        console.log(res);
        if (res.status === 204) {
          alert("deleted sucessfully");
          render();
        }
      } catch (err) {
        console.log(err);
      }
    });
    eventContainer.appendChild(eventParagraph);
    eventContainer.appendChild(deleteButton);
    return eventContainer;
  });
  container.replaceChildren(...eventsHTML);
}

async function createEvent(event) {
    try {
      const res = await fetch(
        "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events",
        {
          method: "POST",
          body: JSON.stringify(event),
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const json = await res.json();
      render();
    } catch (err) {
      console.log(err);
    }
  }


newPartyForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const newParty = {
        name: partyName.value,
        description: partyDescription.value,
        location: partyLocation.value,
        date: new Date(partyDate.value).toISOString(),
    };
    await createEvent (newParty);
    newPartyForm.reset;

});

async function render() {
    const events = await getEvents();
    createEventsHTML(events, partyContainer);
}

render()