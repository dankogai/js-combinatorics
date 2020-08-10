PJ=package.json
TS=combinatorics.ts
JS=combinatorics.js
MJS=combinatorics.mjs
DTS=combinatorics.d.ts
COMMONJS_DIR=commonjs
COMMONJS=$(COMMONJS_DIR)/$(JS)
UMD_DIR=umd
UMD=$(UMD_DIR)/$(JS)

all: $(PJ) $(JS) $(COMMONJS) $(UMD)

$(JS): $(PJ) $(TS)
	tsc -d --target es6 $(TS)

$(COMMONJS): $(PJ) $(TS)
	tsc --module commonjs --outDir $(COMMONJS_DIR) --target es6 $(TS)

$(UMD): $(PJ) $(TS)
	tsc --module umd --outDir $(UMD_DIR) --target es6 $(TS)

test: all
	mocha --require esm

clean:
	-rm $(DTS) $(MJS) $(JS) $(COMMONJS) $(UMD)

