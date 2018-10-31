package main

import (
	"fmt"
	"io/ioutil"
	"log"
)

func main() {
	files, err := ioutil.ReadDir(".")

	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		if file.IsDir() {
			fmt.Println("D:", file.Name())
		} else {
			fmt.Println("F:", file.Name(), "size:", file.Size()/1000, "KB")
		}
	}
}
