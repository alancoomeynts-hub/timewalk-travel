document.addEventListener("DOMContentLoaded", () => {
  initMap();
  transparentNavbar();
  thumbCTAToggle();
  formValidation();
  contactFormSuccess();
  newspaperSubscriptionAlert();
  filterResults();
});
function initMap() {
  const container = document.querySelector("#map-container");
  if (!container) {
    throw new Error("No map containers found");
  }
  console.log(
    "Map container found, `lat`, `lng`, and `zoom` data attributes:",
    {
      lat: container.dataset.lat,
      lng: container.dataset.lng,
      zoom: container.dataset.zoom,
      markerid: container.dataset.markerid,
    },
  );

  try {
    const mapInstance = new google.maps.Map(container, {
      center: {
        lat: parseFloat(container.dataset.lat),
        lng: parseFloat(container.dataset.lng),
      },
      zoom: parseInt(container.dataset.zoom),
    });

    const markerid = container.dataset.markerid;
    const markersCoordinates = {
      rome: [
        { lat: 41.9028, lng: 12.4964 }, // Rome
        { lat: 40.8518, lng: 14.2681 }, // Naples
        { lat: 40.6263, lng: 14.3757 }, // Sorrento
      ],
    };

    createMarker(mapInstance, markersCoordinates[markerid]);

  } catch (error) {
    console.error(`Map error:${error.message}`);
    container.innerHTML = "<p class='text-danger'>Map Unavailable.</p>";
  }

  window.initMap = initMap;
}

function transparentNavbar() {}

function thumbCTAToggle() {}

function formValidation() {}

function contactFormSuccess() {}

function newspaperSubscriptionAlert() {}

function filterResults() {}

function createMarker(map, locations) {
  locations.forEach((location) => {
    new google.maps.Marker({
      position: location,
      map: map,
    });
  });
}
