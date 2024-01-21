import requests
from bs4 import BeautifulSoup
import json
import os
import random
from pathlib import Path

def is_absolute(url):
    return bool(requests.utils.urlparse(url).netloc)

def get_latest_blog_posts(url, css_selector):
    """
    Scrape blog posts from the given URL using the provided CSS selector.

    Args:
    url (str): The URL of the blog.
    css_selector (str): The CSS selector to locate the blog posts.

    Returns:
    list: The list of scraped blog posts.
    """
    output_data = []

    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")
        articles = soup.select(css_selector)
        all_links = []

        for article in articles:
            links = article.find_all("a")
            all_links.extend(links)

        selected_links = all_links[:min(3, len(all_links))]  # Select the first 3 or fewer links

        for link in selected_links:
            title_element = link.select_one("div.notion-collection-card-body > div:nth-child(1) > span > span > span > span")
            title = title_element.text.strip() if title_element else ""

            summary_element = link.select_one("div.notion-collection-card-body > div:nth-child(2)")
            summary = summary_element.text.strip() if summary_element else ""

            href = link["href"]
            href = make_absolute_url(url, href)

            post_data = {
                "username": "yuminn-k",
                "title": title,
                "summary": summary,
                "url": href,
            }

            output_data.append(post_data)
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"Error while scraping {url}: {e}")

    return output_data

def get_random_blog_posts(url, css_selector):
    output_data = []

    try:
        response = requests.get(url)
        response.raise_for_status()  
        soup = BeautifulSoup(response.content, "html.parser")
        articles = soup.select(css_selector)
        all_links = []

        for article in articles:
            links = article.find_all("a")
            all_links.extend(links)

        selected_links = random.sample(all_links, min(3, len(all_links)))

        for link in selected_links:
            title_element = link.select_one("div.notion-collection-card-body > div:nth-child(1) > span > span > span > span")
            title = title_element.text.strip() if title_element else ""

            summary_element = link.select_one("div.notion-collection-card-body > div:nth-child(2)")
            summary = summary_element.text.strip() if summary_element else ""

            href = link["href"]
            href = make_absolute_url(url, href)

            post_data = {
                "username": "yuminn-k",
                "title": title,
                "summary": summary,
                "url": href,
            }

            output_data.append(post_data)
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"Error while scraping {url}: {e}")

    return output_data

def extract_post_data(link, url):
    title_element = link.select_one("div.notion-collection-card-body > div:nth-child(1)")
    title = title_element.text.strip() if title_element else ""

    summary_element = link.select_one("div.notion-collection-card-body > div:nth-child(2)")
    summary = summary_element.text.strip() if summary_element else ""

    href = link.select_one("a")["href"]
    href = make_absolute_url(url, href)

    post_data = {
        "username": "yuminn-k",
        "title": title,
        "summary": summary,
        "url": href,
    }

    return post_data

def extract_date_text(date_element):
    if date_element and '202' in date_element.text:
        index_202 = date_element.text.index('202')
        date_text = date_element.text[:index_202]
        return date_text
    return ""

def make_absolute_url(base_url, href):
    if not is_absolute(href):
        href = base_url.rstrip("/") + href.lstrip(".")
    return href

def save_output_to_json(output_data, output_file):
    """
    Saves the output data to a JSON file.

    Args:
    output_data (list): The output data to be saved.
    output_file (str): The name of the output JSON file.

    Returns:
    str: The path to the saved JSON file.
    """
    output_path = Path(output_file)
    try:
        with output_path.open("w") as json_file:
            json.dump(output_data, json_file)
        print(f"{output_path}에 성공적으로 저장되었습니다.")
    except Exception as e:
        print(f"{output_path}에 저장하는 동안 오류가 발생했습니다: {e}")

    return str(output_path)

def main():
    """
    Main function to scrape blog posts and save the output to JSON files.
    """
    url = "https://yuminnk-devlog.vercel.app"
    css_selector = "#__next>div:nth-child(2)>div>div.notion-frame>div>main>div.notion-page-content>article>div.notion-collection.notion-block-52c3f72df427430ca4768e53c36a61c6>div:nth-child(2)>div>div"

    latest_output_data = get_latest_blog_posts(url, css_selector)
    random_output_data = get_random_blog_posts(url, css_selector)

    latest_output_data = sorted(latest_output_data, key=lambda x: x.get('date', ''), reverse=True)
    random_sample_output_data = random.sample(random_output_data, min(len(random_output_data), 3))

    save_output_to_json([latest_output_data[0]], "latest-post.json")
    save_output_to_json(latest_output_data, "latest-posts.json")
    save_output_to_json([random_sample_output_data[0]], "random-post.json")
    save_output_to_json(random_sample_output_data, "random-posts.json")

if __name__ == "__main__":
    main()

    # url = os.getenv("URL")
    # css_selector = os.getenv("CSS_SELECTOR")