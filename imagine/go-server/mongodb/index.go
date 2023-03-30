package mongodb

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func (mg *MongoInstance) CreateIndex(collectionName string, field string, option int) error {
	coll := mg.DB.Collection(collectionName)
	model := mongo.IndexModel{Keys: bson.D{{Key: field, Value: option}}}
	name, err := coll.Indexes().CreateOne(context.TODO(), model)
	fmt.Println("Name of index created: " + name)
	return err
}

func (mg *MongoInstance) CreateTextIndex(collectionName string, field string) error {
	coll := mg.DB.Collection(collectionName)
	model := mongo.IndexModel{Keys: bson.D{{Key: field, Value: "text"}}}
	name, err := coll.Indexes().CreateOne(context.TODO(), model)
	fmt.Println("Name of index created: " + name)
	return err
}

func (mg *MongoInstance) RemoveIndex(collectionName string, indexName string) error {
	coll := mg.DB.Collection(collectionName)
	_, err := coll.Indexes().DropOne(context.TODO(), indexName)
	return err
}
