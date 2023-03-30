package main

import (
	"imagine/routes"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	routes.RegisterDallERoutes(app)
	routes.RegisterPostRoutes(app)

	log.Fatal(app.Listen(":8080"))
}
