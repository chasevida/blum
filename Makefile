test:
	@node node_modules/lab/bin/lab --ignore 'indentType'
test-cov:
	@node node_modules/lab/bin/lab -t 100 --ignore 'indentType'
test-cov-html:
	@node node_modules/lab/bin/lab -r html -o coverage.html --ignore 'indentType'
test-coveralls:
	@node node_modules/lab/bin/lab -t 100 -r lcov --ignore 'indentType' | ./node_modules/coveralls/bin/coveralls.js

.PHONY: test test-cov test-cov-html test-coveralls
