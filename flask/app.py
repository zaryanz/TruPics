import requests, json, time
from htmldate import find_date

# def main_fn(url):
# # url = "http://localhost:5000/search"
#     data = {
#         "image_url":url,
#         "resized_images":"false",
#         "cloud_api":"true"
#     }
#     print(data)

#     headers = {'Content-type': 'application/json'}
#     r = requests.post(url, headers=headers, data=json.dumps(data))

#     json_data = r.json()
#     links_list = json_data['links']
#     # print(links_list[0])

#     arr = []
#     # time.sleep(5)
#     for i in range(len(links_list)):
#         arr.append(find_date(links_list[i]))
    
#     print(json.dumps(arr))

#     return json.dumps({"chintu":arr})

# answer = main_fn('http://placehold.it/350x150.png')
# print(answer)

def main_func(url):
    data = {
        "image_url": url,
        "resized_images":"false",
        "cloud_api":"true"
    }

    headers = {'Content-type': 'application/json'}
    r = requests.post("http://localhost:5000/search", headers=headers, data=json.dumps(data))

    rec_data = r.json()
    rec_links = rec_data['links']
    arr = []
    for i in range(len(rec_links)):
        arr.append(find_date(rec_links[i]))
    return json.dumps({"sup":arr})

result = main_func("https://yt3.ggpht.com/-zL2hGAaDwmU/AAAAAAAAAAI/AAAAAAAAAAA/q635-BPG5Zg/s900-c-k-no-mo-rj-c0xffffff/photo.jpg")
print(result)