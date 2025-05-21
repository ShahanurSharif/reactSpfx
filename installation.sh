#!/bin/bash

#yo @microsoft/sharepoint

read -p "Enter your tenant domain (e.g. contoso.sharepoint.com): " tenant

sed -i '' "s/{tenantDomain}/$tenant/g" config/serve.json

#gulp trust-dev-cert