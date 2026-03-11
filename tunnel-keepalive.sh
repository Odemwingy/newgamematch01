#!/bin/bash
# 签历公网隧道保活脚本
# 当隧道断开时自动重建

LOG_FILE="/home/kale/.openclaw/workspace/qianli/tunnel.log"
PID_FILE="/home/kale/.openclaw/workspace/qianli/tunnel.pid"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# 检查 Expo 服务是否运行
check_expo() {
  if ! curl -s http://localhost:8081 > /dev/null 2>&1; then
    log "Expo 服务未运行，正在启动..."
    cd /home/kale/.openclaw/workspace/qianli
    npx expo start --web --port 8081 &
    sleep 10
  fi
}

# 启动新隧道
start_tunnel() {
  log "启动新的 Cloudflare 隧道..."
  cd /home/kale/.openclaw/workspace/qianli
  
  # 后台启动 cloudflared
  npx cloudflared tunnel --url http://localhost:8081 > /tmp/tunnel-output.txt 2>&1 &
  TUNNEL_PID=$!
  echo $TUNNEL_PID > "$PID_FILE"
  
  # 等待获取 URL
  sleep 10
  
  # 提取隧道 URL
  NEW_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/tunnel-output.txt | head -1)
  
  if [ -n "$NEW_URL" ]; then
    log "✅ 新隧道已建立: $NEW_URL"
    log " tunnel URL: $NEW_URL"
    # 写入文件供读取
    echo "$NEW_URL" > /home/kale/.openclaw/workspace/qianli/tunnel-url.txt
  else
    log "❌ 隧道启动失败"
  fi
}

# 主循环
log "=== 隧道保活服务启动 ==="
log "当前隧道 URL 保存在: tunnel-url.txt"

while true; do
  check_expo
  
  # 检查隧道是否活跃
  CURRENT_URL=$(cat /home/kale/.openclaw/workspace/qianli/tunnel-url.txt 2>/dev/null)
  
  if [ -n "$CURRENT_URL" ]; then
    if curl -sI "$CURRENT_URL" --connect-timeout 5 > /dev/null 2>&1; then
      log "隧道正常: $CURRENT_URL"
    else
      log "隧道已断开，重新建立..."
      # 杀掉旧进程
      pkill -f "cloudflared tunnel" 2>/dev/null
      sleep 2
      start_tunnel
    fi
  else
    start_tunnel
  fi
  
  # 每 5 分钟检查一次
  sleep 300
done
