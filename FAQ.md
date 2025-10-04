# Frequently Asked Questions (FAQ)

## General Questions

### What does this tool do?
Ai-FBPostchecker888 automatically monitors Facebook posts from a specified page, detects policy violations based on banned keywords, classifies risk levels, sends notifications via LINE, and logs all results to Google Sheets.

### Is this tool free to use?
Yes, the tool itself is open source and free. However, you'll need free accounts with Facebook, LINE, and Google Cloud Platform. Note that Google Cloud may have usage limits on their free tier.

### Does this work with personal Facebook profiles?
No, this tool is designed to work with Facebook Pages, not personal profiles. You need admin access to a Facebook Page.

### Can I monitor multiple Facebook pages?
Currently, the tool is configured to monitor one page at a time. To monitor multiple pages, you would need to run separate instances with different configuration files.

## Setup & Configuration

### Where do I get my Facebook Page ID?
You can find your Page ID in several ways:
1. Go to your Facebook Page → About section
2. Use Facebook Graph API Explorer: `GET /me/accounts`
3. Look at your page URL - sometimes the ID is visible there

### How long does a Facebook access token last?
User access tokens typically expire after 1-2 hours. For long-term use, you should:
1. Generate a Page Access Token (which lasts longer)
2. Consider implementing token refresh logic
3. Or manually update the token periodically

### What permissions does the Facebook token need?
At minimum, you need:
- `pages_read_engagement` - to read posts from your page

### Can I use a different notification service instead of LINE?
The current implementation uses LINE Notify, but you can modify `src/line_notifier.py` to integrate with other services like Slack, Discord, Telegram, email, etc.

### What happens if my Google Sheets service account credentials expire?
Service account credentials don't expire unless you manually revoke them. However, if you delete the service account or the JSON key, you'll need to create a new one.

## Usage Questions

### How often should I run the checker?
It depends on your needs:
- **High-traffic pages**: Every 15-30 minutes
- **Moderate traffic**: Every hour
- **Low traffic**: Once or twice per day

Be mindful of API rate limits from Facebook, LINE, and Google.

### What happens if the same post is checked multiple times?
The tool will re-analyze the post and add a new entry to your Google Sheet each time. It doesn't track which posts have already been checked.

### Can I check historical posts?
Yes, the Facebook Graph API can retrieve older posts. However, the tool is designed primarily for monitoring recent posts. You may need to modify the limit parameter or implement pagination for extensive historical analysis.

### How do I customize the banned keywords?
Edit the `policy.banned_keywords` array in `config/config.json`. Keywords are case-insensitive, so "SPAM" and "spam" will both match.

### What determines if a post is "high risk"?
Currently, the `RiskClassifier` looks for specific terms like "urgent", "alert", or "warning". You can modify the `_high_risk_terms` in `src/policy_detector.py` to customize this behavior.

## Troubleshooting

### The script runs but nothing happens
Check that:
1. Your Facebook page actually has posts
2. The access token has the correct permissions
3. You're checking the right page ID
4. There are no errors in the console output

### I get "Rate Limit Exceeded" errors
This means you're making too many API requests. Solutions:
- Reduce how frequently you run the checker
- Reduce the number of posts checked (lower the `limit` parameter)
- Wait for the rate limit to reset (usually 1 hour)

### Google Sheets shows empty rows or errors
Ensure:
1. The service account has "Editor" permission on the sheet
2. The sheet ID in the config is correct
3. The Google Sheets API is enabled in your Google Cloud project
4. Your credentials file path is correct

### LINE notifications aren't being sent
Verify:
1. Your LINE token is correct and hasn't been revoked
2. LINE Notify is connected to the correct chat room
3. There are actually violations or high-risk posts to notify about
4. Check the console for any error messages

### How do I know if it's working?
The script should:
1. Print status messages to the console
2. Send LINE notifications if violations are found
3. Add rows to your Google Sheet

If none of these happen, check the console for error messages.

## Advanced Usage

### Can I integrate this with a web interface?
Yes! The Python backend is separate from any web interface. You could build a React/Vue/Angular frontend that calls the Python scripts or create a REST API wrapper around the functionality.

### Can I modify the detection logic?
Absolutely! The code is modular:
- `PolicyDetector` handles keyword detection
- `RiskClassifier` handles risk assessment
You can modify these classes or create new ones with more sophisticated logic (e.g., machine learning models).

### Can I add more notification channels?
Yes! Create a new notifier class similar to `LineNotifier` that implements a `send()` method. You can then use multiple notifiers in `PostChecker`.

### How do I schedule automatic checks?
Use cron (Linux/macOS) or Task Scheduler (Windows):

**Linux/macOS:**
```bash
# Edit crontab
crontab -e

# Add this line to run every hour
0 * * * * cd /path/to/Ai-FBPostchecker888 && /path/to/venv/bin/python run_checker.py
```

**Windows:**
Use Task Scheduler to create a task that runs the script at your desired interval.

## Security & Privacy

### Is my data secure?
Your credentials are stored locally in `config/config.json`. Make sure:
- Never commit this file to version control (it's in `.gitignore`)
- Keep your service account credentials secure
- Restrict file permissions on sensitive files
- Don't share your tokens publicly

### What data is collected?
The tool only processes data from the Facebook page you specify. It:
- Reads post content and IDs
- Stores post IDs, content, and risk levels in Google Sheets
- Sends notifications about flagged posts to LINE

### Does this comply with Facebook's Terms of Service?
This tool uses the official Facebook Graph API. However, you're responsible for ensuring your use case complies with Facebook's policies and applicable privacy laws.

## Contributing

### I found a bug, what should I do?
Please open an issue on GitHub with:
- A description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Any error messages

### I want to add a feature, how can I contribute?
Great! Please:
1. Check if there's already an issue or PR for this feature
2. Open an issue to discuss the feature first
3. Fork the repo and make your changes
4. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

**Still have questions?** Open an issue on GitHub or check the documentation in [README.md](README.md).
