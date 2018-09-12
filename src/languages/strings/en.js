const GENERAL_STRINGS = {
    alertErrorTitle: "Oops...",
    alertErrorMessage: "Try again later",
    monetary: "$",
    appName: "Gastronomy Module",
    currencyFormat: "0.0,00",
    yes: "Yes",
    no: "No",
    ok: "OK",
    back: "Back",
    warning:"Warning",
    genericError: "An error has ocurred",
    loading: "Loading...",
    emptyCart: "Your cart is currently empty",
    emptyCheck: "No item was selected",
    unityClosed: "The store is currently closed",
    openOrder: "You have an open order",
    next: "NEXT",
    noOrders: "You haven't ordered anything yet",
    minutes: "minutes",
    min: "min",
    hours: "hours",
    days: "days"
}

const NO_DATA_WARNING = {
    firstMessage: "We can't find any results…",
    secondMessage: "There's a problem trying to connect to the server. Please try again later."
}

const NO_ADDRESSES_WARNING = {
    firstMessage: "We can't find any registered addresses...",
    secondMessage: "Add your addresses and make your deliveries easier.",
    newAddress: "ADD NEW ADDRESS"
}

const NO_INTERNET_WARNING = {
    firstMessage: "We can't get you online…",
    secondMessage: "There's a problem trying to connect to the internet. Please try again later.",
    tryAgain: "Try again"
}

const NO_LOCATION_WARNING = {
    firstMessage:"Before we continue, we need to know where you are...",
    secondMessage:"Please activate your gps se we can detect your location",
    tryAgain: "Try again"
}

const NO_LOCATION_FOUND_WARNING = {
    firstMessage:"Oops! We couldn't detect your current location",
    secondMessage:"Please try again later",
    tryAgain: "Try again"
}

const NO_UNITIES_WARNING = {
    title: "Oops, it looks like that there are no stores nearby",
    message: "We are working to take stores near you",
    buttonTitle: "Try again"
}

const NO_RESULTS_WARNING = {
    firstMessage: "You haven't made any punchases yet..",
    secondMessage: "Your purchase history will be listed here."
}

const NO_SESSION_WARNING = {
    firstMessage: "You aren't logged in...",
    secondMessage: "Touch the button bellow to start.",
    loginButton: "Login"
}

const NO_ORDERS_WARNING = {
    firstMessage: "You don't have any active orders.",
    secondMessage: "Go to our stores section and check out the avaliable options.",
    button: "Open store list!"
}

const NO_ORDERS_OFFERS_WARNING = {
    firstMessage: "You don't have any active orders.",
    secondMessage: "Go to our offers section and check out the avaliable options.",
    button: "Open offers list!"
}

const NO_OFFERS_WARNING = {
    title: "Oops, it looks like that there are no offers nearby",
    message: "We are working to take offers near you",
    buttonTitle: "Try again"
}

const NO_ADDRESS_FOUND_WARNING = {
    firstMessageNoResults: "Ops!",
    secondMessageNoResults: "We were not able to idenfity where you are, please use other tab to find it",
    firstMessageNoGps: "Before we continue, we need to know where you are...",
    secondMessageNoGps: "Please activate your gps se we can detect your location"
}

const NO_PRODUCTS_WARNING = {
    firstMessage: "Nothing here",
    secondMessage: "Your check is empty. To add items, go to the menu and order them.",
    buttonMessage: "Show menu"
}

const NATIVE_FUNCTIONS_WARNING = {
    closeModuleTitle: "Oops...",
    closeModuleMessage: "The function onClose must be implemented"
}

const TAB_CONTAINER = {
    offersTab: "Offers",
    catalogTab: "Menu"
}

const OFFERS_CONTAINER = {
    title: "Discount Club",
    offersNearby: "Offers nearby"
}

const HEADER_COMPONENT = {
    info: "Show informations",
    offersCatalog: "Offers/Catalog",
    unityClosed: "Currently closed"
}

//CHECK PRODUCT LIST CONTAINER
const CHECK_PRODUCT_LIST_COMPONENT = {
    subtotal: "Subtotal",
    tips: "Service charge (10%)",
    total: "Total",
    topMessage: "The values are from the single price from each product",
    addProducts: "ADD MORE PRODUCTS",
    payCheck: "PAY CHECK"
}

//CHECK PAYMENT CONTAINER
const CHECK_PAYMENT_CONTAINER = {
    title: "Payment Summary"
}

const CHECK_PAYMENT_COMPONENT = {
    totalToPay: "Total to pay:",
    selectPaymentMethod: "Select a payment method:",
    payNow: "PAY NOW"
}

//CHECK SUCCESS CONTAINER
const CHECK_SUCCESS_CONTAINER = {
    title: "Payment Summary"
}

const CHECK_SUCCESS_COMPONENT = {
    firstMessage: "THANKS!",
    secondMessage: "PAYMENT DONE",
    finish: "CLOSE",
    paidValue: "Paid value:"
}

//UNITY LIST CONTAINER
const UNITY_LIST_COMPONENT = {
    closedUnities: "Closed stores"
}

const UNITY_LIST_CONTROLLER = {
    noUnity: "There is no store at this moment"
}

//UNITY INFO CONTAINER
const UNITY_HEADER_SECTION_COMPONENT = {
    contact: "Contact",
    location: "Location",
    shifts: "Opening Hours",
}

const UNITY_SHIFTS_COMPONENT = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    from: "HH[h]mm",
    to: " [to] HH[h]mm",
    fromZeroMinutes: "HH[h]",
    toZeroMinutes: " [to] HH[h]"
}

const UNITY_CONTACT_COMPONENT = {
    telephone: "Telephone",
    website: "Website"
}

const UNITY_INFORMATION_COMPONENT = {
    information: "Information"
}

const CATALOG_CELL_COMPONENT = {
    fromPrice: "From"
}

//ORDER TYPE SELECTION CONTAINER
const ORDER_TYPE_SELECTION_COMPONENT = {
    headerTitle: "Gastronomy",
    selectOrderType: "Please, select how do you want to receive your order"
}

//SUCCESS CONTAINER
const SUCCESS_CONTAINER = {
    title: "Order Placed"
}

const SUCCESS_HEADER_COMPONENT = {
    thanks: "Thank you very much!",
    paymentSuccessfulNow: "Your payment was successful",
    paymentSuccessfulDeliver: "Your order was successfully placed",
    orderDelivery: "Your order will be delivered in ",
    orderTakeaway: "Your order will be ready to takeaway in ",
    orderShortDelivery: "Your order will be delivered at your place in ",
    orderVoucher: {
        firstMessage: "Access your ",
        secondMessage: "vouchers ",
        thirdMessage: "and show the ",
        forthMessage: "QR CODE ",
        fifthMessage: "when you take your order."
    },
    minutes: " minutes."
}

const SUCCESS_BOTTOM_COMPONENT = {
    subtotal: "Subtotal",
    total: "Total",
    code: "Code ",
    finish: "CLOSE",
    todayFormat: "DD MMMM YYYY"
}

//PAYMENT CONTAINER
const PAYMENT_CONTAINER = {
    title: "Payment"
}

const PAYMENT_HEADER_COMPONENT = {
    makePayment: "How do you want to make your payment?",
    choosePayment: "Choose the best method to pay for your order."
}

const PAYMENT_NOW_COMPONENT = {
    payNow: "Pay now"
}

const PAYMENT_NOW_CREDIT_CARD_COMPONENT = {
    title: "Credit card or wallet's balance",
    description: {
        first: "Use",
        second: " 4all",
        third: " to pay for your order. Select a previously registed",
        fourth: " credit card",
        fifth: " or register a new one"
    }
}

const PAYMENT_NOW_WALLET_COMPONENT = {
    title: "Credit card or wallet's balance",
    description: {
        first: "Use your",
        second: " 4all wallet",
        third: " to pay for your order."
    }
}

const PAYMENT_ON_DELIVERY_COMPONENT = {
    payDelivery: "Pay on deliver",
    subtotal: "Subtotal:",
    delivery: "Delivery time ",
    takeaway: "Takeaway time ",
    totalValue: "Total:",
    free: "Free",
    placeOrder: "PLACE ORDER"
}

const PAY_WITH_MONEY_COMPONENT = {
    money: "Money",
    needChange: "Do you need change?",
    howMuch: "How much?"
}

const PAY_WITH_FOOD_TICKET_COMPONENT = {
    foodTicket: "Food ticket",
    description: {
        first: "Choose the",
        second: " card brand",
        third: " of your",
        fourth: " food ticket",
        fifth: " to pay for your order on the delivery."
    }
}

const PAY_WITH_DEBIT_CARD_COMPONENT = {
    foodTicket: "Food ticket",
    description: {
        first: "Choose the",
        second: " card brand",
        third: " of your",
        fourth: " debit card",
        fifth: " to pay for your order on the delivery."
    }
}

const PAYMENT_CONTROLLER = {
    selectPaymentMethod: "You must select a payment method",
    wrongChange: "The solicited change must be greater than the total value"
}

const WALLET_ACCOUNT_BALANCE_COMPONENT = {
    walletBalance: "4all Wallet Balance"
}

const SELECT_CREDIT_CARD_COMPONENT = {
    addCreditCard: "Register new credit card",
    creditCard: "Credit card",
    change: "Change",
    register: "Register"
}

const ADDRESS_LIST_CONTAINER = {
    addressPlaceholder: "Address",
    title: "Address list",
    attention: "Attention",
    wantToDeleteAddress: "Do you really want to delete this address?",
    newAddress: "ADD NEW ADDRESS",
    number: "nº",
    zip: "ZIP"
}

const PRICE_SPECIFICATION = {
    from: "From",
    to: "for"
}

const PRODUCT_DETAIL_COMPONENT = {
    observation: "Observation",
    unitaryPrice: "Unitary price: ",
    add: "ADD",
    placeholderObs: "Add observation (without onions, well done, etc..)"
}

const ADDRESS_SEARCH_CONTAINER = {
    title: "Inform an address",
    byStreetAddress: "BY ADDRESS",
    byGeolocation: "BY LOCATION",
    byZipCode: "BY ZIP CODE"
}

const ADDRESS_DETAILS_CONTAINER = {
    title: "Inform your address",
    number: "nº",
    zip: "ZIP",
    streetNumber: "Number",
    complement: "Complement (if there is one)",
    identifyAddress: "Identify this address:",
    home: "Home",
    work: "Work",
    other: "Other",
    nameTheAddress: "Give this address a name:",
    typeAddressName: "Type here the address name",
    save: "SAVE",
    fieldRequired: "Number (required field)",
    attention: "Attention",
    invalidAddress: "The address doesn't have the number typed",
    invalidZipCode: "The address doesn't have the zip code typed",
    defaultCountry: "Brazil",
    serverError: "A server error has ocorred, please try again later"
}

const ADDRESS_SEARCH_NAME_CONTAINER = {
    title: "Inform the address:",
    placeholder: "Type here the street's name"
}

const ADDRESS_SEARCH_ZIPCODE_CONTAINER = {
    title: "Inform the ZIP Code",
    placeholder: "Type here the ZIP Code",
    defaultCountry: "Brazil"
}

const ADDRESS_SEARCH_GEOLOCATION_CONTAINER = {
    title: "Confirm the address:"
}

const LOCATION_SETTINGS = {
    attention: "Attention",
    needActivateGps: "You need to have your gps activated for us to find your location",
    locationNotFound: "We coudn't find your location"
}

const MODAL_ZIPCODE_COMPONENT = {
    warningTitle: "Attention",
    warningDescription: "We coudn't get all the information about your address, please complete your zip code bellow.",
    confirmButton: "Confirm"
}

//CART CONTAINER
const CART_CONTAINER = {
    title: "Place Order",
    addressComponent:{
        headerAddress: "Check the delivery address",
        changeAddress: "Change",
        min: "min",
        hours: "hours",
        days: "days",
        delivery: "Delivery ",
        informAddress: "Inform",
        zip:"ZIP",
        priceFree:"Free"
    },
    unityInformationComponent:{
        delivery:"(delivery)",
        takeAway: "(takeaway)"
    },
    listProductsComponent:{
        reviewItems:"Check your items",
        titleSubTotal:"Subtotal"
    },
    paymentCartComponent:{
        totalPrice:"Total",
        titleButtomPayment:"CHOOSE THE PAYMENT METHOD"
    },
    cartController:{
        loginFail:"Login fail. Try again!",
        addressNotSupported:"The store does not delivery to the selected address",
        noProducts:"There are no products in the cart"
    },
    indoorDeliveryComponent: {
        headerTitleOutdoorDelivery: "Order delivery method",
        takeaway: {
            multipleCellFirstMessage: "I'll take, ",
            multipleCellSecondMessage: "you can prepare it!",
            singleCellFirstMessage: "Take it at the store with immediate preparation",
            singleCellSecondMessage: "Your order will be prepared now and you can take it in  ",
            singleCellBottomMessage: {
                firstMessage: "Your order ",
                secondMessage: "will be prepared starting now ",
                thirdMessage: "and you can take it in "
            }
        },
        shortDelivery: {
            multipleCellFirstMessage: "Delivered at the",
            multipleCellSecondMessage: "table.",
            singleCellFirstMessage: "Make your order on the table",
            singleCellSecondMessage: "Click and scan your table's code so we know where to deliver",
            singleCellBottomMessage: {
                firstMessage: "You'll receive your ",
                secondMessage: "order ",
                thirdMessage: "in "
            }
        },
        voucher: {
            multipleCellFirstMessage: "I'll take it",
            multipleCellSecondMessage: "later",
            singleCellFirstMessage: "Take it at the store with immediate preparation",
            singleCellSecondMessage: "You'll receive a voucher and after showing it at the store your order will be prepared",
            singleCellBottomMessage: {
                firstMessage: "You'll receive a  ",
                secondMessage: "voucher and after showing it at the store ",
                thirdMessage: "your order will be prepared"
            }
        }
    }
}

//PRODUCT CONTAINER
const PRODUCT_CONTAINER = {
    buttonAddProduct:"Add on the cart",
    buttonCloseAlert:"Close"
}

//ORDER HISTORY CONTAINER
const ORDER_HISTORY_CONTAINER = {
    title: "Order History"
}

const ORDER_HISTORY_CELL_COMPONENT = {
    deliveryIn: "Estimated delivery time: ",
    deliveredAt: "Delivered at: ",
    takeawayIn: "Estimated takeaway time: ",
    canceledIn: "Canceled in: ",
    addressTitle: "Delivery address",
    deliveryCost: "Delivery",
    deliveryTotal: "Total: "
}

//ORDER STATUS CONTAINER
const ORDER_STATUS_CONTAINER = {
    title: "Order Status"
}

const ORDER_STATUS_COMPONENT = {
    orderNumber: "Order Number",
    statusTitle: "Status",
    orderReceived: "Order Received",
    paymentDeclined: "Payment Declined",
    paymentConfirmed: "Payment Confirmed",
    confirmed: "Confirmed",
    orderInProduction: "Order in Production",
    orderReady: "Ready to Takeaway",
    orderInDelivery: "Order in Delivery",
    orderDelivered: "Delivered",
    orderCanceled: "Canceled"
}

const ORDER_STATUS_DELIVERY_COMPONENT = {
    deliveryTitle: "Delivery estimated time",
    addressTitle: "Delivery address"
}

const ORDER_STATUS_CONTROLLER = {
    zip: "ZIP "
}

//MODIFIER CONTAINER
const PRODUCT_DESCRIPTION_COMPONENT = {
    seeMore: "See more",
    seeLess: "See less"
}

const MODIFIERS_HEADER_COMPONENT = {
    steps: "Step",
    of: " of ",
    chooseComplements: "Choose the desired complements"
}

const MODIFIERS_MULTIPLE_SELECTION = {
    aditional: "Aditionals",
    sideDish: "Side dish",
    min: "Minimum: ",
    max: "Max: "
}

const MODIFIERS_SINGLE_SELECTION = {
    sideDish: "Side dish",
    chooseOption: "Choose 1 option"
}

const ORDER_TYPE ={
    takeAway: "Takeaway",
    delivery: "Delivery",
    shortDelivery: "",
    voucher: "Voucher",
    check: "",
    inStore: "",
    shortTakeAway: "",
    appToApp: "Store"
}

//LOGIN USER COMPONENT
const LOGIN_USER_COMPONENT = {
    title: "Nice!",
    messageOrder: "To continue please log in",
    messageCheck: "To pay your check please log in",
    buttonSignIn: "SIGN IN",
    buttonSignUp: "I'M NOT REGISTERED"
}

//SELECT ADDRESS COMPONENT
const SELECT_ADDRESS_COMPONENT = {
    title: "Almost there!",
    subtitle: "Now you need to select a delivery address",
    buttonSelectAddress: "SELECT ADDRESS",
}

//CHECK BAR COMPONENT
const CHECK_BAR_COMPONENT = {
    orderResume: "You are ordering now...",
    offlineMessage: "To finish your order please sign in",
    items: "ITEMS",
    table: "TABLE",
    check: "CHECK",
    order: "ORDER",
    login: "LOGIN",
    expand: "EXPAND",
    retract: "RETRACT"
}

//MODAL_TABLE_NUMBER COMPONENT
const MODAL_TABLE_NUMBER_COMPONENT = {
    title: "HELP US FIND YOU",
    subtitle: "TYPE YOUR TABLE"
}

const MODAL_SUCCESS_ALERT_COMPONENT = {
    yourOrder: "YOUR ORDER HAS BEEN",
    confirmed: "CONFIRMED",
    textConfirmedOrder: "Your order has been confirmed and soon will be delivered at your table. In case you want to check the details of what you already ordered, you can go to your check details.",
    gotIt: "OK"
}

const STORAGE_CHECK = {
    check: "Check ",
    myCheck: "My check "
}

//ERRORS
const ERROR = {
    CONNECTION_EXCEPTION: {
        noConnection: "Connection error"
    },
    ADD_PRODUCT_EXCEPTION: {
        differentOrderType: "The product you are adding has a different delivery method from the products in the cart. Would you like to clean the cart and add it?",
        differentUnity: "There are products from another store in the cart. Would you like to clean the cart and add it?"
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
    NO_ORDERS_WARNING,
    NO_ORDERS_OFFERS_WARNING,
    NO_OFFERS_WARNING,
    NO_ADDRESS_FOUND_WARNING,
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
    CATALOG_CELL_COMPONENT,
    CHECK_BAR_COMPONENT,
    MODAL_TABLE_NUMBER_COMPONENT,
    MODAL_SUCCESS_ALERT_COMPONENT,
    STORAGE_CHECK
}