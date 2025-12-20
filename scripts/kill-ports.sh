#!/bin/bash
# Kill processes using ports 5000 and 3000

echo "Checking for processes on ports 5000 and 3000..."

# Kill processes on port 5000
PIDS_5000=$(lsof -ti:5000 2>/dev/null)
if [ ! -z "$PIDS_5000" ]; then
  echo "Killing processes on port 5000: $PIDS_5000"
  kill -9 $PIDS_5000 2>/dev/null
else
  echo "No processes found on port 5000"
fi

# Kill processes on port 3000
PIDS_3000=$(lsof -ti:3000 2>/dev/null)
if [ ! -z "$PIDS_3000" ]; then
  echo "Killing processes on port 3000: $PIDS_3000"
  kill -9 $PIDS_3000 2>/dev/null
else
  echo "No processes found on port 3000"
fi

# Kill any remaining nodemon/webpack/concurrently processes
pkill -f "nodemon\|webpack\|concurrently" 2>/dev/null

sleep 1
echo "Done! Ports should now be free."
