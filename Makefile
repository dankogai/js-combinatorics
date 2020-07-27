PJ=package.json
TS=combinatorics.ts
JS=combinatorics.js
MJS=combinatorics.mjs
DTS=combinatorics.d.ts

all: $(PJ) $(JS)

$(JS): $(PJ) $(TS)
	tsc -d --target es6 $(TS)

test: $(PJ) $(JS)
	mocha --require esm

clean:
	-rm $(DTS) $(MJS) $(JS)
