package storage

import (
	"os"
	"sync"

	"github.com/imagekit-developer/imagekit-go"
)

var ik *imagekit.ImageKit
var once sync.Once

func connect() {
	ik = imagekit.NewFromParams(imagekit.NewParams{
		PrivateKey:  os.Getenv("IMAGEKIT_API_KEY"),
		PublicKey:   os.Getenv("IMAGEKIT_PRIVATE_KEY"),
		UrlEndpoint: os.Getenv("IMAGEKIT_END_POINT"),
	})
}

func GetImageKitInstance() *imagekit.ImageKit {
	once.Do(connect)
	return ik
}
