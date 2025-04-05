package controllers

import (
	"back/application/usecase"
	"log"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
)

type VideoController struct {
	useCase *usecase.VideoUseCase
}

func NewVideoController(uc *usecase.VideoUseCase) *VideoController {
	return &VideoController{useCase: uc}
}

// Obtener todos los videos sin los datos binarios
func (vc *VideoController) GetAllVideos(c *gin.Context) {
	videos, err := vc.useCase.GetAllVideos()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener los videos"})
		return
	}
	log.Print(videos)

	// Convertir los videos en un formato adecuado para la respuesta (sin los datos del video)
	response := make([]gin.H, len(videos))
	for i, video := range videos {
		response[i] = gin.H{
			"id":    video.ID,
			"title": video.Title,
		}
	}

	c.JSON(http.StatusOK, response)
}

// Obtener un video específico, incluyendo sus datos binarios
func (vc *VideoController) GetVideoByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	video, err := vc.useCase.GetVideoByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Video no encontrado"})
		return
	}

	// Retornar el video como un archivo binario (tipo "video/mp4")
	c.Data(http.StatusOK, "video/mp4", video.VideoData)
}
