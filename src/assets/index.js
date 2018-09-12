import { Platform } from "react-native"

export default {
    backgrounds: {
        offersBackground: require("./backgrounds/offersBackground/offersBackground.png")
    },
    icons: {
        arrowBack: Platform.OS === "android" ? require("./icons/arrowBackAndroid/arrowBackAndroid.png") : require("./icons/arrowBackIos/arrowBackIos.png"),
        arrowRight: require("./icons/arrowRight/arrowRight.png"),
        arrowDown: require("./icons/arrowDown/arrowDown.png"),
        arrowDownFilled: require("./icons/arrowDownFilled/arrowDownFilled.png"),
        arrowUp: require("./icons/arrowUp/arrowUp.png"),
        arrowUpFilled: require("./icons/arrowUpFilled/arrowUpFilled.png"),
        backgroundCouponOffer: require("./icons/backgroundCouponOffer/backgroundCouponOffer.png"),
        bankNote: require("./icons/bankNote/bankNote.png"),
        cancel: require("./icons/cancel/cancel.png"),
        cancelOrder: require("./icons/cancelOrder/cancelOrder.png"),
        cart: require("./icons/cart/cart.png"),
        check: require("./icons/check/check.png"),
        checkBorder: require("./icons/checkBorder/checkBorder.png"),
        checkIcon: require("./icons/checkIcon/checkIcon.png"),
        checkmark: require("./icons/checkmark/checkmark.png"),
        checkRadial: require("./icons/checkRadial/checkRadial.png"),
        circle: require("./icons/circle/circle.png"),
        circleDash: require("./icons/circleDash/circleDash.png"),
        circleFilled: require("./icons/circleFilled/circleFilled.png"),
        circleDashFilled: require("./icons/circleDashFilled/circleDashFilled.png"),
        clock: require("./icons/clock/clock.png"),
        contact: require("./icons/contact/contact.png"),
        creditCard: require("./icons/creditCard/creditCard.png"),
        delivery: require("./icons/delivery/delivery.png"),
        floatIcon: require("./icons/floatIcon/floatIcon.png"),
        foodTicket: require("./icons/foodTicket/foodTicket.png"),
        forkKnife: require("./icons/forkKnife/forkKnife.png"),
        forkSpoon: require("./icons/forkSpoon/forkSpoon.png"),
        gastronomy: require("./icons/gastronomy/gastronomy.png"),
        info: require("./icons/info/info.png"),
        location: require("./icons/location/location.png"),
        logo4all: require("./icons/logo4all/logo4all.png"),
        mastercard: require("./icons/mastercard/master_card.png"),
        minus: require("./icons/minus/minus.png"),
        minusFilled: require("./icons/minusFilled/minusFilled.png"),
        next: require("./icons/next/next.png"),
        noInternet: require("./icons/noInternet/icon-no-internet.png"),
        noLocation: require("./icons/noLocation/noLocation.png"),
        noCard: require("./icons/cardPlaceHolder/card_placeholder.png"),
        noData: require("./icons/noData/icon-bad.png"),
        noOffers: require("./icons/noOffers/noOffers.png"),
        noOrders: require("./icons/noOrders/noOrders.png"),
        orderHistory: require("./icons/orderHistory/orderHistory.png"),
        pizza: require("./icons/pizza/pizza.png"),
        pin: require("./icons/pin/pin.png"),
        pinGastronomy: require("./icons/pinGastronomy/pinGastronomy.png"),
        placeholderStore: require("./icons/placeholderStore/placeholderStore.png"),
        plus: require("./icons/plus/plus.png"),
        plusFilled: require("./icons/plusFilled/plusFilled.png"),
        success: require("./icons/success/success.png"),
        table: require("./icons/table/table.png"),
        takeaway: require("./icons/takeaway/takeaway.png"),
        visa: require("./icons/visa/visa_card.png"),
        voucher: require("./icons/voucher/voucher.png"),
        loader1: require("./Loader-1.png"),
        loader2: require("./Loader-2.png"),
        loader3: require("./Loader-3.png"),
        loader4: require("./Loader-4.png"),
        loader5: require("./Loader-5.png"),
        loader6: require("./Loader-6.png"),
        loader7: require("./Loader-7.png"),
        loader8: require("./Loader-8.png"),
        loader9: require("./Loader-9.png"),
        loader10: require("./Loader-10.png"),
        loader11: require("./Loader-11.png"),
        loader12: require("./Loader-12.png"),
    }
}