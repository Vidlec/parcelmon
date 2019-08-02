# Parcelmon 📦🔥

Parcelmon is like a `nodemon` but for parcel.
It is hooked to `parcel-bundler` and relunches your server when parcel is done rebuilding.

# Install 🔌
`yarn add -D parcelmon`
# Usage 🚀
`parcelmon --entry=./src/index.ts`


![](example.gif)

# Args 🔧
`--entry` - app entry | *required*

`--outDir` - where to put built code | *optional*, defaults to `./dist`

# Example 👇
`parcelmon --entry=./src/index.ts --outDir=./bin`