#!/bin/bash

pnpm i --frozen-lockfile --registry=https://registry.npmmirror.com

cd packages/core && pnpm release

curl -X PUT https://registry-direct.npmmirror.com/@sepveneto/free-dom/sync?sync_upstream=true
