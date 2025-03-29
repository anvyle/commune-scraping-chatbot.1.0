import requests
import os
from urllib.parse import urlparse
from collections import defaultdict
from bs4 import BeautifulSoup
import json
import shutil
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def scrape_website(site_url: str, depth: int = 10) -> dict:
    """Scrape the website and generate a sitemap."""
    print(f"Scraping in {site_url}")
    try:
        if os.path.exists("./scrape"):
            shutil.rmtree("./scrape")
        
        os.mkdir("./scrape")
        
        def clean_url(url: str) -> str:
            """Clean the URL to be used as a filename."""
            return url.replace("https://", "").replace("/", "-").replace(".", "_")

        def get_response_and_save(url: str) -> requests.Response:
            """Send a GET request to the URL, save HTML content, and return the response."""
            try:
                response = requests.get(url)
                response.raise_for_status()  # Raise an exception for HTTP errors
                parsed_url = clean_url(url)
                with open(f"./scrape/{parsed_url}.html", "wb") as f:
                    f.write(response.content)
                return response
            except requests.RequestException as e:
                logger.error(f"Error fetching {url}: {e}")
                return None

        def scrape_links(scheme: str, origin: str, path: str, depth: int, sitemap: dict) -> dict:
            """Recursively scrape links from the website."""
            site_url = scheme + "://" + origin + path
            cleaned_url = "scrape\\" + clean_url(site_url)

            if depth < 0:
                return sitemap
            if sitemap[cleaned_url]:
                return sitemap

            sitemap[cleaned_url] = site_url
            response = get_response_and_save(site_url)
            if response:
                soup = BeautifulSoup(response.content, "html.parser")
                links = soup.find_all("a")

                for link in links:
                    href = urlparse(link.get("href"))
                    if (href.netloc != origin and href.netloc != "") or (href.scheme != "" and href.scheme != "https"):
                        continue
                    scrape_links(href.scheme or "https", href.netloc or origin, href.path, depth - 1, sitemap)
            
            return sitemap

        # Parse the site URL
        parsed_url = urlparse(site_url)
        sitemap = defaultdict(str)
        # Start scraping
        scrape_links(parsed_url.scheme, parsed_url.netloc, parsed_url.path, depth, sitemap)
        # Save sitemap to a JSON file
        with open("./scrape/sitemap.json", "w") as f:
            json.dump(sitemap, f)
        return True
    
    except Exception as e:
        logger.error(f"An error occurred during website scraping: {e}")
        return False
