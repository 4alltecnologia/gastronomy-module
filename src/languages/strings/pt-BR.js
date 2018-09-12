const GENERAL_STRINGS = {
    alertErrorTitle: "Ops...",
    alertErrorMessage: "Tente novamente mais tarde",
    monetary: "R$",
    appName: "Gastronomia Modular",
    currencyFormat: "0,0.00",
    yes: "Sim",
    no: "Não",
    ok: "OK",
    back: "Voltar",
    warning:"Atenção",
    genericError: "Ocorreu um erro",
    loading: "Aguarde...",
    emptyCart: "No momento seu carrinho está vazio",
    emptyCheck: "Nenhum item selecionado",
    unityClosed: "A loja encontra-se fechada no momento",
    openOrder: "Você possui um pedido em aberto no momento",
    next: "AVANÇAR",
    noOrders: "Você ainda não efetuou pedidos",
    minutes: "minutos",
    min: "min",
    hours: "horas",
    days: "dias"
}

const NO_DATA_WARNING = {
    firstMessage:"Não conseguimos carregar resultados…",
    secondMessage:"Houve um problema de conexão com o servidor, por favor tente novamente mais tarde."
}

const NO_ADDRESSES_WARNING = {
    firstMessage:"Não encontramos nenhum endereço cadastrado...",
    secondMessage:"Adicione seus endereços e agilize a solicitação de pedidos.",
    newAddress: "INFORMAR NOVO ENDEREÇO"
}

const NO_INTERNET_WARNING = {
    firstMessage:"Não conseguimos conectar com a internet…",
    secondMessage:"Houve um problema de conexão com a internet, por favor tente novamente mais tarde.",
    tryAgain: "Tentar novamente"
}

const NO_LOCATION_WARNING = {
    firstMessage:"Antes de prosseguir, precisamos saber onde você está...",
    secondMessage:"Por favor ative o seu gps para detectarmos sua localização",
    tryAgain: "Tentar novamente"
}

const NO_LOCATION_FOUND_WARNING = {
    firstMessage:"Ops! Não foi possível detectar a sua localização",
    secondMessage:"Por favor tente novamente mais tarde",
    tryAgain: "Tentar novamente"
}

const NO_UNITIES_WARNING = {
    title: "Opa, parece que não há nenhum estabelecimento próximo",
    message: "Estamos trabalhando para levar mais estabelecimentos até você",
    buttonTitle: "Tentar novamente"
}

const NO_RESULTS_WARNING = {
    firstMessage: "Você ainda não efetuou recargas...",
    secondMessage: "O histórico de suas recargas apareceram aqui."
}

const NO_SESSION_WARNING = {
    firstMessage: "Você precisa estar logado...",
    secondMessage: "Toque no botão abaixo para efetuar o login.",
    loginButton: "Entrar"
}

const NO_ORDERS_WARNING = {
    firstMessage: "Você ainda não possui nenhum pedido em andamento.",
    secondMessage: "Acesse a seção de estabelecimentos e confira as opções disponíveis.",
    button: "Ver estabelecimentos!"
}

const NO_ORDERS_OFFERS_WARNING = {
    firstMessage: "Você ainda não possui nenhum pedido em andamento.",
    secondMessage: "Acesse a seção de ofertas e confira as opções disponíveis.",
    button: "Ver ofertas!"
}

const NO_OFFERS_WARNING = {
    title: "Opa, parece que não existe nenhuma oferta próxima",
    message: "Estamos trabalhando para levar ofertas até você",
    buttonTitle: "Tentar novamente"
}

const NO_ADDRESS_FOUND_WARNING = {
    firstMessageNoResults: "Ops!",
    secondMessageNoResults: "Não conseguimos identificar a sua rua, favor utilizar outra aba para encontrá-la",
    firstMessageNoGps: "Antes de prosseguir, precisamos saber onde você está...",
    secondMessageNoGps: "Por favor ative o seu gps para detectarmos sua localização"
}

const NO_PRODUCTS_WARNING = {
    firstMessage: "Nada por aqui",
    secondMessage: "Sua comanda ainda está vazia. Para adicionar itens, acesse o cardápio e faça seu pedido.",
    buttonMessage: "Ir para o cardápio"
}

const NATIVE_FUNCTIONS_WARNING = {
    closeModuleTitle: "Ops...",
    closeModuleMessage: "O método onClose precisa ser implementado"
}

const TAB_CONTAINER = {
    offersTab: "Ofertas",
    catalogTab: "Cardápio"
}

const OFFERS_CONTAINER = {
    title: "Clube de Descontos",
    offersNearby: "Ofertas próximas a você"
}

const HEADER_COMPONENT = {
    info: "Ver informações",
    offersCatalog: "Ofertas/Cardápio",
    unityClosed: "Fechada no momento"
}

//CHECK PRODUCT LIST CONTAINER
const CHECK_PRODUCT_LIST_COMPONENT = {
    subtotal: "Subtotal",
    tips: "Taxa de serviço (10%)",
    total: "Total",
    topMessage: "Os valores referem-se ao valor unitário de cada item",
    addProducts: "ADICIONAR MAIS PRODUTOS",
    payCheck: "FINALIZAR COMANDA"
}

//CHECK PAYMENT CONTAINER
const CHECK_PAYMENT_CONTAINER = {
    title: "Resumo do Pagamento"
}

const CHECK_PAYMENT_COMPONENT = {
    totalToPay: "Valor a pagar:",
    selectPaymentMethod: "Selecione uma forma de pagamento:",
    payNow: "PAGAR AGORA"
}

//CHECK SUCCESS CONTAINER
const CHECK_SUCCESS_CONTAINER = {
    title: "Resumo do Pagamento"
}

const CHECK_SUCCESS_COMPONENT = {
    firstMessage: "MUITO OBRIGADO!",
    secondMessage: "PAGAMENTO REALIZADO",
    finish: "FECHAR",
    paidValue: "Valor pago:"
}

//UNITY LIST CONTAINER
const UNITY_LIST_COMPONENT = {
    closedUnities: "Estabelecimentos fechados"
}

const UNITY_LIST_CONTROLLER = {
    noUnity: "Não há nenhum estabelecimento no momento"
}

const CATALOG_CELL_COMPONENT = {
    fromPrice: "A partir de"
}

//UNITY INFO CONTAINER
const UNITY_HEADER_SECTION_COMPONENT = {
    contact: "Contato",
    location: "Localização",
    shifts: "Horário de Funcionamento",
}

const UNITY_SHIFTS_COMPONENT = {
    monday: "Segunda-Feira",
    tuesday: "Terça-Feira",
    wednesday: "Quarta-Feira",
    thursday: "Quinta-Feira",
    friday: "Sexta-Feira",
    saturday: "Sábado",
    sunday: "Domingo",
    closed: "Fechado",
    from: "HH[h]mm",
    to: " [às] HH[h]mm",
    fromZeroMinutes: "HH[h]",
    toZeroMinutes: " [às] HH[h]"
}

const UNITY_CONTACT_COMPONENT = {
    telephone: "Telefone",
    website: "Site"
}

const UNITY_INFORMATION_COMPONENT = {
    information: "Informações"
}

//ORDER TYPE SELECTION CONTAINER
const ORDER_TYPE_SELECTION_COMPONENT = {
    headerTitle: "Gastronomia",
    selectOrderType: "Por favor, selecione como você quer receber o seu pedido"
}

//SUCCESS CONTAINER
const SUCCESS_CONTAINER = {
    title: "Pedido Realizado"
}

const SUCCESS_HEADER_COMPONENT = {
    thanks: "Muito obrigado!",
    paymentSuccessfulNow: "Pagamento realizado com sucesso",
    paymentSuccessfulDeliver: "Pedido realizado com sucesso",
    orderDelivery: "Seu pedido será entregue em ",
    orderTakeaway: "Seu pedido estará pronto para retirada em ",
    orderShortDelivery: "Seu pedido será entregue no seu local em ",
    orderVoucher: {
        firstMessage: "Accesse os seus ",
        secondMessage: "vouchers ",
        thirdMessage: "e apresente o ",
        forthMessage: "QR CODE ",
        fifthMessage: "no momento da retirada."
    },
    minutes: " minutos."
}

const SUCCESS_BOTTOM_COMPONENT = {
    subtotal: "Subtotal",
    total: "Total",
    code: "Código ",
    finish: "FECHAR",
    todayFormat: "DD [de] MMMM [de] YYYY"
}

//PAYMENT CONTAINER
const PAYMENT_CONTAINER = {
    title: "Pagamento"
}

const PAYMENT_HEADER_COMPONENT = {
    makePayment: "Como você quer fazer o pagamento?",
    choosePayment: "Escolha a melhor forma de efetuar o pagamento do seu pedido."
}

const PAYMENT_NOW_COMPONENT = {
    payNow: "Pagar agora"
}

const PAYMENT_NOW_CREDIT_CARD_COMPONENT = {
    title: "Cartão de crédito",
    description: {
        first: "Utilize a",
        second: " 4all",
        third: " para pagar seu pedido. Selecione um",
        fourth: " cartão de crédito",
        fifth: " previamente cadastrado ou cadastre um novo"
    }
}

const PAYMENT_NOW_WALLET_COMPONENT = {
    title: "Saldo da carteira 4all",
    description: {
        first: "Utilize o saldo da sua",
        second: " carteira virtual 4all",
        third: " para pagar seu pedido"
    }
}

const PAYMENT_ON_DELIVERY_COMPONENT = {
    payDelivery: "Pagar na entrega",
    subtotal: "Subtotal:",
    delivery: "Entrega ",
    takeaway: "Retirada ",
    totalValue: "Valor total:",
    free: "Grátis",
    placeOrder: "FINALIZAR PEDIDO"
}

const PAY_WITH_MONEY_COMPONENT = {
    money: "Dinheiro",
    needChange: "Precisa de troco?",
    howMuch: "Troco para quanto?"
}

const PAY_WITH_FOOD_TICKET_COMPONENT = {
    foodTicket: "Vale refeição",
    description: {
        first: "Selecione a",
        second: " bandeira",
        third: " do seu",
        fourth: " vale refeição",
        fifth: " para fazer o pagamento na entrega do pedido."
    }
}

const PAY_WITH_DEBIT_CARD_COMPONENT = {
    debitCard: "Cartão de débito",
    description: {
        first: "Selecione a",
        second: " bandeira",
        third: " do seu",
        fourth: " cartão de débito",
        fifth: " para fazer o pagamento na entrega do pedido."
    }
}

const PAYMENT_CONTROLLER = {
    selectPaymentMethod: "Você deve selecionar um método de pagamento",
    wrongChange: "O troco solicitado deve ser um valor maior que o valor total"
}

const WALLET_ACCOUNT_BALANCE_COMPONENT = {
    walletBalance: "Saldo da Carteira 4all"
}

const SELECT_CREDIT_CARD_COMPONENT = {
    addCreditCard: "Adicionar um novo cartão",
    creditCard: "Cartão de crédito",
    change: "Alterar",
    register: "Registrar"
}

const ADDRESS_LIST_CONTAINER = {
    addressPlaceholder: "Endereço",
    title: "Meus endereços",
    attention: "Atenção",
    wantToDeleteAddress: "Deseja apagar o endereço selecionado?",
    newAddress: "INFORMAR NOVO ENDEREÇO",
    number: "nº",
    zip: "CEP"
}

const PRICE_SPECIFICATION = {
    from: "De",
    to: "por"
}

const PRODUCT_DETAIL_COMPONENT = {
    observation: "Observações",
    unitaryPrice: "Valor unitário: ",
    add: "ADICIONAR",
    placeholderObs: "Adicionar comentário (sem cebola, bem passado, etc..)"
}

const ADDRESS_SEARCH_CONTAINER = {
    title: "Informar um endereço",
    byStreetAddress: "POR ENDEREÇO",
    byGeolocation: "POR LOCALIZAÇÃO",
    byZipCode: "POR CEP"
}

const ADDRESS_DETAILS_CONTAINER = {
    title: "Informe o endereço",
    number: "nº",
    zip: "CEP",
    streetNumber: "Número",
    complement: "Complemento (caso houver)",
    identifyAddress: "Identifique o endereço:",
    home: "Casa",
    work: "Trabalho",
    other: "Outro",
    nameTheAddress: "Dê um nome para este endereço:",
    typeAddressName: "Digite o nome do endereço",
    save: "SALVAR",
    fieldRequired: "Número (campo obrigatório)",
    attention: "Atenção",
    invalidAddress: "O endereço não possui o número informado",
    invalidZipCode: "O endereço não possui o CEP informado",
    defaultCountry: "Brasil",
    serverError: "Houve um erro no servidor, por favor tente novamente mais tarde"
}

const ADDRESS_SEARCH_NAME_CONTAINER = {
    title: "Informe um endereço:",
    placeholder: "Digite o nome da rua"
}

const ADDRESS_SEARCH_ZIPCODE_CONTAINER = {
    title: "Informe o CEP:",
    placeholder: "Digite o CEP",
    defaultCountry: "Brasil"
}

const ADDRESS_SEARCH_GEOLOCATION_CONTAINER = {
    title: "Confirme o endereço:"
}

const LOCATION_SETTINGS = {
    attention: "Atenção",
    needActivateGps: "Você precisa ativar o gps para buscarmos sua localização",
    locationNotFound: "Não conseguimos detectar a sua localização"
}

const MODAL_ZIPCODE_COMPONENT = {
    warningTitle: "Atenção",
    warningDescription: "Não conseguimos recuperar todas as suas informações do endereço, por favor complete o seu CEP abaixo.",
    confirmButton: "Confirmar"
}

//CART CONTAINER
const CART_CONTAINER = {
    title: "Finalizar Pedido",
    addressComponent:{
        headerAddress: "Confira o endereço de entrega",
        changeAddress: "Alterar",
        min: "min",
        hours: "horas",
        days: "dias",
        delivery: "Entrega",
        informAddress: "Informar endereço",
        zip:"CEP",
        priceFree:"Grátis"
    },
    unityInformationComponent:{
        delivery:"(entrega)",
        takeAway: "(retirada)"
    },
    listProductsComponent:{
        reviewItems:"Revise os seus itens",
        titleSubTotal:"Subtotal"
    },
    paymentCartComponent:{
        totalPrice:"Valor total",
        titleButtomPayment:"ESCOLHER FORMA DE PAGAMENTO"
    },
    cartController:{
        loginFail:"Falha no login. Tente novamente mais tarde!",
        addressNotSupported:"Endereço selecionado não atendido pela loja",
        noProducts:"Não existem produtos no carrinho"
    },
    indoorDeliveryComponent: {
        headerTitleOutdoorDelivery: "Forma de entrega do pedido",
        takeaway: {
            multipleCellFirstMessage: "Vou buscar, ",
            multipleCellSecondMessage: "pode fazer!",
            singleCellFirstMessage: "Retire na loja com preparo imediato",
            singleCellSecondMessage: "O seu pedido entrará em produção agora e você retira na loja daqui ",
            singleCellBottomMessage: {
                firstMessage: "O seu pedido ",
                secondMessage: "entra em produção agora ",
                thirdMessage: "e você retira na loja daqui "
            }
        },
        shortDelivery: {
            multipleCellFirstMessage: "Entrega na",
            multipleCellSecondMessage: "mesa.",
            singleCellFirstMessage: "Faça o seu pedido na mesa",
            singleCellSecondMessage: "Clique e escaneie o código da sua mesa para sabermos onde entregar",
            singleCellBottomMessage: {
                firstMessage: "Você receberá o seu ",
                secondMessage: "pedido ",
                thirdMessage: "em até "
            }
        },
        voucher: {
            multipleCellFirstMessage: "Vou buscar",
            multipleCellSecondMessage: "mais tarde",
            singleCellFirstMessage: "Retire na loja com preparo na hora",
            singleCellSecondMessage: "Você recebe um voucher e após apresentá-lo na loja seu pedido entrará em produção",
            singleCellBottomMessage: {
                firstMessage: "Você recebe um  ",
                secondMessage: "voucher e após apresentá-lo na loja ",
                thirdMessage: "seu pedido entrará em produção"
            }
        }
    }
}

//PRODUCT CONTAINER
const PRODUCT_CONTAINER = {
    buttonAddProduct: "Adicionar ao carrinho",
    buttonCloseAlert: "Fechar"
}

//ORDER HISTORY CONTAINER
const ORDER_HISTORY_CONTAINER = {
    title: "Histórico de Pedidos"
}

const ORDER_HISTORY_CELL_COMPONENT = {
    deliveryIn: "Entrega prevista: ",
    deliveredAt: "Entregue em: ",
    takeawayIn: "Retirada prevista: ",
    canceledIn: "Cancelado em: ",
    addressTitle: "Endereço de entrega",
    deliveryCost: "Entrega",
    deliveryTotal: "Total: "
}

//ORDER STATUS CONTAINER
const ORDER_STATUS_CONTAINER = {
    title: "Status do Pedido"
}

const ORDER_STATUS_COMPONENT = {
    orderNumber: "Número do Pedido",
    statusTitle: "Status",
    orderReceived: "Pedido Recebido",
    paymentDeclined: "Pagamento Não Autorizado",
    paymentConfirmed: "Pagamento Confirmado",
    confirmed: "Confirmado",
    orderInProduction: "Em Produção",
    orderReady: "Pronto para Retirada",
    orderInDelivery: "Enviado para Entrega",
    orderDelivered: "Entregue",
    orderCanceled: "Cancelado"
}

const ORDER_STATUS_DELIVERY_COMPONENT = {
    deliveryTitle: "Previsão de entrega",
    addressTitle: "Endereço de entrega"
}

const ORDER_STATUS_CONTROLLER = {
    zip: "CEP "
}

//MODIFIER CONTAINER
const PRODUCT_DESCRIPTION_COMPONENT = {
    seeMore: "Ver mais",
    seeLess: "Ver menos"
}

const MODIFIERS_HEADER_COMPONENT = {
    steps: "Passo ",
    of: " de ",
    chooseComplements: "Escolha os complementos desejados"
}

const MODIFIERS_MULTIPLE_SELECTION = {
    aditional: "Adicionais",
    sideDish: "Acompanhamentos",
    min: "Mínimo: ",
    max: "Máximo: "
}

const MODIFIERS_SINGLE_SELECTION = {
    sideDish: "Acompanhamentos",
    chooseOption: "Escolha 1 opção"
}

const ORDER_TYPE ={
    takeAway: "Retirar na loja",
    delivery: "Delivery",
    shortDelivery: "Entrega na mesa",
    voucher: "Voucher",
    check: "",
    inStore: "",
    shortTakeAway: "",
    appToApp: "Loja"
}

//LOGIN USER COMPONENT
const LOGIN_USER_COMPONENT = {
    title: "Muito bem!",
    messageOrder: "Para continuar seu pedido, efetue login",
    messageCheck: "Para realizar o pagamento da comanda, efetue login",
    buttonSignIn: "EFETUAR LOGIN",
    buttonSignUp: "NÃO POSSUO CADASTRO"
}

//SELECT ADDRESS COMPONENT
const SELECT_ADDRESS_COMPONENT = {
    title: "Quase lá!",
    subtitle: "Agora você precisa selecionar o endereço de entrega",
    buttonSelectAddress: "SELECIONAR ENDEREÇO",
}

//CHECK BAR COMPONENT
const CHECK_BAR_COMPONENT = {
    orderResume: "Você está pedindo agora...",
    offlineMessage: "Para completar seu pedido, você precisa efetuar login",
    items: "ITENS",
    table: "MESA",
    check: "COMANDA",
    order: "PEDIR",
    login: "LOGIN",
    expand: "EXPANDIR",
    retract: "RECOLHER"
}

//MODAL_TABLE_NUMBER COMPONENT
const MODAL_TABLE_NUMBER_COMPONENT = {
    title: "AJUDE-NOS A TE ENCONTRAR",
    subtitle: "INFORME SUA MESA"
}

const MODAL_SUCCESS_ALERT_COMPONENT = {
    yourOrder: "SEU PEDIDO FOI",
    confirmed: "CONFIRMADO",
    textConfirmedOrder: "Seu pedido foi confirmado e logo será entregue em sua mesa. Caso queira ver detalhes do que já pediu, basta acessar a sua comanda no botão ver comanda.",
    gotIt: "OK"
}

const STORAGE_CHECK = {
    check: "Comanda ",
    myCheck: "Minha Comanda "
}

//ERRORS
const ERROR = {
    CONNECTION_EXCEPTION: {
        noConnection: "Erro na conexão"
    },
    ADD_PRODUCT_EXCEPTION: {
        differentOrderType: "O produto que você está adicionando possui a forma de entrega diferente dos produtos do carrinho. Gostaria de limpar o carrinho e adicionar esse produto?",
        differentUnity: "Já existem produtos de outro estabelecimento no carrinho. Gostaria de limpar o carrinho e adicionar esse produto?"
    }
}

module.exports = {
    GENERAL_STRINGS,
    ERROR,
    NO_DATA_WARNING,
    NO_ADDRESSES_WARNING,
    NO_INTERNET_WARNING,
    NO_LOCATION_WARNING,
    NO_LOCATION_FOUND_WARNING,
    NO_UNITIES_WARNING,
    NO_RESULTS_WARNING,
    NO_SESSION_WARNING,
    NO_ADDRESS_FOUND_WARNING,
    NO_ORDERS_WARNING,
    NO_ORDERS_OFFERS_WARNING,
    NO_OFFERS_WARNING,
    NO_PRODUCTS_WARNING,
    NATIVE_FUNCTIONS_WARNING,
    CHECK_PRODUCT_LIST_COMPONENT,
    CHECK_PAYMENT_CONTAINER,
    CHECK_PAYMENT_COMPONENT,
    TAB_CONTAINER,
    OFFERS_CONTAINER,
    HEADER_COMPONENT,
    UNITY_HEADER_SECTION_COMPONENT,
    UNITY_SHIFTS_COMPONENT,
    UNITY_CONTACT_COMPONENT,
    UNITY_INFORMATION_COMPONENT,
    CATALOG_CELL_COMPONENT,
    CHECK_SUCCESS_CONTAINER,
    CHECK_SUCCESS_COMPONENT,
    ORDER_TYPE_SELECTION_COMPONENT,
    SUCCESS_CONTAINER,
    SUCCESS_HEADER_COMPONENT,
    SUCCESS_BOTTOM_COMPONENT,
    PAYMENT_CONTAINER,
    PAYMENT_HEADER_COMPONENT,
    PAYMENT_NOW_COMPONENT,
    PAYMENT_NOW_CREDIT_CARD_COMPONENT,
    PAYMENT_NOW_WALLET_COMPONENT,
    PAYMENT_ON_DELIVERY_COMPONENT,
    PAY_WITH_MONEY_COMPONENT,
    PAY_WITH_FOOD_TICKET_COMPONENT,
    PAY_WITH_DEBIT_CARD_COMPONENT,
    PAYMENT_CONTROLLER,
    WALLET_ACCOUNT_BALANCE_COMPONENT,
    SELECT_CREDIT_CARD_COMPONENT,
    PRICE_SPECIFICATION,
    PRODUCT_DETAIL_COMPONENT,
    ADDRESS_LIST_CONTAINER,
    ADDRESS_SEARCH_CONTAINER,
    ADDRESS_SEARCH_NAME_CONTAINER,
    ADDRESS_SEARCH_ZIPCODE_CONTAINER,
    ADDRESS_SEARCH_GEOLOCATION_CONTAINER,
    ADDRESS_DETAILS_CONTAINER,
    LOCATION_SETTINGS,
    CART_CONTAINER,
    MODAL_ZIPCODE_COMPONENT,
    PRODUCT_CONTAINER,
    ORDER_HISTORY_CONTAINER,
    ORDER_HISTORY_CELL_COMPONENT,
    ORDER_STATUS_CONTAINER,
    ORDER_STATUS_COMPONENT,
    ORDER_STATUS_DELIVERY_COMPONENT,
    ORDER_STATUS_CONTROLLER,
    PRODUCT_DESCRIPTION_COMPONENT,
    MODIFIERS_HEADER_COMPONENT,
    MODIFIERS_MULTIPLE_SELECTION,
    MODIFIERS_SINGLE_SELECTION,
    UNITY_LIST_COMPONENT,
    UNITY_LIST_CONTROLLER,
    ORDER_TYPE,
    LOGIN_USER_COMPONENT,
    SELECT_ADDRESS_COMPONENT,
    CHECK_BAR_COMPONENT,
    MODAL_TABLE_NUMBER_COMPONENT,
    MODAL_SUCCESS_ALERT_COMPONENT,
    STORAGE_CHECK
}