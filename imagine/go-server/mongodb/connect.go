package mongodb

import (
	"context"
	"fmt"
	"log"
	"os"
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

var dbName string
var mongoURI string
var serverAPIOptions = options.ServerAPI(options.ServerAPIVersion1)

func connect() {
	mongoURI = os.Getenv("MONGODB_URL")
	dbName = os.Getenv("DB_NAME")
	clientOptions := options.Client().ApplyURI(mongoURI).SetServerAPIOptions(serverAPIOptions)
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		fmt.Println(err.Error())
		log.Fatal(err)
	}

	db := client.Database(dbName)
	mg = &MongoInstance{
		Client: client,
		DB:     db,
	}
}

func GetMongoInstance() *MongoInstance {
	once.Do(connect)
	return mg
}

func Disconnect() {
	if mg.Client != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()
		if err := mg.Client.Disconnect(ctx); err != nil {
			log.Fatal(err)
		}
	}
}
