package repositories

import "back/domain/entities"

type VideoRepository interface {
    GetAllVideos() ([]entities.Video, error)
    GetVideoByID(id uint) (*entities.Video, error)
}
