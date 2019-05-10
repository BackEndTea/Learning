.PHONY: clean

clean:
	find . -name "*.out" -delete
	rm -rf  ./**/__pycache__/ ./**/**/__pycache__
