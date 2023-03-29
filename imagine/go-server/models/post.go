package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// bson for mongoDB unsderstand, json for JSON understand
// omitempty require not null field
type Post struct {
	ID     string             `json:"id,omitempty" bson:"_id,omitempty"`
	Name   string             `json:"name" bson:"name"`
	Prompt string             `json:"prompt" bson:"prompt"`
	Photo  string             `json:"photo" bson:"photo"`
	Date   primitive.DateTime `json:"date" bson:"date"`
	Tags   []string           `json:"tags,omitempty" bson:"tags,omitempty"`
}
