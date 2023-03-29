package mongodb

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateIndex(collectionName string, field string, option int) error {
	db := GetMongoInstance()
	coll := db.DB.Collection(collectionName)
	model := mongo.IndexModel{Keys: bson.D{{Key: field, Value: option}}}
	name, err := coll.Indexes().CreateOne(context.TODO(), model)
	fmt.Println("Name of index created: " + name)
	return err
}

func CreateTextIndex(collectionName string, field string) error {
	db := GetMongoInstance()
	coll := db.DB.Collection(collectionName)
	model := mongo.IndexModel{Keys: bson.D{{Key: field, Value: "text"}}}
	name, err := coll.Indexes().CreateOne(context.TODO(), model)
	fmt.Println("Name of index created: " + name)
	return err
}

func RemoveIndex(collectionName string, indexName string) error {
	db := GetMongoInstance()
	coll := db.DB.Collection(collectionName)
	_, err := coll.Indexes().DropOne(context.TODO(), indexName)
	return err
}
