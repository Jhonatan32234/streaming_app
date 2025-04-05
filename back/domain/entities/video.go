package entities

type Video struct {
    ID        uint   `gorm:"primaryKey"`
    Title     string `gorm:"not null"`
    VideoData []byte `gorm:"type:longblob;not null"`
}
