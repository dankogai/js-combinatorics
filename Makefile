PJ=package.json
TS=combinatorics.ts
JS=combinatorics.js
MJS=combinatorics.mjs
DTS=combinatorics.d.ts

all: $(PJ) $(JS)

$(JS): $(PJ) $(TS)
	tsc -d --target es6 $(TS)

commonjs: $(PJ) $(TS)
	tsc --module commonjs --target es6 $(TS)

umd: $(PJ) $(TS)
	tsc --module umd --target es6 $(TS)

test: $(PJ) $(JS)
	mocha --require esm

clean:
	-rm $(DTS) $(MJS) $(JS)
