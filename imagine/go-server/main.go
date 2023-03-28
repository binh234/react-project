package main

import (
	"fmt"
	"time"

	"github.com/goombaio/namegenerator"
)

func main() {
	seed := time.Now().UTC().UnixNano()
	nameGenerator := namegenerator.NewNameGenerator(seed)

	for i := 0; i < 10; i++ {
		name := nameGenerator.Generate()

		fmt.Println(name)
	}
}
