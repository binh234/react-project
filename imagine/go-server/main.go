package main

import (
	"imagine/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	app := fiber.New()
	routes.RegisterDallERoutes(app)
	routes.RegisterPostRoutes(app)

	log.Fatal(app.Listen(":8080"))
}
