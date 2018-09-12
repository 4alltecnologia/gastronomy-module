import React, { PureComponent } from "react"
import { Image, View, ScrollView, Text, StyleSheet } from "react-native"
import { findIndex } from "lodash"
import { FontFamily, FontColor } from "../../theme/Theme"
import Moment from "moment"
import Images from "../../assets/index"
import UnityHeaderSectionComponent from "../unityInfo/UnityHeaderSectionComponent"
import { UNITY_HEADER_SECTION_COMPONENT_STRINGS as UnityHeaderStrings, UNITY_SHIFTS_COMPONENT_STRINGS as UnityShiftsStrings } from "../../languages/index"

export default class UnityShiftComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            margin: 0,
            backgroundColor: "white"
        },
        week: {
            marginRight: 0,
            marginLeft: 0,
            backgroundColor: "rgb(242,242,242)"
        },
        weekday: {
            margin: 0,
            height: 54,
            alignItems: "center",
            flexDirection: "row"
        },
        line: {
            marginRight: 20,
            marginLeft: 20,
            height: 0.5,
            backgroundColor: "rgb(209,209,209)"
        }
    })

    stylesText = StyleSheet.create({
        weekday: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            textAlign: "left",
            marginLeft: 18,
            color: "rgb(128,128,128)"
        },
        openingHours: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            textAlign: "right",
            marginRight: 18,
            color: "rgb(128,128,128)",
            flex: 1,
            justifyContent: "flex-end"
        },
        openingHoursClosed: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            textAlign: "right",
            marginRight: 18,
            color: "rgb(194,37,46)",
            flex: 1,
            justifyContent: "flex-end"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            shifts: props.shifts
        }
    }

    renderWeekdayView(weekday) {
        let weekdayShifts = []

        this.state.shifts.map(shift => {
            shift.daysOfWeek.map(sht => {
                if (sht.name == weekday) {
                    shift.shifts.map(s => {
                        weekdayShifts.push(s)
                    })
                }
            })
        })

        if (weekdayShifts.length <= 0) {
            return (
                <View style = { this.stylesView.weekday } accessibilityLabel="viewWeekday">
                    <Text style = { this.stylesText.weekday } accessibilityLabel="textWeekday">
                        { weekday }
                    </Text>
                    <Text style = { this.stylesText.openingHoursClosed } accessibilityLabel="textOpeningHoursClosed">
                        { UnityShiftsStrings.closed }
                    </Text>
                </View>
            )
        } else {
            let text = ""
            let i = 1
            for (let ind = 0; ind < weekdayShifts.length; ++ind) {
                let shift = weekdayShifts[ind]

                if (Moment(shift.begin, "HH:mm:ss").get("minute") > 0) {
                    let time = Moment(shift.begin, "HH:mm:ss").format(UnityShiftsStrings.from)
                    text = text + time
                } else {
                    let time = Moment(shift.begin, "HH:mm:ss").format(UnityShiftsStrings.fromZeroMinutes)
                    text = text + time
                }
                if (Moment(shift.end, "HH:mm:ss").get("minute") > 0)  {
                    let time = Moment(shift.end, "HH:mm:ss").format(UnityShiftsStrings.to)
                    text = text + time
                } else {
                    let time = Moment(shift.end, "HH:mm:ss").format(UnityShiftsStrings.toZeroMinutes)
                    text = text + time
                }

                if (i < weekdayShifts.length) {
                    text = text + " - "
                } else {
                    text = text + " "
                }

                i++
            }

            return (
                <View style = { this.stylesView.weekday } accessibilityLabel="viewWeekday">
                    <Text style = { this.stylesText.weekday } accessibilityLabel="textWeekday">
                        { weekday }
                    </Text>
                    <Text style = { this.stylesText.openingHours } accessibilityLabel="textOpeningHours">
                        { text }
                    </Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel="viewGeneral">
                <View style = { this.stylesView.week } accessibilityLabel="viewWeek">
                    { this.renderWeekdayView(UnityShiftsStrings.monday) }
                    <View style = { this.stylesView.line } accessibilityLabel="viewLineOne"/>
                    { this.renderWeekdayView(UnityShiftsStrings.tuesday) }
                    <View style = { this.stylesView.line } accessibilityLabel="viewLineTwo"/>
                    { this.renderWeekdayView(UnityShiftsStrings.wednesday) }
                    <View style = { this.stylesView.line } accessibilityLabel="viewLineThree"/>
                    { this.renderWeekdayView(UnityShiftsStrings.thursday) }
                    <View style = { this.stylesView.line } accessibilityLabel="viewLineFour"/>
                    { this.renderWeekdayView(UnityShiftsStrings.friday) }
                    <View style = { this.stylesView.line } accessibilityLabel="viewLineFive"/>
                    { this.renderWeekdayView(UnityShiftsStrings.saturday) }
                    <View style = { this.stylesView.line } accessibilityLabel="viewLineSix"/>
                    { this.renderWeekdayView(UnityShiftsStrings.sunday) }
                </View>
            </View>
        )
    }
}
