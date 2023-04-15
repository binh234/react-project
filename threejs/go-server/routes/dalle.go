package routes

import (
	"context"
	"fmt"
	"go-three/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/sashabaranov/go-openai"
)

var config = utils.GetConfig()
var client = openai.NewClient(config.OpenAI.ApiKey)

type ImageRequest struct {
	Prompt string `json:"prompt,omitempty"`
	Photo  string `json:"photo"`
	User   string `json:"name,omitempty"`
}

type ImageVariantRequest struct {
	Photo string `json:"photo"`
}

type ImageResponse struct {
	Photo string `json:"photo"`
}

func RegisterDallERoutes(app *fiber.App) {
	api := app.Group("api/v1/dalle")
	api.Post("/", generateImage)
}

func generateImage(c *fiber.Ctx) error {
	ctx := context.Background()
	req := new(ImageRequest)
	err := c.BodyParser(req)
	if err != nil {
		return c.Status(500).JSON(err)
	}

	// Example image as base64
	reqBase64 := openai.ImageRequest{
		Prompt:         req.Prompt,
		Size:           utils.IMAGE_SIZE,
		ResponseFormat: openai.CreateImageResponseFormatB64JSON,
		N:              1,
	}

	respBase64, err := client.CreateImage(ctx, reqBase64)
	if err != nil {
		fmt.Printf("Image creation error: %v\n", err)
		return c.Status(500).JSON(err)
	}

	response := &ImageResponse{Photo: respBase64.Data[0].B64JSON}
	return c.JSON(response)
}
