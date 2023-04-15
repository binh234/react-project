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

type Config struct {
	OpenAI *OpenAIConfig
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
		OpenAI: &OpenAIConfig{
			ApiKey: os.Getenv("OPENAI_API_KEY"),
		},
	}
}

func GetConfig() *Config {
	once.Do(initConfig)
	return config
}
