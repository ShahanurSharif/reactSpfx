#!/bin/bash

yo @microsoft/sharepoint

read -p "Enter your tenant domain (e.g.monarch): " tenant

sed -i '' "s/{tenantDomain}/$tenant.sharepoint.com/g" config/serve.json

gulp trust-dev-cert

npm install @pnp/sp @pnp/nodejs @pnp/logging @pnp/common @pnp/odata @pnp/graph --save