package usecase

import (
    "back/domain/entities"
    "back/domain/repositories"
)

type UserUseCase struct {
    repository repositories.UserRepository
}

func NewUserUseCase(repo repositories.UserRepository) *UserUseCase {
    return &UserUseCase{repository: repo}
}

func (uc *UserUseCase) RegisterUser(username, password string) error {
    user := &entities.User{
        Username: username,
        Password: password,
    }
    return uc.repository.Register(user)
}

func (uc *UserUseCase) LoginUser(username, password string) (*entities.User, error) {
    return uc.repository.Login(username, password)
}
