package storage

import (
	"imagine/utils"
	"sync"

	"github.com/imagekit-developer/imagekit-go"
)

var ik *imagekit.ImageKit
var once sync.Once

func connect() {
	config := utils.GetConfig()
	ik = imagekit.NewFromParams(imagekit.NewParams{
		PrivateKey:  config.ImageKit.ApiKey,
		PublicKey:   config.ImageKit.PrivateKey,
		UrlEndpoint: config.ImageKit.Endpoint,
	})
}

func GetImageKitInstance() *imagekit.ImageKit {
	once.Do(connect)
	return ik
}
