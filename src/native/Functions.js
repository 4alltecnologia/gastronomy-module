let ExternalMethods = {
    hasUserLogged: () => {
        return
    },
    startLogin: () => {
        return
    },
    logout: () => {
        return
    },
    getUserLogged: () => {
        return
    },
    getCardID: () => {
        return
    },
    closeModule: () => {
        return
    },
    setup: () => {
        return
    },
    hasUserDataCompleted: () => {
        return
    }
}

function setExternalMethods(props){
    ExternalMethods.hasUserLogged = function(callback:(isLogged) => void){
        if (!!props.hasUserLogged) {
            props.hasUserLogged((isLogged) => {
                if (callback) callback(isLogged)
            })
        }
    }

    ExternalMethods.startLogin = function(callback:(success) => void){
        if (!!props.startLogin) {
            ExternalMethods.hasUserLogged((isLogged) => {
                if (!isLogged) {
                    props.startLogin((phoneNumber, emailAddress, sessionToken) => {
                        ExternalMethods.hasUserLogged((isLogged) => {
                            if (callback) callback(isLogged)
                        })
                    })
                } else {
                    if (callback) callback(true)
                }
            })
        }
    }

    ExternalMethods.logout = function(callback:(success) => void){
        if (!!props.logout) {
            ExternalMethods.hasUserLogged((isLogged) => {
                if (isLogged) {
                    props.logout((success) => {
                        if (callback) callback(success)
                    })
                } else {
                    if (callback) callback(false)
                }
            })
        }
    }

    ExternalMethods.getUserLogged = function(callback:(error, response) => void){
        if (!!props.getUserLogged) {
            props.getUserLogged((response) => {
                if (callback) {
                    if (response && response.hasOwnProperty("message")) {
                        const message = response.hasOwnProperty("message")

                        //Return Error and possible data response
                        callback(message, response)
                    } else if (response) {

                        //Return Success
                        callback(null, response)
                    } else {

                        //Return Error
                        callback("Get user error", null)
                    }
                }
            })
        }
    }

    ExternalMethods.getCardID = function(callback:(response) => void) {
        if (!!props.getCardID) {
            props.getCardID((result) => {
                if (result) {
                    callback(result)
                }
            })
        }
    }

    ExternalMethods.setup = function(environment, applicationId,applicationVersion, styleDictionary) {
        if (!!props.setup) {
            props.setup(environment, applicationId,applicationVersion, styleDictionary)
        }
    }

    ExternalMethods.closeModule = function() {
        if (!!props.closeModule) {
            props.closeModule()
        }
    }

    ExternalMethods.hasUserDataCompleted = function(callback:(success) => void) {
        if (!!props.hasUserDataCompleted) {
            props.hasUserDataCompleted((successResult) => {
                if (successResult) {
                    callback(successResult)
                }
            })
        }
    }
}

module.exports = {
    ExternalMethods,
    setExternalMethods
}