import copy
import random
from random import randint

current_smallest = None
def main():
    print("Starting reading file")
    f = read_file()
    print("Read file")
    data = create_graph(f)
    print("created graph")
    edge_list = data[0]
    node_list = data[1]
    for i in range(1,1000):
        print (i, ' Start')
        karger(copy.deepcopy(edge_list), copy.deepcopy(node_list))
        print(i ,' Done')
    print(current_smallest)

def read_file():
    #loading data from the text file#
    with open('min_cuts_official.txt') as req_file:
        mincut_data = []
        for line in req_file:
            line = line.strip().split("\t")
            if line:
                line = [int(i) for i in line]
                mincut_data.append(line)

    return mincut_data

def create_graph(mincut_data):
    #extracting edges from the data #
    edgelist = []
    nodelist = []
    for every_list in mincut_data:
        nodelist.append(every_list[0])
        temp_list = []
        for temp in range(1,len(every_list)):
            temp_list = [every_list[0], every_list[temp]]
            flag = 0
            for ad in edgelist:
                if set(ad) == set(temp_list):
                    flag = 1
            if flag == 0 :
                edgelist.append([every_list[0],every_list[temp]])
    return [edgelist, nodelist]

def karger(edgelist, nodelist):
    #karger min cut algorithm#
    while(len(nodelist) > 2):

        val = randint(0,(len(edgelist)-1))

        target_edge = edgelist[val]
        replace_with = target_edge[0]
        should_replace = target_edge[1]
        for edge in edgelist:
            if edge[0] == should_replace:
                edge[0] = replace_with
            if edge[1]  == should_replace:
                edge[1] = replace_with
        edgelist.remove(target_edge)
        nodelist.remove(should_replace)
        for edge in reversed(edgelist):
            if edge[0] == edge[1]:
                edgelist.remove(edge)


    for edge in reversed(edgelist):
        if edge[0] == edge[1]:
            edgelist.remove(edge)

    global current_smallest
    if (current_smallest == None or current_smallest >= len(edgelist)):
        current_smallest = len(edgelist)
    print('Smallest: ', current_smallest)
    print('This round: ', len(edgelist))





if __name__ == "__main__":
    main()
