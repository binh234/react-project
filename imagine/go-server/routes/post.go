package routes

import (
	"context"
	"fmt"
	"imagine/models"
	"imagine/mongodb"
	"imagine/storage"
	"imagine/utils"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/goombaio/namegenerator"
	"github.com/imagekit-developer/imagekit-go/api/uploader"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var db = mongodb.GetMongoInstance()

type SearchRequest struct {
	Date   time.Time `json:"cursor"`
	Limit  int       `json:"limit"`
	Prompt string    `json:"prompt"`
	Name   string    `json:"name"`
	Tags   []string  `json:"tags"`
}

func NewSearchRequest() *SearchRequest {
	return &SearchRequest{
		Date: time.Now(),
	}
}

func RegisterPostRoutes(app *fiber.App) {
	api := app.Group("api/v1/post")
	api.Get("/", getPost)
	api.Post("/", createPost)
}

func getPost(c *fiber.Ctx) error {
	collection := db.DB.Collection("posts")
	req := NewSearchRequest()
	if err := c.QueryParser(req); err != nil {
		return c.Status(500).JSON(err)
	}
	req.Limit = utils.ValidateNumber(req.Limit, 1, utils.PAGE_LIMIT)

	sortOptions := bson.D{{Key: "date", Value: -1}}
	filter := bson.D{{Key: "date", Value: bson.D{{Key: "$lt", Value: req.Date}}}}
	if req.Prompt != "" {
		filter = append(filter, bson.E{Key: "$text", Value: bson.M{"$search": fmt.Sprintf("\"%s\"", req.Prompt)}})
		// ToDo: Optimize text search, steps to cover
		// Step 1: Split data to chunks based on date
		// Step 2: Perform text search on each chunk
		// Step 3 (optional): Estimated count results with full text search on first query
		// Step 4: Return search results with cursor point to last chunk (maybe on last date proccessed)
		// sortOptions = bson.D{{Key: "score", Value: bson.D{{Key: "$meta", Value: "textScore"}}}, {Key: "date", Value: -1}}
	}
	if req.Name != "" {
		filter = append(filter, bson.E{Key: "name", Value: bson.M{"$regex": req.Name, "$options": "i"}})
	}
	if len(req.Tags) > 0 {
		filter = append(filter, bson.E{Key: "tags", Value: bson.M{"$in": req.Tags}})
	}
	opts := options.Find().SetSort(sortOptions).SetLimit(int64(req.Limit))
	cursor, err := collection.Find(context.TODO(), filter, opts)
	if err != nil {
		return c.Status(500).JSON(err)
	}
	posts := []models.Post{}
	if err = cursor.All(context.TODO(), &posts); err != nil {
		return c.Status(500).JSON(err)
	}
	return c.JSON(posts)
}

func createPost(c *fiber.Ctx) error {
	ik := storage.GetImageKitInstance()
	collection := db.DB.Collection("posts")
	post := models.NewPost()

	if err := c.BodyParser(post); err != nil {
		log.Printf("Error while uploading image: %s", err.Error())
		return c.Status(500).JSON(err)
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
		return c.Status(500).JSON(err)
	}

	// Insert document to mongoDB
	post.Photo = resp.Data.FilePath
	post.ID = ""
	insertionResult, err := collection.InsertOne(c.Context(), post)
	if err != nil {
		return c.Status(500).JSON(err)
	}

	post.ID = insertionResult.InsertedID.(primitive.ObjectID).Hex()
	return c.JSON(post)
}
