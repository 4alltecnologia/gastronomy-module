import { formatCpf, formatPhoneNumber, formatDate } from "../utils"

export default class User {
    constructor(dictionaty) {
        this.customerId = !dictionaty ? null : dictionaty.customerId
        this.sessionToken = !dictionaty ? null : dictionaty.sessionToken
        this.fullName = !dictionaty ? null : dictionaty.fullName
        this.email = !dictionaty ? null : dictionaty.email
        this.phoneNumber = !dictionaty ? null : formatPhoneNumber(dictionaty.phoneNumber)
        this.cpf = !dictionaty ? null : formatCpf(dictionaty.cpf)
        this.birthDate = !dictionaty ? null : formatDate(dictionaty.birthDate)
    }
}