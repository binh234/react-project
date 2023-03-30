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
	api := app.Group("api/v1/dall-e")
	api.Post("/", generateImage)
	api.Post("/variant", generateVariant)
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

// Bug: Unable to upload PNG file
// Bug: Current supported openai.ImageVariRequest doesn't have ResponseFormat field,
// which lead to return image URL in response, not base64 string
func generateVariant(c *fiber.Ctx) error {
	ctx := context.Background()
	req := new(ImageVariantRequest)
	err := c.BodyParser(req)
	if err != nil {
		return c.Status(500).JSON(err)
	}

	imgBytes, err := base64.StdEncoding.DecodeString(req.Photo)
	if err != nil {
		fmt.Printf("Base64 decode error: %v\n", err)
		return c.Status(500).JSON(err)
	}

	r := bytes.NewReader(imgBytes)
	imgData, err := png.Decode(r)
	if err != nil {
		fmt.Printf("PNG decode error: %v\n", err)
		return c.Status(500).JSON(err)
	}

	file, err := os.CreateTemp("", "temp-*.png")
	if err != nil {
		fmt.Printf("File creation error: %v\n", err)
		return c.Status(500).JSON(err)
	}
	defer file.Close()
	defer os.Remove(file.Name())

	if err := png.Encode(file, imgData); err != nil {
		fmt.Printf("PNG encode error: %v\n", err)
		return c.Status(500).JSON(err)
	}

	fmt.Printf("The image was saved as %s\n", file.Name())

	variantRequest := openai.ImageVariRequest{
		Image: file,
		Size:  utils.IMAGE_SIZE,
		N:     1,
	}
	variantResponse, err := client.CreateVariImage(ctx, variantRequest)
	if err != nil {
		fmt.Printf("File creation error: %v\n", err)
		return c.Status(500).JSON(err)
	}
	return c.JSON(ImageResponse{
		Photo: variantResponse.Data[0].B64JSON,
	})
}
