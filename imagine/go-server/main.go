package main

import (
	"imagine/mongodb"
	"imagine/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	// Default config for CORS
	app.Use(cors.New())
	routes.RegisterDallERoutes(app)
	routes.RegisterPostRoutes(app)

	log.Fatal(app.Listen(":8080"))
	defer mongodb.GetMongoInstance().Disconnect()
}
