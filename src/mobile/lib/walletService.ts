import { Alert, Platform } from 'react-native';

export interface PassData {
  formatVersion: number;
  passTypeIdentifier: string;
  serialNumber: string;
  teamIdentifier: string;
  organizationName: string;
  description: string;
  logoText: string;
  foregroundColor: string;
  backgroundColor: string;
  labelColor: string;
  generic: {
    primaryFields: {
      key: string;
      label: string;
      value: string;
    }[];
    secondaryFields: {
      key: string;
      label: string;
      value: string;
    }[];
    auxiliaryFields: {
      key: string;
      label: string;
      value: string;
    }[];
    backFields: {
      key: string;
      label: string;
      value: string;
    }[];
  };
  barcode?: {
    message: string;
    format: string;
    messageEncoding: string;
  };
}

export const createDonorCardData = (): PassData => {
  return {
    formatVersion: 1,
    passTypeIdentifier: 'pass.com.fsph.donor',
    serialNumber: '123456789',
    teamIdentifier: 'TEAM123456',
    organizationName: 'Fundação de Saúde Parreiras Horta',
    description: 'Cartão de Doador FSPH',
    logoText: 'FSPH',
    foregroundColor: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(225, 29, 72)',
    labelColor: 'rgb(255, 255, 255)',
    generic: {
      primaryFields: [
        {
          key: 'name',
          label: 'Nome',
          value: 'GUILHERME SANTOS',
        },
      ],
      secondaryFields: [
        {
          key: 'bloodType',
          label: 'Tipo Sanguíneo',
          value: 'A+',
        },
        {
          key: 'document',
          label: 'CPF',
          value: '***.424.945-**',
        },
      ],
      auxiliaryFields: [
        {
          key: 'nextDonation',
          label: 'Próxima Doação',
          value: '33 dias',
        },
      ],
      backFields: [
        {
          key: 'instructions',
          label: 'Instruções',
          value: 'Apresente este cartão nos postos de doação da FSPH.',
        },
        {
          key: 'contact',
          label: 'Contato',
          value: 'www.fsph.org.br | (79) 3216-7200',
        },
        {
          key: 'address',
          label: 'Endereço',
          value: 'Av. Augusto Maynard, 245 - São José, Aracaju - SE',
        },
      ],
    },
    barcode: {
      message: 'GUILHERME SANTOS|A+|***424945**',
      format: 'PKBarcodeFormatQR',
      messageEncoding: 'iso-8859-1',
    },
  };
};

export const addToAppleWallet = async (): Promise<void> => {
  if (Platform.OS !== 'ios') {
    Alert.alert(
      'Plataforma não suportada',
      'Apple Wallet está disponível apenas no iOS.'
    );
    return;
  }

  try {
    Alert.alert(
      'Apple Wallet',
      'Para implementar completamente esta funcionalidade, é necessário:\n\n' +
        '• Certificado de desenvolvedor Apple\n' +
        '• Assinatura digital do passe\n' +
        '• Servidor para gerar arquivos .pkpass\n\n' +
        'Funcionalidade em desenvolvimento.',
      [{ text: 'OK' }]
    );
  } catch (error) {
    console.error('Erro ao adicionar ao Apple Wallet:', error);
    Alert.alert('Erro', 'Não foi possível adicionar o cartão ao Apple Wallet.');
  }
};

export const addToGooglePay = async (): Promise<void> => {
  if (Platform.OS !== 'android') {
    Alert.alert(
      'Plataforma não suportada',
      'Google Pay está disponível apenas no Android.'
    );
    return;
  }

  try {
    Alert.alert(
      'Google Pay',
      'Para implementar completamente esta funcionalidade, é necessário:\n\n' +
        '• Conta de desenvolvedor Google Pay\n' +
        '• Configuração de service account\n' +
        '• JWT assinado do passe\n\n' +
        'Funcionalidade em desenvolvimento.',
      [{ text: 'OK' }]
    );
  } catch (error) {
    console.error('Erro ao adicionar ao Google Pay:', error);
    Alert.alert('Erro', 'Não foi possível adicionar o cartão ao Google Pay.');
  }
};

export const shareDonorCard = async (): Promise<void> => {
  try {
    const cardData = createDonorCardData();
    const shareText = `
🩸 Cartão de Doador FSPH

👤 Nome: ${cardData.generic.primaryFields[0].value}
🔴 Tipo Sanguíneo: ${cardData.generic.secondaryFields[0].value}
📄 CPF: ${cardData.generic.secondaryFields[1].value}
📅 Próxima doação elegível: ${cardData.generic.auxiliaryFields[0].value}

📍 FSPH - Fundação de Saúde Parreiras Horta
🌐 www.fsph.org.br
📞 (79) 3216-7200
    `.trim();

    Alert.alert('Compartilhar Cartão', shareText, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Copiar',
        onPress: () => {
          Alert.alert(
            'Sucesso',
            'Dados copiados para a área de transferência!'
          );
        },
      },
    ]);
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    Alert.alert('Erro', 'Não foi possível compartilhar o cartão.');
  }
};
