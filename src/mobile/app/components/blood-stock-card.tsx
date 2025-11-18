import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import BloodAppealModal from '../ranking/blood-appeal-modal';

import { stockService } from '../../services/stock';

type Stock = {
  grupoabo: string;
  fatorrh: 'P' | 'N' | string;
  updated: string;
  situacao: string;
  cobertura: string;
};

function getSituationColor(situacao: string) {
  const norm = String(situacao ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
  switch (norm) {
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
  const [appealVisible, setAppealVisible] = useState(false);
  const [appealBloodType, setAppealBloodType] = useState<string | undefined>(
    undefined
  );
  const [appealSeverity, setAppealSeverity] = useState<'normal' | 'critical'>(
    'critical'
  );
  // Considerar que o usuário atual tem tipo sanguíneo A+
  const userBloodType = 'A+';
  const {
    data: stocks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stock'],
    queryFn: async () => {
      const { data }: any = await stockService.getStock();
      return data;
    },
  });

  const list: Stock[] = useMemo(() => (stocks ?? []) as Stock[], [stocks]);

  useEffect(() => {
    // ao carregar os estoques, abrir modal se houver situação crítica e usuário ainda não viu
    (async () => {
      try {
        const seen = await AsyncStorage.getItem('bloodDonationModalSeen');
        console.log('[BloodStocks] bloodDonationModalSeen =', seen);
        if (seen) return;

        // Procurar captação crítica DO TIPO do usuário (ex: A+)
        const critical = list.find((s) => {
          const norm = String(s.situacao ?? '')
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase();
          const label = `${s.grupoabo}${formatSign(s.fatorrh)}`;
          return norm === 'critico' && label === userBloodType;
        });

        if (critical) {
          const label = `${critical.grupoabo}${formatSign(critical.fatorrh)}`;
          console.log(
            '[BloodStocks] captação crítica PARA O USUÁRIO detectada:',
            label,
            critical
          );
          setAppealBloodType(label);
          setAppealSeverity('critical');
          setAppealVisible(true);
          // marca como visto para não inundar o usuário
          await AsyncStorage.setItem('bloodDonationModalSeen', 'true');
        } else {
          console.log(
            '[BloodStocks] nenhuma captação crítica encontrada para o tipo do usuário (A+)'
          );
        }
      } catch {
        // ignore
      }
    })();
  }, [list]);

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

      <BloodAppealModal
        visible={appealVisible}
        bloodType={appealBloodType}
        severity={appealSeverity}
        onClose={() => setAppealVisible(false)}
        onSchedule={() => setAppealVisible(false)}
      />
    </View>
  );
}
