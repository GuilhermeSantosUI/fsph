import {
  ArrowsOutSimpleIcon,
  MinusIcon,
  PlusIcon,
} from '@phosphor-icons/react';
// src/views/Map.view.tsx
import L from 'leaflet';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';

import { Button } from './ui/button';
import { DropdownMenuCheckboxItem } from './ui/dropdown-menu';
import { Label } from './ui/label';

import 'leaflet/dist/leaflet.css';

// Ajuste simples do ícone padrão para evitar problemas com assets em bundlers
const defaultMarker = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
// Aplica como padrão
L.Marker.prototype.options.icon = defaultMarker;

interface MapViewProps {
  containerStyle?: React.CSSProperties;
  center: { lat: number; lng: number };
  zoom: number;
  showSearchOption: boolean;
  onFullscreenToggle: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDrag: () => void;
  onDragEnd: () => void; // Mostra ao soltar o arrasto
}

function MapSync({
  center,
  zoom,
}: {
  center: { lat: number; lng: number };
  zoom: number;
}) {
  const map = useMap();
  // Sincroniza view quando props mudam
  useMapEvents({});
  // setView quando center/zoom mudam
  map.setView([center.lat, center.lng], zoom);
  return null;
}

function MapEvents({
  onDrag,
  onDragEnd,
}: {
  onDrag: () => void;
  onDragEnd: () => void;
}) {
  useMapEvents({
    move: () => onDrag(),
    moveend: () => onDragEnd(),
  });
  return null;
}

export default function MapPanel({
  containerStyle,
  center,
  zoom,
  showSearchOption,
  onFullscreenToggle,
  onZoomIn,
  onZoomOut,
  onDrag,
  onDragEnd,
}: MapViewProps) {
  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={containerStyle}
        scrollWheelZoom={true}
        className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapSync center={center} zoom={zoom} />
        <MapEvents onDrag={onDrag} onDragEnd={onDragEnd} />
        <Marker position={[center.lat, center.lng]} />
      </MapContainer>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={onFullscreenToggle}
          className="rounded-full">
          <ArrowsOutSimpleIcon weight="bold" size={24} />
        </Button>

        <div className="flex items-center flex-col rounded-full shadow-md">
          <Button
            size="icon"
            variant="outline"
            onClick={onZoomIn}
            className="rounded-t-full">
            <PlusIcon weight="bold" size={24} />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={onZoomOut}
            className="rounded-b-full border-t-0">
            <MinusIcon weight="bold" size={24} />
          </Button>
        </div>
      </div>

      <div
        className={`absolute left-1/2 bottom-6 -translate-x-1/2 flex items-center gap-1 bg-muted rounded-md shadow-lg px-3 py-2 border border-gray-200 transition-all duration-300 ${
          showSearchOption
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}>
        <DropdownMenuCheckboxItem
          id="search-on-move"
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary w-5 h-5 mr-2"
        />
        <Label
          htmlFor="search-on-move"
          className="text-sm font-medium text-muted-foreground text-nowrap select-none cursor-pointer">
          Pesquisar ao movimentar o mapa
        </Label>
      </div>
    </div>
  );
}
