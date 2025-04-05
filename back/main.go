package main

import (
	"back/application/usecase"
	"back/domain/repositories"
	"back/infraestructure/adapters"
	"back/infraestructure/controllers"
	"back/infraestructure/routes"
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	// Inicializar la base de datos
	db := adapters.InitDB()

	// Video Use Case y Controlador
	videoRepo := repositories.NewVideoRepository(db)
	videoUseCase := usecase.NewVideoUseCase(videoRepo)
	videoController := controllers.NewVideoController(videoUseCase)

	// User Use Case y Controlador
	userRepo := repositories.NewUserRepository(db)
	userUseCase := usecase.NewUserUseCase(userRepo)
	userController := controllers.NewUserController(userUseCase)

	// Configuración de enrutador
	r := gin.Default()

	// Registrar las rutas de video y usuario
	r = routes.SetupRouter(r, videoController)      // Rutas de video
	r = routes.SetupUserRoutes(r, userController)   // Rutas de usuario

	// Imprimir log de las rutas registradas
	fmt.Println("Rutas registradas: /videos, /video/:id, /user/register, /user/login")

	// Iniciar el servidor
	r.Run(":8080")
}
