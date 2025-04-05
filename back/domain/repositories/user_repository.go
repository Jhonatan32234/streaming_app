package repositories

import "back/domain/entities"

type UserRepository interface {
    Register(user *entities.User) error
    Login(username, password string) (*entities.User, error)
}
