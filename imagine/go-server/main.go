package main

import (
	"imagine/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	// Default config for CORS
	app.Use(cors.New())

	// Or extend your config for customization
	// app.Use(cors.New(cors.Config{
	// 	AllowOrigins: "https://gofiber.io, https://gofiber.net",
	// 	AllowHeaders: "Origin, Content-Type, Accept",
	// }))
	routes.RegisterDallERoutes(app)
	routes.RegisterPostRoutes(app)

	log.Fatal(app.Listen(":8080"))
}
