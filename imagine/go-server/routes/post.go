package routes

import (
	"context"
	"imagine/models"
	"imagine/mongodb"
	"imagine/storage"
	"imagine/utils"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/goombaio/namegenerator"
	"github.com/imagekit-developer/imagekit-go/api/uploader"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var db = mongodb.GetMongoInstance()

func RegisterPostRoutes(app *fiber.App) {
	api := app.Group("post")
	api.Get("/", getPost)
	api.Post("/", createPost)
}

func getPost(c *fiber.Ctx) error {
	return nil
}

func createPost(c *fiber.Ctx) error {
	ik := storage.GetImageKitInstance()
	collection := db.DB.Collection("post")
	post := new(models.Post)

	if err := c.BodyParser(post); err != nil {
		return c.Status(500).SendString(err.Error())
	}

	// Upload photo to imagekit
	seed := time.Now().UTC().UnixNano()
	nameGenerator := namegenerator.NewNameGenerator(seed)
	name := nameGenerator.Generate()
	resp, err := ik.Uploader.Upload(context.TODO(), "data:image/jpeg;base64,"+post.Photo, uploader.UploadParam{
		FileName:          name + ".png",
		UseUniqueFileName: utils.BoolPointer(true),
	})
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}

	// Insert document to mongoDB
	post.Photo = resp.Data.FilePath
	post.ID = ""
	insertionResult, err := collection.InsertOne(c.Context(), post)
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}

	post.ID = insertionResult.InsertedID.(primitive.ObjectID).Hex()
	return c.JSON(post)
}
