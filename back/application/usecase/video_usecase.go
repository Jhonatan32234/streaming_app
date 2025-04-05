package usecase

import (
	"back/domain/entities"
	"back/domain/repositories"
)

type VideoUseCase struct {
	repository repositories.VideoRepository
}

func NewVideoUseCase(repo repositories.VideoRepository) *VideoUseCase {
	return &VideoUseCase{repository: repo}
}

func (uc *VideoUseCase) GetAllVideos() ([]entities.Video, error) {
	return uc.repository.GetAllVideos()
}

func (uc *VideoUseCase) GetVideoByID(id uint) (*entities.Video, error) {
	return uc.repository.GetVideoByID(id)
}
