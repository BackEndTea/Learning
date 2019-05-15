# importing the requests library
import requests

# defining the api-endpoint
ENDPOINT = "http://example.com/end-point"


# data to be sent to api
data = {'stns':"235",
        'vars': 'WIND,TEMP'}

# sending post request and saving response as response object
r = requests.post(url = ENDPOINT, data = data)


# extracting response text
print(r.text)
