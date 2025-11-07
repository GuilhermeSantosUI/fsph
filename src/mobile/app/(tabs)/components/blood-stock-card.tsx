import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Text, View } from 'react-native';

import { stockService } from '../../../services/stock';

type Stock = {
  grupoabo: string;
  fatorrh: 'P' | 'N' | string;
  updated: string;
  situacao: string;
  cobertura: string;
};

function getSituationColor(situacao: string) {
  switch (situacao?.toLowerCase()) {
    case 'critico':
      return '#e11d48';
    case 'alerta':
      return '#f59e0b';
    case 'ideal':
      return '#10b981';
    default:
      return '#9CA3AF';
  }
}

function formatSign(fatorrh: string) {
  if (!fatorrh) return '';
  return fatorrh.toUpperCase() === 'P' ? '+' : '-';
}

export function BloodStocks() {
  const {
    data: stocks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stock'],
    queryFn: async () => {
      const { data }: any = await stockService.getStock();
      console.log('res', data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <View className="py-6 items-center">
        <ActivityIndicator size="small" color="#e11d48" />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="py-4">
        <Text className="text-[#8C8C8C] font-outfit">
          Erro ao carregar estoques
        </Text>
      </View>
    );
  }

  if (!Array.isArray(stocks) || stocks.length === 0) {
    return (
      <View className="py-4">
        <Text className="text-[#8C8C8C] font-outfit">
          Nenhum estoque disponível
        </Text>
      </View>
    );
  }

  const list: Stock[] = (stocks ?? []) as Stock[];

  return (
    <View className="py-4">
      <Text
        style={[{ fontSize: 18, color: '#8C8C8C' }]}
        className="font-outfit mb-3"
      >
        Estoques de sangue
      </Text>

      <View className="flex-row flex-wrap -mx-2">
        {list.map((s, i) => {
          const label = `${s.grupoabo}${formatSign(s.fatorrh)}`;
          const color = getSituationColor(s.situacao);
          const updated = new Date(s.updated).toLocaleString();

          return (
            <View
              key={`${s.grupoabo}-${s.fatorrh}-${i}`}
              className="w-1/2 px-2 mb-4"
            >
              <View
                className="rounded-xl overflow-hidden border-2"
                style={{ borderColor: '#efefef' }}
              >
                <View style={{ backgroundColor: color }} className="px-3 py-2">
                  <Text className="text-white text-[18px] font-outfit">
                    {label}
                  </Text>
                </View>

                <View className="px-3 py-3 bg-white">
                  <Text className="text-[14px] text-[#1f2937] font-dmsans">
                    Situação: <Text style={{ color }}>{s.situacao}</Text>
                  </Text>
                  <Text className="text-[14px] text-[#6b7280] mt-1 font-dmsans">
                    Cobertura: {s.cobertura}%
                  </Text>
                  <Text className="text-[12px] text-[#9CA3AF] mt-2 font-dmsans">
                    Atualizado: {updated}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
