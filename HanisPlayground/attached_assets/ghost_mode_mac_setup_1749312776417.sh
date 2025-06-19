#!/bin/bash

# GHOST MODE SETUP SCRIPT - macOS
# Generated on: 2025-05-13 04:48:09
# Author: ChatGPT for Wan Mohamad Hanis bin Wan Hassan

echo "Starting macOS Ghost Mode Setup..."

# 1. Randomize MAC Address
echo "[*] Randomizing MAC address..."
sudo ifconfig en0 down
sudo ifconfig en0 ether $(openssl rand -hex 6 | sed 's/\(..\)/\1:/g; s/:$//')
sudo ifconfig en0 up

# 2. Disable Auto-Join for Known Wi-Fi Networks
echo "[*] Disabling auto-join for known networks..."
networksetup -listpreferredwirelessnetworks en0 | grep -v "Preferred" | while read -r SSID; do
    networksetup -removepreferredwirelessnetwork en0 "$SSID"
done

# 3. Enable Firewall with Stealth Mode
echo "[*] Enabling firewall and stealth mode..."
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode on

# 4. Disable Bluetooth and AirDrop
echo "[*] Disabling Bluetooth and AirDrop..."
sudo defaults write /Library/Preferences/com.apple.Bluetooth ControllerPowerState -int 0
sudo launchctl unload /System/Library/LaunchDaemons/com.apple.blued.plist 2>/dev/null
defaults write com.apple.sharingd PrefersAirDrop -bool false

# 5. Disable Location Services
echo "[*] Disabling location services..."
sudo defaults write /var/db/locationd/Library/Preferences/ByHost/com.apple.locationd LocationServicesEnabled -int 0
sudo killall locationd

# 6. Strip File Metadata (ExifTool needed)
echo "[*] Installing ExifTool and setting up metadata stripping alias..."
brew install exiftool
echo "alias stripmeta='exiftool -all= -overwrite_original'" >> ~/.zshrc
source ~/.zshrc

# 7. Install and configure Little Snitch alternative (LuLu)
echo "[*] Installing LuLu firewall..."
brew install --cask lulu

# 8. Secure DNS Setup (NextDNS CLI client)
echo "[*] Installing NextDNS CLI for DNS-over-HTTPS..."
brew install nextdns
sudo nextdns install
sudo nextdns config set -profile default
sudo nextdns start

# 9. WebRTC Leak Prevention (Browser Config Advisory)
echo "[*] NOTE: Configure Brave/Firefox with WebRTC disabled and use CanvasBlocker, uBlock Origin, NoScript extensions."

# 10. Self-destruct LUKS (Concept)
echo "[*] [Manual Step] Setup self-destruct LUKS passphrase (Linux only) if needed."

echo "Ghost Mode setup complete. Reboot recommended."

