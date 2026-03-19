/* global data used by filter function*/
const itineraries = [
  {
    id: 1,
    destination: ["italy"],
    cities: ["rome", "naples", "pompeii", "sorrento"],
    theme: ["ancient-rome"],
    departure: ["cork", "dublin"],
    imageSrc: "assets/images/ItalyCardImage1.webp",
    imageAlt: "Photo of Colosseum superimposed on Positano Beach",
    title: "Rome, Naples & Amalfi",
    details: "8 days - From €1,899 pp",
    href: "/itineraryitaly1.html",
    
  },
  {
    id: 2,
    destination: ["italy"],
    cities: ["florence", "siena", "san-gimignano", "pisa"],
    theme: ["renaissance"],
    departure: ["cork", "dublin", "shannon"],
    imageSrc: "assets/images/tuscanycard.webp",
    imageAlt: "Tuscan countryside with Duomo di Firenze in background",
    title: "Tuscany",
    details: "7 days - From €1,599 pp",
    href: "/itineraryitaly2.html",
    
  },
  {
    id: 3,
    destination: ["austria", "italy"],
    cities: ["salzburg", "vienna", "venice"],
    theme: ["baroque"],
    departure: ["dublin", "shannon"],
    imageSrc: "assets/images/AustriaVeniceCard.webp",
    imageAlt: "Composite Photo of Austrian and Venetian landmarks",
    title: "Austria & Venice",
    details: "10 days - From €2,000 pp",
    href: "/itineraryaustria.html",
    
  },
  {
    id: 4,
    destination: ["czech-republic"],
    cities: ["prague", "karlstejn", "cesky-krumlov"],
    theme: ["medieval"],
    departure: ["dublin", "shannon"],
    imageSrc: "assets/images/CzechRepublicCard.webp",
    imageAlt:
      "Composite image of Prague Castle, Charles Bridge and Cesky Krumlov in Czechia",
    title: "Czech Republic",
    details: "8 days - From €1,699 pp",
    href: "/itineraryczechia.html",
   
  },
  {
    id: 5,
    destination: ["spain"],
    cities: ["seville", "ronda", "grenada", "gibraltar"],
    theme: ["renaissance"],
    departure: ["dublin", "shannon"],
    imageSrc: "assets/images/AndalusiaCard.webp",
    imageAlt: "Photo of Seville's Plaza de España",
    title: "Andalusia",
    details: "10 days - From €1,899 pp",
    href: "/itineraryandulusia.html",
    
  },
  {
    id: 6,
    destination: ["ireland", "scotland"],
    cities: ["cork", "dublin", "belfast", "edinburgh", "stirling"],
    theme: ["celtic"],
    departure: ["dublin", "cork"],
    imageSrc: "assets/images/IrelandScotlandCard.webp",
    imageAlt: "Composite image of Ireland and Scotland historical sites",
    title: "Ireland & Scotland",
    details: "10 days - From €1,495 pp",
    href: "/itineraryireland.html",
    
  },
];

/* dom content loaded function with page detection*/
document.addEventListener("DOMContentLoaded", () => {
  validateForms();

  const page = document.body.id;
  console.log(page);

  if (page === "page-home") {
    LocationCardsRedirect();
    searchFormRedirect();
  } else if (page === "page-search-results") {
    filterResults();
    LocationCardsRedirect();
  }

  if (document.body.classList.contains("page-itinerary")) {
    createBookingFormModal();
  }

  thumbCTAToggle();
});

/**
 * initMap creates Google Maps API instance utilising data attributes from #map-container element
 * and on success, passes map and markerData to createMarker() to create advanced markers and infoWindows.
 */

async function initMap() {
  const container = document.querySelector("#map-container");
  if (!container) {
    throw new Error("No map containers found");
  }

  try {
    const mapInstance = new google.maps.Map(container, {
      center: {
        lat: parseFloat(container.dataset.lat),
        lng: parseFloat(container.dataset.lng),
      },
      zoom: parseInt(container.dataset.zoom),
      mapId: "DEMO_MAP_ID",
    });

    const markerid = container.dataset.markerid;
    const markersCoordinates = {
      rome: [
        {
          lat: 41.9028,
          lng: 12.4964,
          city: "Rome",
          header: "Day 1-3",
          ariaLabel: "Rome Info Window",
        }, // Rome
        {
          lat: 40.8518,
          lng: 14.2681,
          city: "Naples",
          header: "Day 4-5",
          ariaLabel: "Naples Info Window",
        }, // Naples
        {
          lat: 40.6263,
          lng: 14.3757,
          city: "Sorrento",
          header: "Day 6",
          ariaLabel: "Sorrento Info Window",
        }, // Sorrento
      ],
      tuscany: [
        {
          lat: 43.7696,
          lng: 11.2558,
          city: "Florence",
          header: "Days 1-3",
          ariaLabel: "Florence Info Window",
        }, // Florence
        {
          lat: 43.3182,
          lng: 11.3306,
          city: "Siena",
          header: "Days 4-6",
          ariaLabel: "Siena Info Window",
        }, // Siena
        {
          lat: 43.4703,
          lng: 11.0438,
          city: "San Gimignano",
          header: "Day Trip",
          ariaLabel: "San Gimignano Info Window",
        }, // San Gimignano
        {
          lat: 43.7167,
          lng: 10.4,
          city: "Pisa",
          header: "Days 7-9",
          ariaLabel: "Pisa Info Window",
        }, // Pisa
      ],
      austria: [
        {
          lat: 47.8112,
          lng: 13.0332,
          city: "Salzburg",
          header: "Days 1-3",
          ariaLabel: "Salzburg Info Window",
        }, // Salzburg
        {
          lat: 48.21,
          lng: 16.3634,
          city: "Vienna",
          header: "Days 4-7",
          ariaLabel: "Vienna Info Window",
        }, // Vienna
        {
          lat: 45.4388,
          lng: 12.3271,
          city: "Venice",
          header: "Days 8-10",
          ariaLabel: "Venice Info Window",
        }, // Venice
      ],
      czechia: [
        {
          lat: 50.0737,
          lng: 14.4185,
          city: "Prague",
          header: "Days 1-4",
          ariaLabel: "Prague Info Window",
        },
        {
          lat: 49.9394,
          lng: 14.1881,
          city: "Karlštejn",
          header: "Day 5",
          ariaLabel: "Karlštejn Info Window",
        },
        {
          lat: 48.8109,
          lng: 14.3152,
          city: "Cesky Krumlov",
          header: "Day 6",
          ariaLabel: "Cesky Krumlov Info Window",
        },
      ],
      andalusia: [
        {
          lat: 37.3925,
          lng: -5.9941,
          city: "Seville",
          header: "Days 1-3",
          ariaLabel: "Seville Info Window",
        },
        {
          lat: 36.7462,
          lng: -5.1612,
          city: "Ronda",
          header: "Day 4-5",
          ariaLabel: "Ronda Info Window",
        },
        {
          lat: 37.1781,
          lng: -3.6008,
          city: "Grenada",
          header: "Day 7-9",
          ariaLabel: "Grenada Info Window",
        },
        {
          lat: 36.132,
          lng: -5.3529,
          city: "Gibraltar",
          header: "Days 6",
          ariaLabel: "Gibraltar Info Window",
        },
      ],
      ireland: [
        {
          lat: 51.9375,
          lng: -8.5708,
          city: "Blarney Castle",
          header: "Days 1-2",
          ariaLabel: "Blarney Castle Info Window",
        }, // Cork
        {
          lat: 52.5207,
          lng: -7.892,
          city: "Rock of Cashel",
          header: "Day 3",
          ariaLabel: "Rock of Cashel Info Window",
        }, // Cashel
        {
          lat: 53.3501,
          lng: -6.2661,
          city: "Dublin",
          header: "Days 4-5",
          ariaLabel: "Dublin Info Window",
        }, // Dublin
        {
          lat: 54.5973,
          lng: -5.9301,
          city: "Belfast",
          header: "Day 6",
          ariaLabel: "Belfast Info Window",
        }, // Belfast
        {
          lat: 55.9754,
          lng: -3.1935,
          city: "Edinburgh",
          header: "Days 7-9",
          ariaLabel: "Edinburgh Info Window",
        }, // Edinburgh
        {
          lat: 56.1221,
          lng: -3.9462,
          city: "Stirling",
          header: "Day 10",
          ariaLabel: "Stirling Info Window",
        }, // Stirling
      ],
    };

    createMarker(mapInstance, markersCoordinates[markerid]); // pass map instance and locations object matching index markerId.

    // error handling as decribed Google API docs
  } catch (error) {
    if (error && error instanceof google.maps.MapsRequestError) {
      //Bad Request 4xx error
      console.error(`Map error: Invalid Request`, error);
      container.innerHTML =
        "<p class='text-danger'>Map Configuration Error.</p>"; // on error insert p element into map container with Bootstrap text-danger class
    } else if (error && error instanceof google.maps.MapsServerError) {
      //Google server error 5xx
      console.error("Map error: Google server error", error);
      container.innerHTML =
        "<p class='text-danger'>Map temporarily unavailable.</p>";
    } else if (error instanceof google.maps.MapsNetworkError) {
      // User connectivity issue
      console.error("Map error: Network error - check connection", error);
      container.innerHTML =
        "<p class='text-danger'>Map unavailable - check your connection.</p>";
    } else {
      console.error(`Map error:${error.message}`);
      container.innerHTML = "<p class='text-danger'>Unknown Error Occured</p>"; // on error insert p element into map container with Bootstrap text-danger class
    }
  }
}

/**
 * createMarker creates Google API advanced markers and infoWindows on marker click.
 * @param {google.maps.Map} map - The Google Maps instance created by initMap().
 * @param {array<Object>} markerData - Object holding itinery marker details.
 */
function createMarker(map, markerData) {
  markerData.forEach((location) => {
    //style map markers gold and black
    const pin = new google.maps.marker.PinElement({
      background: "#c9940a",
      borderColor: "#ffffff",
      glyphColor: "#3a3a3a",
      scale: 1.1,
    });

    //create markers from MarkerData
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.city,
      content: pin.element,
    });

    // create header html element and assign class
    const header = document.createElement("h6");
    header.className = "info-window-header";
    header.textContent = location.header;

    //create infoWindows
    const infoWindow = new google.maps.InfoWindow({
      headerContent: header,
      maxWidth: 240,
      ariaLabel: location.ariaLabel,
      content: `<div class="info-window-style">${location.city}</div>`,
    });

    // add click listeners to markers for infoWindows
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}

/**
 * Add click listeners to all location-grid .cards on index.html and redirect to data-href
 */
function LocationCardsRedirect() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (card && e.currentTarget.dataset.href) {
        window.location.href = e.currentTarget.dataset.href;
      }
    });
  });
}
/**Validate forms using bootstrap utility classes and functions */
function validateForms() {
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (form.checkValidity()) {
        const formData = new FormData(form);

        fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => console.log("Response:", data))
          .catch((e) => console.error("Error:", e));

        showFormSubmissionModal();
      } else {
        form.classList.add("was-validated");
      }
    });
  });
}

/**
 * Show submitted modal screen using Bootstraps modal JS utility functions.
 */
function showFormSubmissionModal() {
  const contactModal = bootstrap.Modal.getInstance(
    document.getElementById("contact-modal"),
  );
  if (contactModal) {
    contactModal.hide();
  }

  const successModal = new bootstrap.Modal(
    document.getElementById("success-modal"),
  );
  successModal.show();
}

function thumbCTAToggle() {}
/**
 * Add click listeners to search buttons on index.html, prevent default form submission,
 * extract form data and redirect to search results page with data stored in sessionStorage
 * for retrieval and filtering on search results page.
 */
function searchFormRedirect() {
  const searchButtons = document.querySelectorAll(".btn-search");

  searchButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      let data;
      if (window.matchMedia("(max-width: 992px)").matches) {
        data = new FormData(
          document.getElementById("search-filter-form-mobile"),
        );
      } else {
        data = new FormData(document.getElementById("search-filter-form"));
      }

      let filterParameters = {
        destination: data.get("destination"),
        theme: data.get("theme"),
        departure: data.get("departure"),
      };

      sessionStorage.setItem(
        "filterParameters",
        JSON.stringify(filterParameters),
      );

      window.location.href = button.dataset.href;
    });
  });
}

/**
 * Retrieves filter parameters from sessionStorage, filters itineraries data based on parameters and passes filtered data to cloneItineraryCards().
 */
function filterResults() {
  let searchTerms = sessionStorage.getItem("filterParameters");
  console.log(searchTerms);

  let filterParameters = {
    destination: "",
    theme: "",
    departure: "",
  };

  if (searchTerms) {
    filterParameters = JSON.parse(searchTerms);
  }

  /* Filter itineraries by search term with logical short circuit for wildcard search if a term is empty*/
  const applyFilter = itineraries.filter((itinerary) => {
    //skip filter if parameter is empty or check if itinerary includes value.
    const matchsDestination =
      !filterParameters.destination ||
      itinerary.destination.includes(filterParameters.destination);
    const matchTheme =
      !filterParameters.theme ||
      itinerary.theme.includes(filterParameters.theme);
    const matchDeparture =
      !filterParameters.departure ||
      itinerary.departure.includes(filterParameters.departure);

    //return all matching values
    return matchsDestination && matchTheme && matchDeparture;
  });

  console.log(applyFilter);
  /* Pass filtered data to cloneItineraryCards function to clone cards matching search criteria*/
  cloneItineraryCards(applyFilter);
}
/**
 * Clones itinerary cards based on the filtered data.
 * @param {Array} filterData - The filtered itinerary data.
 */
function cloneItineraryCards(filterData) {
  if (filterData.length === 0) {
    const container = document.querySelector(".search-results-container");
    container.innerHTML = "<p class='text-danger'>No results found.</p>";
    return;
  }

  const container = document.querySelector(".search-results-container");

  //select template and clone for each result, populate with data and append to container
  filterData.forEach((itinerary) => {
    const template = document.getElementById("itinerary-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector(".card-title").innerHTML = itinerary.title;
    clone.querySelector(".card-text").innerText = itinerary.details;
    clone.querySelector(".card-img-top").src = itinerary.imageSrc;
    clone.querySelector(".card-img-top").alt = itinerary.imageAlt;
    clone.querySelector(".card").dataset.href = itinerary.href;

    container.appendChild(clone);
  });
}
/**
 * Add click listener to booking CTA button on itinerary pages,create and show booking form modal using Bootstrap's modal JS utility functions.
 */
function createBookingFormModal() {
  const bookingFormClick = document.querySelector(".booking-cta");
  
  const modalContainer = document.querySelector(".booking-modal-container");
  const bookingData = modalContainer.dataset;

  console.log(bookingData);

  if (bookingFormClick && modalContainer) {
    bookingFormClick.addEventListener("click", (e) => {
      e.preventDefault();

      modalContainer.innerHTML = `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="contact-modal-label">Book Now</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        
        <form id="booking-form" novalidate>
          <fieldset>
              <legend > No. of Travellers: </legend>
              <select class="form-select form-select-lg p-1" name="travellers"
                  aria-label="form number of travellers">
                <option selected>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                </select>
            </fieldset>
             <fieldset>
              <legend > Optional Upgrades: </legend>
              <input type = "checkbox" id="upgradeFirstClass" name="upgradeFirstClass" value="upgradeFirstClass" data-price="500">
              <label for="upgradeFirstClass">Upgrade to First Class Flights: € ${bookingData.upgradeFirstClass}</label><br>
              <input type = "checkbox" id="upgradeHotel" name="upgradeHotel" value="upgradeHotel" data-price="300">
              <label for="upgradeHotel">Upgrade to 5 Star Hotels: € ${bookingData.upgradeHotel}</label><br>
              <input type = "checkbox" id="addExcursions" name="addExcursions" value="addExcursions" data-price="100">
              <label for="addExcursions">Add Guided Excursions: € ${bookingData.addExcursions}</label><br>
            </fieldset>    
            </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button class="booking-cta btn" form="booking-form">Book Now</button>
      </div>
    </div>
  </div>
  `
  ;
      const bookingModal = new bootstrap.Modal(modalContainer);
      bookingModal.show();

      bookingModal.addEventListener("shown.bs.modal", () => {
        calculateTotalPrice(bookingData);

      });
    });
  }
}
