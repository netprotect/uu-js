#!/bin/sh

# $1 = Environment type: dev, prod

# Default to dev if no argument is set
r.js -o ${1-dev}.js