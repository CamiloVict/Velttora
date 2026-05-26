#!/usr/bin/env python3
"""Legacy entrypoint — syncs pitch demo from urbi_app_prototype.html."""
import subprocess
import sys
from pathlib import Path

if __name__ == "__main__":
    script = Path(__file__).parent / "sync-urbi-pitch-prototype.py"
    raise SystemExit(subprocess.call([sys.executable, str(script)]))
