package quickfind

//UnionFind is the object we use to hold our data
type UnionFind struct {
	Items map[int]int
}

func New(N int) UnionFind {
	var itemMap = make(map[int]int)

	for i := 1; i <= N; i++ {
		itemMap[i] = i
	}
	return UnionFind{Items: itemMap}
}

//Union will eagerly unite a and b,
func (u *UnionFind) Union(a, b int) {
	bValue := u.Items[b]
	aKey := a
	for key, val := range u.Items {
		if val == bValue {
			u.Items[key] = aKey
		}
	}
}

//Find will check wheter a and b are connected
func (u UnionFind) Find(a, b int) bool {
	return u.Items[a] == u.Items[b]
}
