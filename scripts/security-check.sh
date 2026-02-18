#!/bin/bash
# Security Check Script for Amazon Clone Project
# Run this before committing to catch security issues

echo "🔐 SECURITY CHECK STARTING..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ISSUES_FOUND=0

# Check 1: Look for exposed API keys
echo "🔍 Checking for exposed API keys..."
if grep -r "AIzaSy[A-Za-z0-9_-]\{35\}" src/ --exclude-dir=node_modules 2>/dev/null | grep -v "Expected format"; then
    echo -e "${RED}❌ CRITICAL: Exposed Firebase API key found in source code!${NC}"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo -e "${GREEN}✅ No exposed API keys found in source${NC}"
fi

# Check 2: Look for hardcoded secrets (excluding legitimate variable names and comments)
echo "🔍 Checking for hardcoded secrets..."
HARDCODED_SECRETS=$(grep -r -i "apiKey\s*=\s*['\"]AIza\|password\s*=\s*['\"][^'\"]\|secret\s*=\s*['\"][^'\"]\|token\s*=\s*['\"][^'\"" src/ | grep -v "process.env" | grep -v ".example" | grep -v "clientSecret" | grep -v "getClientSecret" | grep -v "setClientSecret" | wc -l)
if [ $HARDCODED_SECRETS -gt 0 ]; then
    echo -e "${RED}❌ WARNING: Potential hardcoded secrets found!${NC}"
    grep -r -i "apiKey\s*=\s*['\"]AIza\|password\s*=\s*['\"][^'\"]\|secret\s*=\s*['\"][^'\"]\|token\s*=\s*['\"][^'\"" src/ | grep -v "process.env" | grep -v ".example" | grep -v "clientSecret" | grep -v "getClientSecret" | grep -v "setClientSecret"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo -e "${GREEN}✅ No hardcoded secrets detected${NC}"
fi

# Check 3: Debug console logs (more specific patterns)
echo "🔍 Checking for debug console logs..."
DEBUG_LOGS=$(grep -r "console\.log.*['\"].*[aA][pP][iI].*[kK][eE][yY]\|console\.log.*['\"].*[sS][eE][cC][rR][eE][tT]\|console\.log.*['\"].*[tT][oO][kK][eE][nN]" src/ 2>/dev/null | grep -v "categories\|Object\\.keys\|join" | wc -l)
if [ $DEBUG_LOGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Found $DEBUG_LOGS debug console log(s) with potential sensitive data${NC}"
    grep -r "console\.log.*['\"].*[aA][pP][iI].*[kK][eE][yY]\|console\.log.*['\"].*[sS][eE][cC][rR][eE][tT]\|console\.log.*['\"].*[tT][oO][kK][eE][nN]" src/ 2>/dev/null | grep -v "categories\|Object\\.keys\|join"
fi

# Check 4: .env file in git
echo "🔍 Checking .env file protection..."
if git ls-files | grep -E "^\.env$" >/dev/null 2>&1; then
    echo -e "${RED}❌ CRITICAL: .env file is tracked by git!${NC}"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo -e "${GREEN}✅ .env file properly ignored${NC}"
fi

# Check 5: Log files in git
echo "🔍 Checking for log files in git..."
LOG_FILES=$(git ls-files | grep -E "\\.log$|debug" | wc -l)
if [ $LOG_FILES -gt 0 ]; then
    echo -e "${RED}❌ WARNING: Log files found in git tracking:${NC}"
    git ls-files | grep -E "\\.log$|debug"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo -e "${GREEN}✅ No log files tracked by git${NC}"
fi

# Check 6: Firebase configuration validation
echo "🔍 Validating Firebase configuration..."
if [ -f ".env" ]; then
    if grep -q "REACT_APP_FIREBASE_API_KEY=your_" .env 2>/dev/null; then
        echo -e "${YELLOW}⚠️  Firebase API key appears to be placeholder${NC}"
    else
        echo -e "${GREEN}✅ Firebase configuration appears valid${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  No .env file found${NC}"
fi

# Summary
echo ""
echo "📊 SECURITY CHECK SUMMARY"
echo "========================="

if [ $ISSUES_FOUND -eq 0 ]; then
    echo -e "${GREEN}🎉 NO SECURITY ISSUES FOUND!${NC}"
    echo "✅ Safe to commit"
    exit 0
else
    echo -e "${RED}⚠️  $ISSUES_FOUND SECURITY ISSUE(S) FOUND!${NC}"
    echo "❌ Please fix issues before committing"
    exit 1
fi