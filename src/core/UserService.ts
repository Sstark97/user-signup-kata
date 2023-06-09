import { UserRepository } from "@core/UserRepository";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    saveUserInRepository(email: string) {
        const isEmailNotEmpty = email !== ""
        this.checkCorrectFormOf(email)
        this.checkUserExistInRepositoryBy(email)

        if (isEmailNotEmpty) {
            this.userRepository.save(email)
        }
    }

    private checkUserExistInRepositoryBy(email: string) {
        const users = this.userRepository.getUsers()

        if (users.includes(email)) {
            throw new Error(`${email} already exits`)
        }
    }

    private checkCorrectFormOf(email: string) {
        const emailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        const notHaveEmailFormat = email && !email.match(emailFormat)

        if (notHaveEmailFormat) {
            throw new Error(`${email} not have the email format`)
        }
    }

    getUsersFromRepository() {
        return this.userRepository.getUsers()
    }

    getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email)
    }
}