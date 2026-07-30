import os
from PIL import Image

src = os.path.join(os.path.dirname(__file__), "favicons_temp", "web")
dst = os.path.join(os.path.dirname(__file__), "public")
target_color = (62, 39, 35)

sizes = {}
for f in os.listdir(src):
    if f.endswith(".png"):
        size = f.split("-")[-1].replace(".png", "")
        sizes[f"favicon-{size}x{size}.png"] = f

for out_name, in_name in sizes.items():
    img = Image.open(os.path.join(src, in_name)).convert("RGBA")
    pixels = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = pixels[x, y]
            if a > 0:
                pixels[x, y] = (*target_color, a)
    img.save(os.path.join(dst, out_name))
    print(f"Saved {out_name}")

print("Done")
