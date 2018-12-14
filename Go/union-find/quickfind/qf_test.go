package quickfind

import "testing"

func TestNew(t *testing.T) {
	uf := New(10)

	if len(uf.Items) != 10 {
		t.Error("Items is not the correct size")
	}
}

func TestSingleUnionAndFind(t *testing.T) {
	uf := New(10)

	uf.Union(1, 8)
	if !uf.Find(1, 8) {
		t.Error("A single union failed")
	}
}

func TestMultipleUnionAndFind(t *testing.T) {
	uf := New(10)

	uf.Union(1, 10)
	uf.Union(1, 8)

	if !uf.Find(1, 8) {
		t.Error("One and Eight are not connected")
	}
	if !uf.Find(1, 10) {
		t.Error("One and Ten are not connected")
	}
	if !uf.Find(10, 8) {
		t.Error("Ten and Eight are not connected")
	}

}

func TestDoubleUnion(t *testing.T) {
	uf := New(10)

	uf.Union(1, 10)
	uf.Union(2, 8)
	uf.Union(1, 8)

	if !uf.Find(1, 8) {
		t.Error("One and Eight are not connected")
	}
	if !uf.Find(1, 10) {
		t.Error("One and Ten are not connected")
	}
	if !uf.Find(10, 8) {
		t.Error("Ten and Eight are not connected")
	}
	if !uf.Find(2, 8) {
		t.Error("Two and Eight are not connected")
	}

}
