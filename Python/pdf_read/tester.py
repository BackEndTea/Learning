try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract

def main():
    read_file()

def read_file():
    #get data
    img = Image.open('foo_pages/page-0.png')
    text = pytesseract.image_to_string(img)
    boxes = pytesseract.image_to_boxes(img)

    f = File(text, boxes)
    draw_box(img, f)
    remove_text(img, f,[5,9])

def remove_text(image, file, chars):
    """
    Removes text in given image. chars is a tuple (or array)  containing the characters indexes(inclusive and 0 indexed) of the
    text in between which the text has to be redacted.
    e.g.:
    "Sphinx of black quartz, judge my vow"
    (10,14) will redact 'black' from the text
    """
    # Boxes aren't calculated for spaces etc, so we need to know the index witout whitespacing.
    # TODO: dealing with new lines, tabs etc.
    real_start_index = chars[0] - file.text[:chars[0]].count(' ')
    real_end_index = chars[1] - file.text[:chars[1]].count(' ')

    w, h = image.size

    # Get X range of text to black out
    x_start = int(file.boxes[real_start_index][1])
    x_end = int(file.boxes[real_end_index][3])

    y_start, y_end = 0, 0
    # We want 1 y range, so we normalize it among all the characters
    #TODO: Deal with multiple lines
    #TODO: probably switch to opencv2
    for i in range(real_start_index, real_end_index +1):
        c_y = int(file.boxes[i][2])
        if c_y < y_start or y_start == 0:
            y_start = c_y

        c_y = int(file.boxes[i][4])
        if c_y > y_end or y_end == 0:
            y_end = c_y

    # (0,0) point is different for image API and tesseract API
    # Thanks obama
    y_start = h - y_start
    y_end = h - y_end

    data = image.load()
    for x in range(x_start, x_end +10):
        for y in range(y_start, y_end -5, -1):
            data[x,y] = (0,0,0)

    image.save('output.png', 'PNG')


def draw_box(image, file):
    """
    Usefull for debugging, draws lime green rectangles around all recognized characters

    @param image PIL.Image.Image
    @param file File
    """
    boxes = file.boxes
    w, h = image.size
    data = image.load()

    # Lime colors
    for b in boxes:
        for x in range(int(b[1]), int(b[3]) +1):
            try:
                data[x, h - int(b[2])] = (0,255,0)
                data[x, h - int(b[4])] = (0,255,0)
            except IndexError:
                pass
        for y in range(int(b[2]), int(b[4]) +1):
            try:
                data[int(b[1]), h- y] = (0,255,0)
                data[int(b[3]), h - y] = (0,255,0)
            except IndexError:
                pass

    image.show()


class File:
    def __init__(self, text, boxes):
        self.text = text
        self.boxes = File._parse_boxes(boxes)

    @staticmethod
    def _parse_boxes(boxes):
        return list(map(lambda x : x.split(), boxes.splitlines()))


if __name__ == "__main__":
    main()
