import { AppSidebar } from '@/views/components/app-sidebar';
import { Separator as VSeparator } from '@/views/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/views/components/ui/sidebar';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/views/components/ui/select';

import { Card, CardContent } from '@/views/components/ui/card';
import { ScrollArea } from '@/views/components/ui/scroll-area';
import {
  CaretLeftIcon,
  CaretRightIcon,
  MapPinIcon,
} from '@phosphor-icons/react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Header } from '../components/header';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export function HomePage() {
  const mapRef = useRef<L.Map | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  type Location = {
    id: string;
    name: string;
    address: string;
    description: string;
    hours: string;
    coords: [number, number];
    img: string;
  };

  const LOCATIONS: Location[] = [
    {
      id: 'hemose',
      name: 'HEMOSE – Centro de Hemoterapia de Sergipe',
      address: 'R. Quinze, 127 – Capucho, Aracaju – SE',
      description: 'Centro de doação de sangue em Aracaju, Sergipe',
      hours: 'Aberto • 07h às 19h',
      coords: [-10.9472, -37.0731],
      img: 'https://i.imgur.com/2tVwF1F.jpeg',
    },
    {
      id: 'jose-conrado',
      name: 'E.M.E.F José Conrado de Araújo',
      address: 'Rua Senador Rolemberg, 396 – Aracaju – SE',
      description: 'Consultas, vacinação, odontologia, enfermagem',
      hours: 'Aberto • 07h às 19h',
      coords: [-10.9458, -37.0715],
      img: 'https://i.imgur.com/sQ9g7Yr.jpeg',
    },
    // Exemplos adicionais em Sergipe (até 10)
    {
      id: 'clinic-3',
      name: 'Unidade de Saúde Jardim',
      address: 'Av. Jardim, Aracaju - SE',
      description: 'Unidade de apoio',
      hours: '08h-17h',
      coords: [-10.9505, -37.0638],
      img: '',
    },
    {
      id: 'clinic-4',
      name: 'Posto de Saúde Centro',
      address: 'Rua Central, Aracaju - SE',
      description: 'Atendimento básico',
      hours: '07h-16h',
      coords: [-10.944, -37.07],
      img: '',
    },
    {
      id: 'clinic-5',
      name: 'Clínica São José',
      address: 'R. São José, Aracaju - SE',
      description: 'Apoio à doação',
      hours: '09h-18h',
      coords: [-10.9432, -37.078],
      img: '',
    },
    {
      id: 'clinic-6',
      name: 'Posto Nossa Senhora',
      address: 'Av. Brasil, Aracaju - SE',
      description: 'Ponto de coleta',
      hours: '08h-18h',
      coords: [-10.949, -37.08],
      img: '',
    },
  ];

  function createIcon(isActive: boolean) {
    const color = isActive ? '#10B981' : '#64748B';
    const svgString = renderToStaticMarkup(
      <MapPinIcon size={32} weight="fill" color={color} />,
    );

    // Wrap so it centers over the coordinate
    const html = `<div style="transform: translate(-50%,-100%); display:flex; align-items:center; justify-content:center;">${svgString}</div>`;

    return L.divIcon({
      html,
      className: 'map-pin',
      iconSize: [32, 32],
      popupAnchor: [0, -16],
    });
  }

  function handleSelectLocation(loc: Location) {
    setSelectedId(loc.id);
    const map = mapRef.current;
    if (map && loc.coords) {
      try {
        map.flyTo(loc.coords as L.LatLngExpression, 15, { duration: 0.6 });
      } catch {
        // fallback: setView
        map.setView(loc.coords as L.LatLngExpression, 15);
      }
    }
  }

  // workaround para tipagem do react-leaflet: passar whenCreated via spread any
  const mapCreatedProp: Record<string, unknown> = {
    whenCreated: (mapInstance: L.Map) => (mapRef.current = mapInstance),
  };
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <VSeparator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>

            <Header />
          </div>
        </header>

        <div className="flex flex-1 gap-4 p-4 pt-0">
          <main className="flex w-full flex-col gap-4">
            <header className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {/* fonte mais leve para visual mais clean */}
                  <h2 className="text-xl font-medium">Campanhas de doação</h2>
                  <Badge variant="outline">10 campanhas</Badge>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <Button className="size-4 p-3" size="icon" variant="outline">
                    <CaretLeftIcon />
                  </Button>

                  <p className="text-gray-400 text-sm">
                    1 de julho de 2025 - 31 de julho de 2025
                  </p>

                  <Button className="size-4 p-3" size="icon" variant="outline">
                    <CaretRightIcon />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Filtros</SelectLabel>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="abertos">Abertos</SelectItem>
                      <SelectItem value="fechados">Fechados</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Button>Adicionar</Button>
              </div>
            </header>

            <div className="flex w-full h-full gap-4">
              <ScrollArea className="w-2/3 h-full pr-2">
                <div className="flex flex-col gap-4">
                  {LOCATIONS.map((loc) => (
                    <Card
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc)}
                      className={`overflow-hidden border rounded-2xl flex items-center cursor-pointer`}>
                      {loc.img ? (
                        <img
                          src={loc.img}
                          alt={loc.name}
                          className="w-64 h-full object-cover"
                        />
                      ) : (
                        <div className="w-64 h-full bg-gray-100 flex items-center justify-center">
                          {' '}
                        </div>
                      )}

                      <CardContent className="p-4 flex flex-col gap-1">
                        <h3 className="font-medium text-lg">{loc.name}</h3>
                        <p className="text-sm text-gray-500">{loc.address}</p>
                        <p className="text-sm text-gray-600">
                          {loc.description}
                        </p>
                        <p className="text-green-600 font-medium mt-1">
                          {loc.hours}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <div className="w-1/3 h-[calc(100vh-140px)] sticky top-4 overflow-hidden rounded-2xl border flex items-center">
                <MapContainer
                  {...mapCreatedProp}
                  center={LOCATIONS[0].coords}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="w-full h-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  {LOCATIONS.map((loc) => (
                    <Marker
                      key={loc.id}
                      position={loc.coords}
                      icon={createIcon(selectedId === loc.id)}
                      eventHandlers={{ click: () => handleSelectLocation(loc) }}
                    />
                  ))}
                </MapContainer>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
