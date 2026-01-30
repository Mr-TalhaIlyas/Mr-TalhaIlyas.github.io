#!/usr/bin/env python3
"""
Scholar-Sync: Google Scholar Citation Scraper
Fetches publication data for Mr. Talha Ilyas's portfolio.

Usage:
    python scripts/fetch_citations.py

Output:
    public/data/publications.json
"""

import json
import os
import re
import time
import urllib.request
import urllib.parse
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path


SCHOLAR_ID = "HYNOyyAAAAAJ"
BASE_URL = "https://scholar.google.com"
CITATIONS_URL = f"{BASE_URL}/citations?user={SCHOLAR_ID}&hl=en&sortby=pubdate"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


class ScholarHTMLParser(HTMLParser):
    """Custom HTML parser for Google Scholar pages."""
    
    def __init__(self):
        super().__init__()
        self.publications = []
        self.current_pub = {}
        self.in_title = False
        self.in_authors = False
        self.in_venue = False
        self.in_citations = False
        self.in_year = False
        self.current_data = ""
        self.stats = {"citations": 0, "h_index": 0, "i10_index": 0}
        self.in_stats = False
        self.stats_index = 0
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        class_name = attrs_dict.get("class", "")
        
        # Publication title
        if tag == "a" and "gsc_a_at" in class_name:
            self.in_title = True
            self.current_pub = {"link": attrs_dict.get("href", "")}
            
        # Authors and venue info
        if tag == "div" and "gs_gray" in class_name:
            if not self.current_pub.get("authors"):
                self.in_authors = True
            else:
                self.in_venue = True
                
        # Citations count
        if tag == "a" and "gsc_a_ac" in class_name:
            self.in_citations = True
            
        # Year
        if tag == "span" and "gsc_a_h" in class_name:
            self.in_year = True
            
        # Stats table
        if tag == "td" and "gsc_rsb_std" in class_name:
            self.in_stats = True
            
    def handle_endtag(self, tag):
        if self.in_title and tag == "a":
            self.current_pub["title"] = self.current_data.strip()
            self.current_data = ""
            self.in_title = False
            
        if self.in_authors and tag == "div":
            self.current_pub["authors"] = self.current_data.strip()
            self.current_data = ""
            self.in_authors = False
            
        if self.in_venue and tag == "div":
            venue_data = self.current_data.strip()
            # Try to extract year from venue
            year_match = re.search(r'\b(19|20)\d{2}\b', venue_data)
            if year_match:
                self.current_pub["year"] = int(year_match.group())
                venue_data = venue_data.replace(year_match.group(), "").strip(" ,")
            self.current_pub["venue"] = venue_data
            self.current_data = ""
            self.in_venue = False
            
        if self.in_citations and tag == "a":
            try:
                self.current_pub["citations"] = int(self.current_data.strip() or "0")
            except ValueError:
                self.current_pub["citations"] = 0
            self.current_data = ""
            self.in_citations = False
            
        if self.in_year and tag == "span":
            try:
                year_text = self.current_data.strip()
                if year_text:
                    self.current_pub["year"] = int(year_text)
            except ValueError:
                pass
            self.current_data = ""
            self.in_year = False
            # End of publication entry
            if self.current_pub.get("title"):
                self.publications.append(self.current_pub.copy())
            self.current_pub = {}
            
        if self.in_stats and tag == "td":
            try:
                value = int(self.current_data.strip() or "0")
                if self.stats_index == 0:
                    self.stats["citations"] = value
                elif self.stats_index == 2:
                    self.stats["h_index"] = value
                elif self.stats_index == 4:
                    self.stats["i10_index"] = value
                self.stats_index += 1
            except ValueError:
                pass
            self.current_data = ""
            self.in_stats = False
            
    def handle_data(self, data):
        if any([self.in_title, self.in_authors, self.in_venue, 
                self.in_citations, self.in_year, self.in_stats]):
            self.current_data += data


def fetch_scholar_page(url: str, max_retries: int = 3) -> str:
    """Fetch a page from Google Scholar with retry logic."""
    for attempt in range(max_retries):
        try:
            request = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(request, timeout=30) as response:
                return response.read().decode("utf-8")
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
    return ""


def parse_publications(html: str) -> tuple:
    """Parse publications from Google Scholar HTML."""
    parser = ScholarHTMLParser()
    parser.feed(html)
    return parser.publications, parser.stats


def categorize_publication(pub: dict) -> str:
    """Categorize publication based on venue."""
    venue_lower = (pub.get("venue", "") or "").lower()
    title_lower = (pub.get("title", "") or "").lower()
    
    # Check for specific venues/types
    journal_indicators = ["journal", "transactions", "letters", "ieee", "acm", 
                         "springer", "elsevier", "nature", "science", "plos"]
    conference_indicators = ["conference", "proceedings", "symposium", "workshop",
                            "iccv", "cvpr", "eccv", "neurips", "icml", "aaai", "icra"]
    preprint_indicators = ["arxiv", "preprint", "biorxiv", "medrxiv"]
    
    for indicator in preprint_indicators:
        if indicator in venue_lower:
            return "preprint"
            
    for indicator in conference_indicators:
        if indicator in venue_lower:
            return "conference"
            
    for indicator in journal_indicators:
        if indicator in venue_lower:
            return "journal"
            
    return "other"


def enrich_publications(publications: list) -> list:
    """Add metadata and categorization to publications."""
    enriched = []
    for i, pub in enumerate(publications):
        enriched_pub = {
            "id": i + 1,
            "title": pub.get("title", "Untitled"),
            "authors": pub.get("authors", ""),
            "venue": pub.get("venue", ""),
            "year": pub.get("year", datetime.now().year),
            "citations": pub.get("citations", 0),
            "category": categorize_publication(pub),
            "link": f"{BASE_URL}{pub.get('link', '')}" if pub.get("link") else None,
        }
        enriched.append(enriched_pub)
    return enriched


def load_fallback_data(output_path: Path) -> dict:
    """Load existing data as fallback."""
    if output_path.exists():
        try:
            with open(output_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError:
            pass
    return None


def main():
    """Main function to fetch and save publications."""
    print("=" * 60)
    print("Scholar-Sync: Fetching publications for Talha Ilyas")
    print("=" * 60)
    
    # Setup paths
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent
    output_dir = repo_root / "public" / "data"
    output_path = output_dir / "publications.json"
    
    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Load fallback data
    fallback_data = load_fallback_data(output_path)
    
    print(f"\nFetching from: {CITATIONS_URL}")
    html = fetch_scholar_page(CITATIONS_URL)
    
    if not html:
        print("\n⚠️  Failed to fetch Scholar page")
        if fallback_data:
            print("Using existing data as fallback")
            fallback_data["meta"]["last_attempt"] = datetime.now().isoformat()
            fallback_data["meta"]["fetch_success"] = False
            with open(output_path, "w", encoding="utf-8") as f:
                json.dump(fallback_data, f, indent=2, ensure_ascii=False)
            return
        else:
            print("No fallback data available")
            # Create minimal data structure
            data = {
                "meta": {
                    "scholar_id": SCHOLAR_ID,
                    "last_updated": datetime.now().isoformat(),
                    "fetch_success": False,
                    "profile_url": CITATIONS_URL,
                },
                "stats": {"citations": 0, "h_index": 0, "i10_index": 0},
                "publications": []
            }
            with open(output_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            return
    
    # Parse the HTML
    publications, stats = parse_publications(html)
    print(f"\n✓ Found {len(publications)} publications")
    print(f"✓ Total citations: {stats['citations']}")
    print(f"✓ h-index: {stats['h_index']}")
    print(f"✓ i10-index: {stats['i10_index']}")
    
    # Enrich publications
    enriched_pubs = enrich_publications(publications)
    
    # Build output data
    data = {
        "meta": {
            "scholar_id": SCHOLAR_ID,
            "last_updated": datetime.now().isoformat(),
            "fetch_success": True,
            "profile_url": CITATIONS_URL,
            "researcher": {
                "name": "Talha Ilyas",
                "current_affiliation": "AIM for Health Lab, Monash University",
                "research_focus": ["Medical AI", "Computer Vision", "Deep Learning"]
            }
        },
        "stats": stats,
        "publications": enriched_pubs
    }
    
    # Save to JSON
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Saved to: {output_path}")
    print("=" * 60)
    
    # Print summary by category
    categories = {}
    for pub in enriched_pubs:
        cat = pub["category"]
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\nPublication breakdown:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat.capitalize()}: {count}")


if __name__ == "__main__":
    main()
