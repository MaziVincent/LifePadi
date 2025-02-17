#!/bin/bash

# Navigate to ios directory
cd ios

# Maximum number of retry attempts
MAX_RETRIES=50
retry_count=0
success=false

echo -e "\033[32mStarting pod installation process...\033[0m\n"

while [ $retry_count -lt $MAX_RETRIES ] && [ "$success" = false ]; do
    # Clean pod installation
    rm -rf Pods
    rm -rf Podfile.lock
    # rm -rf ~/.cocoapods/repos
    pod cache clean --all

    # Update cocoapods repo
    pod repo update

    # Attempt pod install
    if pod install; then
        success=true
        echo -e "\033[32mPod installation successful!\033[0m\n"
    else
        retry_count=$((retry_count + 1))
        if [ $retry_count -lt $MAX_RETRIES ]; then
            echo -e "\033[32mPod installation failed. Retrying... (Attempt $retry_count of $MAX_RETRIES)\033[0m\n"
            sleep 2
        fi
    fi
done

if [ "$success" = false ]; then
    echo -e "\033[32mPod installation failed after $MAX_RETRIES attempts.\033[0m\n"
    exit 1
fi

cd ..
exit 0
