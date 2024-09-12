build:
	docker build -t fck-algos .

start:
	docker run --rm --name fck-algos --env-file .env -p 3003:3000 -v my_shared_volume:/app/build fck-algos