package mongodb

import (
	"context"
	"imagine/utils"
	"log"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoInstance struct {
	Client *mongo.Client
	DB     *mongo.Database
}

var mg *MongoInstance
var once sync.Once

var serverAPIOptions = options.ServerAPI(options.ServerAPIVersion1)

func connect() {
	config := utils.GetConfig()
	clientOptions := options.Client().ApplyURI(config.DB.URI).SetServerAPIOptions(serverAPIOptions)
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database(config.DB.DBName)
	mg = &MongoInstance{
		Client: client,
		DB:     db,
	}
	// Create index for date field for filtering and sorting
	err = mg.CreateIndex("posts", "date", -1)
	if err != nil {
		log.Fatal(err)
	}

	// Create text index on prompt field for full text search
	err = mg.CreateTextIndex("posts", "prompt")
	if err != nil {
		log.Fatal(err)
	}
}

func GetMongoInstance() *MongoInstance {
	once.Do(connect)
	return mg
}

func (mg *MongoInstance) Disconnect() {
	if mg.Client != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()
		if err := mg.Client.Disconnect(ctx); err != nil {
			log.Fatal(err)
		}
	}
}
