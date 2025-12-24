---
description: Clean up development ports (3000, 5000)
---
This workflow kills any processes running on ports 3000 (Web) and 5000 (Server).

// turbo
1. Find and kill processes on port 3000 and 5000
   ```bash
   lsof -t -i:3000 -i:5000 | xargs -r kill -9
   ```
