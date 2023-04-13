#!/bin/bash

pnpm i --frozen-lockfile --registry=https://registry.npmmirror.com

pnpm release --no-git-checks --access public

curl -X PUT https://registry-direct.npmmirror.com/@sepveneto/free-dom/sync?sync_upstream=true
