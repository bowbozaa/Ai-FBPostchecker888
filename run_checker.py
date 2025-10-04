#!/usr/bin/env python
"""
Facebook Post Checker Runner

This script demonstrates how to run the Facebook post checker.
It loads configuration from config/config.json and checks recent posts.
"""
from src.config_loader import load_config
from src.post_checker import PostChecker


def main():
    """Main entry point for the post checker."""
    # Load configuration from config file
    print("Loading configuration...")
    config = load_config("config/config.json")
    
    # Initialize the post checker
    print("Initializing post checker...")
    checker = PostChecker(
        fb_token=config.facebook_token,
        page_id=config.facebook_page_id,
        line_token=config.line_token,
        gs_creds_file=config.google_credentials_file,
        gs_sheet_id=config.google_sheet_id,
        banned_keywords=config.banned_keywords,
    )
    
    # Check the 10 most recent posts
    print("Checking recent posts...")
    checker.run(limit=10)
    
    print("Post check complete!")


if __name__ == "__main__":
    main()
