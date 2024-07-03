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
        const json = await res.json()
        return json.data
    }catch(err) {
        console.log(err)
    }
}


async function render(){

    const events = await getEvents();
    console.log(events);
    const eventsHTML = events.map((event)=>{{
        const eventContainer = document.createElement("div");
        const eventParagraph = document.createElement("p");
        eventParagraph.innerText = `${event.name} ${event.description} ${event.location} ${event.data}`;
        deleteButton.innerText = "Delete";
        eventContainer.appendChild(eventParagraph)
        eventConatiner.appendChild(deleteButton);
        return eventContainer;
    }});
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
        locatoin: partyLocation.value,
        date: new Date(partyDate.value).toISOString(),
    };
    const result = await createEvent (newParty);
    console.log(result);

}
);



container.replaceChildren(...eventsHTML);

async function render() {
    const events = await getEvents();
    createEventsHTML(events, partyContainer);
}

render()