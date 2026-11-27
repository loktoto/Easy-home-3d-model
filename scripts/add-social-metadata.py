#!/usr/bin/env python3
"""Add consistent social sharing metadata to the public build, never source or private plans."""
from pathlib import Path
from html.parser import HTMLParser
from html import escape
import struct
import sys

origin = "https://easy3dhome.pages.dev"
image = origin + "/welcome/social-card.png"
root = Path(sys.argv[1])
raw = (root / "welcome/social-card.png").read_bytes()
assert raw[:8] == b"\x89PNG\r\n\x1a\n" and struct.unpack(">II", raw[16:24]) == (1200, 630)
locales = {"": "en", "zh-hant/": "zh-Hant", "zh-hans/": "zh-Hans", "es/": "es", "ja/": "ja", "de/": "de", "fr/": "fr", "ko/": "ko", "pt/": "pt"}
class Metadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}
        self.canonical = []
        self.alternates = set()
        self.lang = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if tag == "meta":
            key = a.get("property") or a.get("name")
            if key:
                if key in self.meta and (key.startswith("og:") or key.startswith("twitter:")):
                    raise ValueError("Duplicate social metadata: " + key)
                self.meta[key] = a.get("content", "")
        if tag == "link" and a.get("rel") == "canonical":
            self.canonical.append(a.get("href"))
        if tag == "link" and a.get("rel") == "alternate" and a.get("hreflang"):
            self.alternates.add((a["hreflang"], a.get("href")))
for path, lang in locales.items():
    file = root / "welcome" / path / "index.html"
    content = file.read_text(encoding="utf-8")
    parsed = Metadata()
    parsed.feed(content)
    canonical = origin + "/welcome/" + path
    assert parsed.lang == lang and parsed.canonical == [canonical]
    assert parsed.meta.get("og:url") == canonical
    assert parsed.meta.get("og:title") and parsed.meta.get("og:description")
    expected = {(v, origin + "/welcome/" + k) for k, v in locales.items()} | {("x-default", origin + "/welcome/")}
    assert parsed.alternates == expected, f"Invalid hreflang links: {file}"
    properties = {"og:type":"website", "og:site_name":"Easy3DHome", "og:image":image,
                  "og:image:width":"1200", "og:image:height":"630", "og:image:type":"image/png",
                  "og:image:alt":"Easy3DHome brand and illustrative 2D floor plan"}
    twitter = {"twitter:card":"summary_large_image", "twitter:title":parsed.meta["og:title"],
               "twitter:description":parsed.meta["og:description"], "twitter:image":image,
               "twitter:image:alt":properties["og:image:alt"]}
    assert not (set(properties) | set(twitter)) & parsed.meta.keys(), f"Duplicate generated metadata: {file}"
    tags = "".join(f'<meta property="{k}" content="{escape(v, quote=True)}">' for k,v in properties.items())
    tags += "".join(f'<meta name="{k}" content="{escape(v, quote=True)}">' for k,v in twitter.items())
    assert content.count("</head>") == 1
    file.write_text(content.replace("</head>", tags + "</head>"), encoding="utf-8")
print("Verified canonical, hreflang and 1200x630 social cards for all nine landing pages")
