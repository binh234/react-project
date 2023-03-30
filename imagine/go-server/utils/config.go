package utils

import (
	"log"
	"os"
	"sync"

	"github.com/joho/godotenv"
	"github.com/sashabaranov/go-openai"
)

const IMAGE_SIZE = openai.CreateImageSize512x512
const PAGE_LIMIT = 48

type DBConfig struct {
	URI    string
	DBName string
}

type OpenAIConfig struct {
	ApiKey string
}

type ImageKitConfig struct {
	ApiKey     string
	PrivateKey string
	Endpoint   string
}

type Config struct {
	DB       *DBConfig
	OpenAI   *OpenAIConfig
	ImageKit *ImageKitConfig
}

var config *Config
var once sync.Once

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	log.Println("Loading .env successully")
}

func initConfig() {
	loadEnv()
	config = &Config{
		DB: &DBConfig{
			URI:    os.Getenv("MONGODB_URL"),
			DBName: os.Getenv("DB_NAME"),
		},
		OpenAI: &OpenAIConfig{
			ApiKey: os.Getenv("OPENAI_API_KEY"),
		},
		ImageKit: &ImageKitConfig{
			ApiKey:     os.Getenv("IMAGEKIT_API_KEY"),
			PrivateKey: os.Getenv("IMAGEKIT_PRIVATE_KEY"),
			Endpoint:   os.Getenv("IMAGEKIT_END_POINT"),
		},
	}
}

func GetConfig() *Config {
	once.Do(initConfig)
	return config
}
