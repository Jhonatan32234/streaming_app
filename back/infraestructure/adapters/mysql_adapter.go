package adapters

import (
    "back/domain/entities"
    "log"

    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

func InitDB() *gorm.DB {
    dsn := "root:root@tcp(db:3306)/video"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("❌ No se pudo conectar a la base de datos:", err)
    }

    // Migración de modelos (Video y Usuario)
    err = db.AutoMigrate(&entities.Video{}, &entities.User{})
    if err != nil {
        log.Fatal("❌ Error al migrar modelos:", err)
    }

    log.Println("✅ Conexión a la base de datos establecida y migración completada")
    return db
}
