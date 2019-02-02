import sys

n = 875714 # number of verticies 875.714
t = 0 # Number of nodes explored at this point. (1st pass)
s = None # Current source vertex (2nd pass)

# small_graph = 6,3,2,1,1

def main():
    sys.setrecursionlimit(16900) # This may be slightly sub-optimal
    print(sys.getrecursionlimit())
    graph = dict()
    with open('./graph.txt') as file:
        lines = file.readlines()

    lines = map(lambda x: x.strip(), lines)

    for line in lines:
        line = line.split()
        line[0] = int(line[0])
        line[1] = int(line[1])
        if (line[0] not in graph):
            graph[line[0]] = Node(line[0], [line[1]],[])
        else:
            graph[line[0]].edges_out.append(line[1])
        if line[1] not in graph:
            graph[line[1]]  = Node(line[1],[],  [line[0]])
        else:
            graph[line[1]].edges_in.append(line[0])

    print("finished setting up the graph")

    dfs_loop(graph, True)

    print("finished reversed graph")

    for g in graph:
        graph[g].explored = False

    print("set graph to non explored again")

    dfs_loop(graph, False)

    print("finished second loop")

    leaderCounts = dict()
    for g in graph:
        if graph[g].leader.i not in leaderCounts:
            leaderCounts[graph[g].leader.i] = 1;
        else:
            leaderCounts[graph[g].leader.i] += 1;
    d = [(k, leaderCounts[k]) for k in sorted(leaderCounts, key=leaderCounts.get, reverse=True)]
    o = 0
    for k, v in d:
        print(v)
        o += 1
        if o >10:
            break


def dfs_loop(G, reverse):
    print("entered dfs_loop")
    global s
    for i in range(n, 0, -1):
        if (G[i].explored == False):
            print("in loop " + str(i) + " Not yet explored")
            s = i
            dfs(G, G[i], reverse)
        else:
            print("in loop " + str(i) + " Already explored")

def dfs(G, i, reverse):
    i.explored = True
    i.leader = G[s]
    if (reverse):
        for edge in i.edges_in:
            if G[edge].explored == False:
                dfs(G, G[edge], reverse)
    else:
        for edge in i.edges_out:
            if G[edge].explored == False:
                dfs(G, G[edge], reverse)

    global t
    t +=1
    G[i.i].t = t


class Node():
    def __init__(self, i, edges_out, edges_in):
        self.i = i
        self.edges_out = edges_out
        self.edges_in = edges_in
        self.explored = False
        self.leader = None
        self.t = None


if __name__ == "__main__":
    main()
