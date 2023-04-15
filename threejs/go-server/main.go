package main

import (
	"go-three/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	// Default config for CORS
	app.Use(cors.New())
	routes.RegisterDallERoutes(app)

	log.Fatal(app.Listen(":8080"))
}
