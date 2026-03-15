document.addEventListener("DOMContentLoaded", () => {
  transparentNavbar();
  thumbCTAToggle();
  formValidation();
  contactFormSuccess();
  newspaperSubscriptionAlert();
  filterResults();
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
      mapId: "DEMO_MAP_ID",
    });

    const markerid = container.dataset.markerid;
    const markersCoordinates = {
      rome: {
        locations: [
          { lat: 41.9028, lng: 12.4964, info: "Day 1-3: Rome" }, // Rome
          { lat: 40.8518, lng: 14.2681, info: "Day 4-5: Naples" }, // Naples
          { lat: 40.6263, lng: 14.3757, info: "Day 6: Sorrento" }, // Sorrento
        ],
      },
    };

    createMarker(mapInstance, markersCoordinates[markerid]); // pass map instance and locations object matching index markerId.
  } catch (error) {
    console.error(`Map error:${error.message}`);
    container.innerHTML = "<p class='text-danger'>Map Unavailable.</p>"; // on error insert p element into map container with Bootstrap text-danger class
  }
}

function transparentNavbar() {}

function thumbCTAToggle() {}

function formValidation() {}

function contactFormSuccess() {}

function newspaperSubscriptionAlert() {}

function filterResults() {}
/**
 * createMarker creates Google API advanced markers and infoWindows on marker click.
 * @param {*} map - THe Google Maps instance created by initMap().
 * @param {*} markerData - Object holding itinery marker details.
 */
function createMarker(map, markerData) {
  markerData.locations.forEach((location) => {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.info,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: location.info,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}

// TODO: add styles for map container using stylers and infoWindows using content and template literal
// TODO: add spinner or placeholder for map container
//TODO: add body elements ids for dom content loaded event listener
//TODO: add docstrings
