import { useState } from "react";
import ReactMapGL, { Marker, NavigationControl, Popup } from "react-map-gl";
import PostJobCard from "../postJobCard/PostJobCard";
import getCenter from 'geolib/es/getCenter'
import { useSelector } from "react-redux";

const navControlStyle = {
  bottom: 20,
  right: 10,
  zIndex: 100,
};

const Map = ({ jobs, mapRef, mapStyle }) => {
  const [selectCard, setSelectCard] = useState(null);
  const { jobId } = useSelector((state) => state?.map);
;

  const coordinates = jobs?.map((job) => ({
    latitude: Math.floor(job?.location.coordinates[1]),
    longitude: Math.floor(job?.location.coordinates[0]),
  }));

  const center = getCenter(coordinates);

  return (
    <>
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_API_KEY}
        initialViewState={{
          latitude: center.latitude,
          longitude: center.longitude,
          zoom: 5,
        }}
        width="100%"
        height="100%"
        maxZoom={18}
        minZoom={2}
        mapStyle={mapStyle}
      >
        <NavigationControl style={navControlStyle} />
        {jobs.map((city, inx) => (
          <div key={inx}>
            <Marker
              longitude={Math.floor(city?.location.coordinates[0])}
              latitude={Math.floor(city?.location.coordinates[1])}
              anchor="bottom"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                alt="Razu Islam"
                width={50}
                height={50}
                style={{
                  cursor: "pointer",
                }}
                onMouseEnter={() => setSelectCard(city)}
              />
            </Marker>
            {selectCard && (
              <Popup
                longitude={Math.floor(selectCard?.location?.coordinates[0])}
                latitude={Math.floor(selectCard?.location?.coordinates[1])}
                onClose={() => setSelectCard(false)}
                closeOnClick={true}
                anchor="bottom"
              >
                <PostJobCard job={selectCard} />
              </Popup>
            )}
            {jobId && (
              <Popup
                longitude={Math.floor(jobId?.location?.coordinates[0])}
                latitude={Math.floor(jobId?.location?.coordinates[1])}
                onClose={() => setSelectCard(false)}
                closeOnClick={true}
                anchor="bottom"
              >
                <PostJobCard job={jobId} />
              </Popup>
            )}
          </div>
        ))}
      </ReactMapGL>
    </>
  );
};

export default Map;
