package routes

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"image/png"
	"imagine/utils"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/sashabaranov/go-openai"
)

type ImageRequest struct {
	Prompt string `json:"prompt,omitempty"`
	Photo  string `json:"photo"`
	User   string `json:"name,omitempty"`
}

type ImageVariantRequest struct {
	Photo string `json:"photo"`
}

type ImageResponse struct {
	Photo string
}

func RegisterDallERoutes(app *fiber.App) {
	api := app.Group("dall-e")
	api.Post("/", generateImage)
	api.Post("/variant", generateVariant)
}

func generateImage(c *fiber.Ctx) error {
	client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))
	ctx := context.Background()
	req := new(ImageRequest)
	err := c.BodyParser(req)
	if err != nil {
		return c.Status(500).SendString(err.Error())
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
		return c.Status(500).SendString(err.Error())
	}

	response := &ImageResponse{Photo: respBase64.Data[0].B64JSON}
	return c.JSON(response)
}

func generateVariant(c *fiber.Ctx) error {
	client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))
	ctx := context.Background()
	req := new(ImageVariantRequest)
	err := c.BodyParser(req)
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}

	imgBytes, err := base64.StdEncoding.DecodeString(req.Photo)
	if err != nil {
		fmt.Printf("Base64 decode error: %v\n", err)
		return c.Status(500).SendString(err.Error())
	}

	r := bytes.NewReader(imgBytes)
	imgData, err := png.Decode(r)
	if err != nil {
		fmt.Printf("PNG decode error: %v\n", err)
		return c.Status(500).SendString(err.Error())
	}

	file, err := os.CreateTemp("", "temp")
	if err != nil {
		fmt.Printf("File creation error: %v\n", err)
		return c.Status(500).SendString(err.Error())
	}
	defer file.Close()

	if err := png.Encode(file, imgData); err != nil {
		fmt.Printf("PNG encode error: %v\n", err)
		return c.Status(500).SendString(err.Error())
	}

	fmt.Println("The image was saved as example.png")

	variantRequest := openai.ImageVariRequest{
		Image: file,
		Size:  utils.IMAGE_SIZE,
		N:     1,
	}
	variantResponse, err := client.CreateVariImage(ctx, variantRequest)
	if err != nil {
		fmt.Printf("File creation error: %v\n", err)
		return c.Status(500).SendString(err.Error())
	}
	return c.JSON(ImageResponse{
		Photo: variantResponse.Data[0].B64JSON,
	})
}
