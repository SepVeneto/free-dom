#!/bin/bash

pnpm i

cd packages/core && pnpm build && npm publish --no-git-checks --access public

curl -X PUT https://registry-direct.npmmirror.com/@sepveneto/free-dom/sync?sync_upstream=true
