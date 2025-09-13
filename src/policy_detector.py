"""Policy detection using a dynamic, file-based rule system."""
from __future__ import annotations

import json
import os
import re
from typing import List, Dict, Any, Tuple

# โครงสร้างของ Rule ที่เราคาดหวังจากไฟล์ JSON
# ตรงกับ `PolicyRule` ในฝั่ง Frontend
Rule = Dict[str, Any]

class PolicyDetector:
    """Detects violations based on a dynamic set of rules from a JSON file."""

    def __init__(self, rules_path: str | None = None) -> None:
        """Initializes the detector by loading rules from the specified path."""
        if rules_path is None:
            # สร้าง path ไปยัง `config/rules.config.json` จากตำแหน่งของไฟล์ปัจจุบัน
            base_dir = os.path.dirname(os.path.abspath(__file__))
            rules_path = os.path.join(base_dir, "..", "config", "rules.config.json")
        
        self.rules: List[Rule] = self._load_rules(rules_path)

    def _load_rules(self, path: str) -> List[Rule]:
        """Loads and validates rules from a JSON file."""
        try:
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            # ตรวจสอบโครงสร้างเบื้องต้น
            if isinstance(data, dict) and "rules" in data and isinstance(data["rules"], list):
                # กรองเอาเฉพาะ rule ที่ enabled
                return [rule for rule in data["rules"] if rule.get("enabled", True)]
            
            print(f"Warning: Rules file at {path} has incorrect format. Using empty rule set.")
            return []
        except FileNotFoundError:
            print(f"Warning: Rules file not found at {path}. Using empty rule set.")
            return []
        except json.JSONDecodeError:
            print(f"Warning: Could not decode JSON from {path}. Using empty rule set.
")
            return []

    def detect(self, text: str) -> List[Rule]:
        """Returns a list of all rules that matched the supplied text."""
        lowered_text = text.lower()
        matched_rules: List[Rule] = []

        for rule in self.rules:
            keyword = rule.get("keyword", "")
            if not keyword:
                continue

            try:
                is_match = False
                if rule.get("is_regex", False):
                    # ใช้ re.search สำหรับ regex
                    if re.search(keyword, lowered_text, re.IGNORECASE):
                        is_match = True
                else:
                    # ค้นหาแบบปกติ (case-insensitive)
                    if keyword.lower() in lowered_text:
                        is_match = True
                
                if is_match:
                    matched_rules.append(rule)

            except re.error as e:
                # ป้องกันกรณี Regex ในไฟล์ config ไม่ถูกต้อง
                print(f"Regex error for rule ID {rule.get('id', 'N/A')}: {e}")
        
        return matched_rules