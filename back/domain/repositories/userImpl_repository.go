package repositories

import (
    "back/domain/entities"
    "gorm.io/gorm"
)

type UserRepositoryImpl struct {
    db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
    return &UserRepositoryImpl{db: db}
}

func (repo *UserRepositoryImpl) Register(user *entities.User) error {
    return repo.db.Create(user).Error
}

func (repo *UserRepositoryImpl) Login(username, password string) (*entities.User, error) {
    var user entities.User
    err := repo.db.Where("username = ? AND password = ?", username, password).First(&user).Error
    return &user, err
}
