try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract

def main():
    read_file()

def read_file():
    img = Image.open('Son2B_pages/page-0.png')
    text = pytesseract.image_to_string(img)
    boxes = pytesseract.image_to_boxes(img)

    f = File(text, boxes)
    remove_text(img, f,[5,9])

def remove_text(image, file, chars):
    real_start_index = chars[0] - file.text[:chars[0]].count(' ')
    real_end_index = chars[1] - file.text[:chars[1]].count(' ')

    w, h = image.size

    x_start = int(file.boxes[real_start_index][1])
    x_end = int(file.boxes[real_end_index][1])

    y_start, y_end = 0, 0
    for i in range(real_start_index, real_end_index +1):
        c_y = int(file.boxes[i][2])
        if c_y < y_start or y_start == 0:
            y_start = c_y

        c_y = int(file.boxes[i][4])
        if c_y > y_end or y_end == 0:
            y_end = c_y

    y_start = h - y_start
    y_end = h - y_end


    data = image.load()
    for x in range(x_start, x_end +10):
        for y in range(y_start, y_end -5, -1):
            data[x,y] = (0,0,0)

    image.show()
    image.save('output.png', 'PNG')


class File:
    def __init__(self, text, boxes):
        self.text = text
        self._no_space_text = text.replace(" ","")
        self.boxes = File._parse_boxes(boxes)

    @staticmethod
    def _parse_boxes(boxes):
        return list(map(lambda x : x.split(), boxes.splitlines()))



if __name__ == "__main__":
    main()
