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
  console.log("Map container found, `lat`, `lng`, and `zoom` data attributes:", {
    lat: container.dataset.lat,
    lng: container.dataset.lng,
    zoom: container.dataset.zoom,
    markerid: container.dataset.markerid,
  });

  try {
    const mapInstance = new google.maps.Map(container, {
      center: {
        lat: parseFloat(container.dataset.lat),
        lng: parseFloat(container.dataset.lng),
      },
      zoom: parseInt(container.dataset.zoom),
    });

    const markerid = container.dataset.markerid;

    if (markerid === "rome-campania") {

      // createMarker(mapInstance,41.9028, 12.4964);

      // marker for Rome
      new google.maps.Marker({
        position: { lat: 41.9028, lng: 12.4964 },
        map: mapInstance,
      });
      // marker for Naples
      new google.maps.Marker({
        position: { lat: 40.8518, lng: 14.2681 },
        map: mapInstance,
      });

      // Sorrento
      new google.maps.Marker({
        position: { lat: 40.6263, lng: 14.3757 },
        map: mapInstance,
      });
    }
  } catch (error) {
    console.error('Map error:${error.message}');
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

function createMarker(map, lat, lng) {};
