#!/usr/bin/env bash
#
# deploy.sh — one-command publish for andrewbaldock.com
#
# Builds the site and deploys it over FTP, replacing the appropriate remote
# files under public_html/. Must live in the repo root: all paths resolve
# relative to this script's location.
#
# Usage:
#   cd ~/Code/website
#   ./deploy.sh
#
# See deploy-handoff.md for the full design.

set -euo pipefail

# --- Config -----------------------------------------------------------------

readonly ROOT="$(cd "$(dirname "$0")" && pwd)"
readonly DIST="$ROOT/dist"

readonly FTP_HOST="andrewbaldock.com"
readonly FTP_USER="andrewba"
readonly REMOTE_ROOT="public_html"

# --- Credentials ------------------------------------------------------------

FTP_PASS="$(security find-internet-password -s "$FTP_HOST" -a "$FTP_USER" -w 2>/dev/null || true)"
if [[ -z "$FTP_PASS" ]]; then
  cat >&2 <<EOF
ERROR: FTP password not found in macOS Keychain.

Add it once with:
  security add-internet-password -s "$FTP_HOST" -a "$FTP_USER" -w

(You will be prompted for the password; nothing is echoed.)
EOF
  exit 1
fi

# Base curl invocation: plain FTP, passive mode, silent-but-show-errors, fail
# on HTTP/FTP errors. Credentials passed via --user.
curl_ftp() {
  curl --fail --silent --show-error --ftp-pasv \
    --user "$FTP_USER:$FTP_PASS" "$@"
}

# --- Helper functions -------------------------------------------------------

# ftp_upload <local_path> <remote_path>
# Uploads a single file. remote_path is relative to public_html/.
ftp_upload() {
  local local_path="$1"
  local remote_path="$2"
  echo "  upload  $remote_path"
  curl_ftp --ftp-create-dirs -T "$local_path" \
    "ftp://$FTP_HOST/$REMOTE_ROOT/$remote_path"
}

# ftp_upload_dir_safe <local_dir> <remote_dir>
# Recursively uploads all files from local_dir into remote_dir.
# Never deletes anything remote. Safe for shared directories like images/.
ftp_upload_dir_safe() {
  local local_dir="$1"
  local remote_dir="$2"
  local file rel
  while IFS= read -r -d '' file; do
    rel="${file#"$local_dir"/}"
    ftp_upload "$file" "$remote_dir/$rel"
  done < <(find "$local_dir" -type f ! -name '.DS_Store' -print0)
}

# ftp_upload_dir_replace <local_dir> <remote_dir>
# Deletes all remote files in remote_dir (one level deep), then uploads all
# local files fresh. Used for assets/ where Vite-hashed names accumulate.
ftp_upload_dir_replace() {
  local local_dir="$1"
  local remote_dir="$2"
  local listing name file

  echo "  clearing remote $remote_dir/"
  # List the remote dir; -l gives names only. May be empty on first deploy.
  listing="$(curl_ftp "ftp://$FTP_HOST/$REMOTE_ROOT/$remote_dir/" -l || true)"
  while IFS= read -r name; do
    [[ -z "$name" || "$name" == "." || "$name" == ".." ]] && continue
    echo "  delete  $remote_dir/$name"
    curl_ftp "ftp://$FTP_HOST/$REMOTE_ROOT/" -Q "DELE $REMOTE_ROOT/$remote_dir/$name" -o /dev/null || true
  done <<< "$listing"

  # Upload fresh (one level deep — assets/ has no subdirs).
  while IFS= read -r -d '' file; do
    name="$(basename "$file")"
    ftp_upload "$file" "$remote_dir/$name"
  done < <(find "$local_dir" -maxdepth 1 -type f ! -name '.DS_Store' -print0)
}

# --- Build ------------------------------------------------------------------

cd "$ROOT"

echo "==> Rendering resume PDF"
bun run resume:pdf

echo "==> Rendering resume markdown"
bun run resume:md

echo "==> Building site"
bun run build

# --- Deploy -----------------------------------------------------------------

echo "==> Uploading root files"
ftp_upload "$DIST/index.html"  "index.html"
ftp_upload "$DIST/resume.pdf"  "resume.pdf"
ftp_upload "$DIST/resume.md"   "resume.md"
ftp_upload "$DIST/robots.txt"  "robots.txt"
ftp_upload "$DIST/icons.svg"   "icons.svg"
ftp_upload "$DIST/favicon.ico" "favicon.ico"
ftp_upload "$DIST/favicon.svg" "favicon.svg"
ftp_upload "$DIST/favicon-16x16.png"    "favicon-16x16.png"
ftp_upload "$DIST/favicon-32x32.png"    "favicon-32x32.png"
ftp_upload "$DIST/apple-touch-icon.png" "apple-touch-icon.png"
ftp_upload "$DIST/icon-192.png"         "icon-192.png"
ftp_upload "$DIST/icon-512.png"         "icon-512.png"
ftp_upload "$DIST/site.webmanifest"     "site.webmanifest"
ftp_upload "$DIST/.htaccess"   ".htaccess"

echo "==> Replacing assets/ (destructive)"
ftp_upload_dir_replace "$DIST/assets" "assets"

echo "==> Syncing images/ (non-destructive)"
ftp_upload_dir_safe "$DIST/images" "images"

echo "==> Deploy complete."
