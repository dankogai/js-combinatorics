TS=combinatorics.ts
JS=combinatorics.js
MJS=combinatorics.mjs
DTS=combinatorics.d.ts

all: $(JS)

$(JS): $(TS)
	tsc -d --target es6 $(TS)

test: $(JS)
	mocha --require esm

clean:
	-rm $(DTS) $(MJS) $(JS)
