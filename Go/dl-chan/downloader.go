package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"runtime"
	"strconv"
)

type Thread struct {
	No int
}

type Page struct {
	Page    int
	Threads []Thread
}

// 4chan JSON structure is somewhat 'special'
type Posts struct {
	Posts []Post
}

/*
 * The only types we care about, together they create the filename that we need
 * The resulting url would  be Images: https://i.4cdn.org/<board>/<tim><ext>
 * Note that the . is already part of the Ext, so don't add that again
 */
type Post struct {
	Tim int
	Ext string
}

func (p Post) getFileName() string {
	if p.Tim == 0 || p.Ext == "" {
		return ""
	}
	return strconv.Itoa(p.Tim) + p.Ext
}

const board = "g"

var saveLocation = userHomeDir() + "/output/chan/" + board

func main() {
	posts := getPosts()
	createDirIfNotExist(saveLocation)

	for _, post := range posts {
		DownloadFile(board, post.getFileName())
	}

}

func getPosts() []Post {
	threads := getThreads(board)
	var posts []Post
	for _, thread := range threads {
		posts = append(posts, getThreadContent(board, thread)...)
	}
	return posts
}
func getThreads(board string) []Thread {
	url := "https://a.4cdn.org/" + board + "/threads.json"
	threadList := []byte(readURLl(url))

	var keys []Page
	json.Unmarshal(threadList, &keys)

	var threads []Thread
	for _, page := range keys {
		threads = append(threads, page.Threads...)
	}
	return threads
}

func getThreadContent(board string, t Thread) []Post {
	url := "https://a.4cdn.org/" + board + "/thread/" + strconv.Itoa(t.No) + ".json"
	body := []byte(readURLl(url))

	var key Posts
	json.Unmarshal(body, &key)

	return key.Posts
}

func createDirIfNotExist(direcotry string) {
	if _, err := os.Stat(direcotry); !os.IsExist(err) {
		os.MkdirAll(direcotry, 0777)
	}
}

func readURLl(url string) string {
	fmt.Println("Accessing the url", url)
	resp, _ := http.Get(url)
	bytes, _ := ioutil.ReadAll(resp.Body)
	stringBody := string(bytes)
	defer resp.Body.Close()
	return stringBody
}

func userHomeDir() string {
	if runtime.GOOS == "windows" {
		home := os.Getenv("HOMEDRIVE") + os.Getenv("HOMEPATH")
		if home == "" {
			home = os.Getenv("USERPROFILE")
		}
		return home
	} else if runtime.GOOS == "linux" {
		home := os.Getenv("XDG_CONFIG_HOME")
		if home != "" {
			return home
		}
	}
	return os.Getenv("HOME")
}

// DownloadFile will download a url to a local file. It's efficient because it will
// write as it downloads and not load the whole file into memory.
func DownloadFile(board, filepath string) {
	if filepath == "" {
		fmt.Println("Found a post with no file, skipping")
		return
	}

	url := "https://i.4cdn.org/" + board + "/" + filepath
	fmt.Println("Downloading from " + url)
	filepath = saveLocation + "/" + filepath
	fmt.Println("Saving file to " + filepath)

	// If the file already exists, then we don't need to download it
	if _, err := os.Stat(filepath); !os.IsNotExist(err) {
		fmt.Println("File already Exists, not downloading")
		return
	}

	// Create the file
	out, err := os.Create(filepath)
	if err != nil {
		fmt.Println("Unable to create the file")
		return
	}
	defer out.Close()

	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Unable to download the file")
		return
	}
	defer resp.Body.Close()

	// Write the body to file
	_, err = io.Copy(out, resp.Body)
	if err != nil {
		fmt.Println("Unable to write to the file")
		return
	}
	fmt.Println("Successfully downloaded file")
}
