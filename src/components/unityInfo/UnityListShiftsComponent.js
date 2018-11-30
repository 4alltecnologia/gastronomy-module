import React, { PureComponent } from "react"
import { Image, View, ScrollView, Text, StyleSheet, Platform } from "react-native"
import { TabNavigator, TabBarTop } from "react-navigation"
import { findIndex } from "lodash"
import { FontFamily, FontColor, FontWeight } from "../../theme/Theme"
import Images from "../../assets/index"
import { UsedDaysOfWeek, getOrderTypeName, screenWidthPercentage } from "../../utils"
import UnityShiftComponent from "./UnityShiftComponent"

export default class UnityListShiftsComponent extends PureComponent {

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
            hourGroups: props.hourGroups,
            listHourGroups: []
        }
    }

    componentWillMount() {
        this.mountList()
    }

    mountList() {
        let filteredServices = this.state.hourGroups.filter((option, index, self) =>
            self.findIndex(t =>
                t.idOrderType === option.idOrderType) === index)

        filteredServices = filteredServices.map(service => {
            return {
                idOrderType: service.idOrderType,
                name: getOrderTypeName(service.idOrderType),
                shifts: []
            }
        })
        let listHourGroups = this.state.hourGroups.map(hourGroup => {
            let workingDays = []

            UsedDaysOfWeek.map(weekDay => {
                if ((weekDay.bitNumber & hourGroup.daysOfWeek) > 0) {
                    workingDays.push(weekDay)
                }
            })

            let shifts = hourGroup.shifts.map(shift => {
                return {
                    begin: shift.begin,
                    end: shift.end
                }
            })

            let group = {
                id: hourGroup.id,
                idOrderType: hourGroup.idOrderType,
                name: getOrderTypeName(hourGroup.idOrderType),
                daysOfWeek: workingDays,
                shifts: shifts
            }

            filteredServices.map(service => {
                if (service.idOrderType == group.idOrderType) {
                    service.shifts.push(group)
                }
            })
        })

        this.setState({
            listHourGroups: filteredServices
        })
    }

    renderTabs() {
        let tabWidth = (screenWidthPercentage(100)/this.state.listHourGroups.length)

        switch(this.state.listHourGroups.length) {
            case 1:
                tabWidth = tabWidth - 36
                break
            case 2:
                tabWidth = tabWidth - 20
                break
            default:
                break
        }

        const Tabs = TabNavigator(this.tabs(this.state.listHourGroups), {
            tabBarComponent: TabBarTop,
            tabBarPosition: "top",
            swipeEnabled: false,
            animationEnabled: Platform.OS === "ios",
            lazyLoad: false,
            scrollEnabled: false,
            tabBarOptions: {
                activeTintColor: "rgb(242,242,242)",
                inactiveTintColor: "rgb(250,250,250)",
                style: {
                    backgroundColor: "transparent",
                    marginHorizontal: 16
                },
                tabStyle: {
                    width: tabWidth,
                    backgroundColor: "rgb(242,242,242)",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    marginHorizontal: 2
                },
                labelStyle: {
                    fontFamily: FontFamily.font,
                    fontSize: 14,
                    fontWeight: FontWeight.medium,
                    color: "rgb(128,128,128)"
                },
                indicatorStyle : {
                    backgroundColor: "transparent",
                }
            }
        })

        return (<Tabs/>)
    }

    tabs(listHourGroups) {
        return listHourGroups.reduce((routes, hourGroup) => {
            routes[hourGroup.idOrderType] = this.tab(hourGroup)

            return routes
        }, {})
    }

    tab(hourGroup) {
        const screen = this.getTabForHourGroup(hourGroup)

        return {
            screen: screen,
            navigationOptions: {
                title: hourGroup.name,
            }
        }
    }

    getTabForHourGroup (hourGroup) {
        if (!!hourGroup) {
            return () => (<UnityShiftComponent shifts = { hourGroup.shifts }/>)
        } else {
            return () => (<View/>)
        }
    }

    render() {
        return (
            this.state.hourGroups.length > 0 ?
                <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                    { this.renderTabs() }
                </View>
            : null
        )
    }
}
