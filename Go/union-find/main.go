package main

import "me/union-find/quickfind"

type UF interface {
	Union(a, b int)
	Find(a, b int) bool
}

func main() {
	qf := quickfind.New(10)
	qf.Union(1, 2)
}
