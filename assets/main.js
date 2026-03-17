/* dom content loaded function with page detection*/
document.addEventListener("DOMContentLoaded", () => {
  validateForms();

  const page = document.body.id;

  if (page === "page-home") {
    LocationCardsRedirect();
    filterResults();
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

function filterResults() {
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

      const destination = data.get('destination');
      const theme = data.get('theme');
      const airport = data.get('departure-airport');

      const url = new URL(button.dataset.href, window.location.origin);
      console.log(url);

      if(destination) {url.searchParams.append("destination", destination)};
      if(theme) {url.searchParams.append("theme", theme)};
      if(airport) {url.searchParams.append("airport", airport)};

      console.log(url.toString());

      window.location.href = url.toString();
    });
  });
}

/**
 * createMarker creates Google API advanced markers and infoWindows on marker click.
 * @param {*} map - THe Google Maps instance created by initMap().
 * @param {*} markerData - Object holding itinery marker details.
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
