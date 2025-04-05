package repositories

import (
	"back/domain/entities"
	"gorm.io/gorm"
)

type VideoRepositoryImpl struct {
	db *gorm.DB
}

func NewVideoRepository(db *gorm.DB) VideoRepository {
	return &VideoRepositoryImpl{db: db}
}

func (repo *VideoRepositoryImpl) GetAllVideos() ([]entities.Video, error) {
    var videos []entities.Video
    // Modificar la consulta para que solo seleccione id y title
    err := repo.db.Select("id, title").Find(&videos).Error
    return videos, err
}


func (repo *VideoRepositoryImpl) GetVideoByID(id uint) (*entities.Video, error) {
	var video entities.Video
	err := repo.db.First(&video, id).Error
	return &video, err
}
