// src/controllers/Map.controller.tsx
import { useCallback, useEffect, useState } from 'react';

import MapPanel from './map-panel';

const defaultContainerStyle = { width: '100%', height: '100%' };
const centerDefault = { lat: -10.9477, lng: -37.0595 };

export default function MapView({
  containerStyle = defaultContainerStyle,
  onResize,
}: {
  containerStyle?: React.CSSProperties;
  onResize: (fullscreen: boolean) => void;
}) {
  // Gerenciamos o estado local do centro/zoom. O MapPanel usa react-leaflet.
  const [zoom, setZoom] = useState(15);
  const [center, setCenter] = useState(centerDefault);
  const [showSearchOption, setShowSearchOption] = useState(false);
  const [, setFullscreen] = useState(true);

  const handleMapMovement = useCallback(() => {
    setShowSearchOption(true);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setCenter(centerDefault),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    } else setCenter(centerDefault);
  }, []);

  const handleFullscreenToggle = () => {
    setFullscreen((prev) => {
      const next = !prev;
      onResize(next);
      return next;
    });
  };

  const handleZoomIn = () => setZoom((z) => z + 1);
  const handleZoomOut = () => setZoom((z) => z - 1);

  return (
    <MapPanel
      containerStyle={containerStyle}
      center={center}
      zoom={zoom}
      showSearchOption={showSearchOption}
      onFullscreenToggle={handleFullscreenToggle}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onDrag={handleMapMovement}
      onDragEnd={handleMapMovement}
    />
  );
}
