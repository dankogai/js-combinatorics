PJ=package.json
TS=combinatorics.ts
JS=combinatorics.js
MJS=combinatorics.mjs
DTS=combinatorics.d.ts
COMMONJS_DIR=commonjs
UMD_DIR=umd

all: $(PJ) $(JS) $(COMMONJS_DIR)/$(JS) $(UMD_DIR)/$(JS)

$(JS): $(PJ) $(TS)
	tsc -d --target es6 $(TS)

$(COMMONJS_DIR)/$(JS): $(PJ) $(TS)
	tsc --module commonjs --outDir $(COMMONJS_DIR) --target es6 $(TS)

$(UMD_DIR)/$(JS): $(PJ) $(TS)
	tsc --module umd --outDir $(UMD_DIR) --target es6 $(TS)

test: $(PJ) $(JS)
	mocha --require esm

clean:
	-rm $(DTS) $(MJS) $(JS)
