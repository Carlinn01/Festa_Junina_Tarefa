# 🎉 Aplicativo Festa Junina da Escola 🎉

Este é um aplicativo temático de Festa Junina, desenvolvido com React Native e Expo, focado em informar, entreter e interagir com os participantes da festa.

## 🌟 Funcionalidades

O aplicativo oferece diversas telas interativas para enriquecer a experiência da Festa Junina:

1.  **Tela Inicial (Home)**
    * Boas-vindas temáticas e botões de navegação para todas as seções do aplicativo.

2.  **Cardápio Junino**
    * Lista interativa de comidas e bebidas típicas da festa, com preços e ícones.
    * Opção de marcar itens favoritos.
    * Informações detalhadas sobre ingredientes (simuladas via alerta).

3.  **Quiz Junino**
    * Um divertido jogo de perguntas e respostas sobre a cultura da Festa Junina.
    * Controle de pontuação e mensagem final personalizada de acordo com o desempenho do jogador.

4.  **Correio Elegante Digital**
    * Permite enviar mensagens secretas para outras pessoas da festa (destinatário e mensagem).
    * Exibe as mensagens enviadas em uma lista local.

5.  **Jogo da Pescaria Junina**
    * Um mini-jogo interativo onde o usuário toca em "peixes" (emojis) que caem na tela para acumular pontos.
    * Controle de pontuação e botões para iniciar/parar o jogo.





##  **Estrutura do Projeto:**
    O projeto é organizado da seguinte forma:

    ```
    FestaJuninaApp/
    ├── App.js                     # Configuração da navegação e tela inicial
    ├── constants/                 # Estilos e constantes globais
    │   └── styles.js
    └── screens/                   # Componentes de cada tela do aplicativo
        ├── CardapioJuninoScreen.js
        ├── QuizJuninoScreen.js
        ├── CorreioEleganteScreen.js
        └── JogoDaPescariaScreen.js
    ```

## **Inicie o Servidor de Desenvolvimento:**
    Para iniciar o aplicativo, use o comando:

    ```bash
    npx expo start
    ```


5.  **Visualize no Celular ou Emulador:**

    * Após executar o comando acima, um QR code será exibido no terminal e no seu navegador (Expo Dev Tools).

    * Baixe o aplicativo **Expo Go** no seu celular (disponível na App Store e Google Play Store).

    * Abra o Expo Go e escaneie o QR code para ver o aplicativo em seu dispositivo. Alternativamente, você pode usar um emulador de Android ou simulador de iOS.

Divirta-se com o aplicativo da Festa Junina! 🥳



