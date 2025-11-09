import { ChevronLeft, ChevronRight, Plus, MapPin, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  address: string;
  description: string;
  status: "open" | "closed";
  hours: string;
  image: string;
}

const campaigns: Campaign[] = [
  {
    id: "1",
    title: "HEMOSE - Centro de Hemoterapia de Sergipe",
    subtitle: "Hospital de Urgência de Sergipe Governador João Alves Filho",
    address: "R. Quinze, 127 - Capucho, Aracaju - SE",
    description: "Centro de doação de sangue em Aracaju, Sergipe",
    status: "open",
    hours: "07h às 19h",
    image: "/placeholder-hemose.jpg",
  },
  {
    id: "2",
    title: "E.M.E.F José Conrado de Araújo",
    subtitle: "Escola de ensino fundamental em Aracaju, Sergipe",
    address: "Rua Senador Rollemberg, 396 - São José, Aracaju - SE, 49015-120",
    description: "US oferece consultas, vacinação, odontologia, enfermagem",
    status: "open",
    hours: "07h às 19h",
    image: "/placeholder-school.jpg",
  },
  {
    id: "3",
    title: "Posto de saúde comunitário em Aracaju, Sergipe",
    subtitle: "",
    address: "Endereço não informado",
    description: "",
    status: "open",
    hours: "07h às 19h",
    image: "/placeholder-posto.jpg",
  },
];

export function CampaignsPage() {
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Header da página */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campanhas de doação</h1>
            <p className="text-sm text-gray-500 mt-1">10 campanhas</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="todos">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="abertas">Abertas</SelectItem>
                <SelectItem value="fechadas">Fechadas</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="default" size="default">
              <Plus className="w-4 h-4" />
              Adicionar
            </Button>
          </div>
        </div>

        {/* Filtros e data */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm font-medium px-4">
              1 de julho de 2025 - 31 de julho de 2025
            </span>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-8">
        {/* Info e mapa */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">20+ Farmácias públicas próximas.</p>
        </div>

        {/* Grid de campanhas */}
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex">
                {/* Imagem */}
                <div className="w-64 h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex-shrink-0">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "";
                      e.currentTarget.style.background = "linear-gradient(to bottom right, #dbeafe, #bfdbfe)";
                    }}
                  />
                </div>

                {/* Conteúdo */}
                <CardContent className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {campaign.subtitle && (
                        <p className="text-sm text-gray-500 mb-1">{campaign.subtitle}</p>
                      )}
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {campaign.title}
                      </h3>
                      
                      <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{campaign.address}</p>
                      </div>

                      {campaign.description && (
                        <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-3 ml-6">
                      <Badge variant="success" className="text-xs">
                        Aberto
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{campaign.hours}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
