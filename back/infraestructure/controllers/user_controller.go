package controllers

import (
    "back/application/usecase"
    "net/http"

    "github.com/gin-gonic/gin"
)

type UserController struct {
    useCase *usecase.UserUseCase
}

func NewUserController(uc *usecase.UserUseCase) *UserController {
    return &UserController{useCase: uc}
}

func (ctrl *UserController) Register(c *gin.Context) {
    var user struct {
        Username string `json:"username"`
        Password string `json:"password"`
    }

    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
        return
    }

    if err := ctrl.useCase.RegisterUser(user.Username, user.Password); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo registrar el usuario"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Usuario registrado con éxito"})
}

func (ctrl *UserController) Login(c *gin.Context) {
    var user struct {
        Username string `json:"username"`
        Password string `json:"password"`
    }

    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
        return
    }

    authenticatedUser, err := ctrl.useCase.LoginUser(user.Username, user.Password)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciales inválidas"})
        return
    }

    // Generar un token ficticio para la respuesta (deberías usar JWT)
    token := "tokenquenodeberiadeestaraquiperoquehuevaasiquehardcodeadopapa"
    c.JSON(http.StatusOK, gin.H{
        "message": "Inicio de sesión exitoso",
        "token":   token,
        "user":    authenticatedUser,
    })
}
