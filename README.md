# Ai-FBPostchecker888

ระบบวิเคราะห์ความเสี่ยงของโพสต์ Facebook ด้วย AI ตรวจจับคำผิดนโยบาย แยกระดับความเสี่ยง พร้อมแจ้งเตือนผ่าน LINE และบันทึกลง Google Sheets โดยอัตโนมัติ.

## Installation

1. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

## Configuration

1. Copy `config/config.example.json` to `config/config.json` and fill in the required tokens and IDs.
2. Create a Google Cloud service account and download the credentials JSON referenced in the config.
3. Make sure the service account has access to the target Google Sheet.

## Usage

The following snippet checks the most recent posts of the configured Facebook page and performs policy detection, risk classification, notifications, and logging:

```python
from src.config_loader import load_config
from src.post_checker import PostChecker

config = load_config("config/config.json")
checker = PostChecker(
    fb_token=config.facebook_token,
    page_id=config.facebook_page_id,
    line_token=config.line_token,
    gs_creds_file=config.google_credentials_file,
    gs_sheet_id=config.google_sheet_id,
    banned_keywords=config.banned_keywords,
)
checker.run(limit=10)
```

The script uses the Facebook Graph API to retrieve posts, flags posts that contain banned keywords, classifies risk level, sends a notification via LINE, and appends the results to a Google Sheet.
