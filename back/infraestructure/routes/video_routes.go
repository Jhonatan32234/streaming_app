package routes

import (
	"back/infraestructure/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine, vc *controllers.VideoController) *gin.Engine {
	// Configuración de CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Rutas de video
	r.GET("/videos", vc.GetAllVideos)  // Lista de videos sin datos binarios
	r.GET("/video/:id", vc.GetVideoByID)  // Detalle del video con datos binarios

	return r
}
